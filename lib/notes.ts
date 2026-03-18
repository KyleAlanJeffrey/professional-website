import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

/** Filenames to skip */
const SKIP = new Set(["untitled"]);

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

export type NoteContent = NoteMeta & {
  contentHtml: string;
};

/** Slugify a single path segment */
function slugifySegment(name: string): string {
  return name
    .replace(/^@\s*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Build a slug from the file's path relative to NOTES_DIR, preserving directory structure.
 *  e.g. "Networking/TCP.md" -> "networking/tcp" */
function slugFromPath(filePath: string): string {
  const rel = path.relative(NOTES_DIR, filePath).replace(/\.md$/, "");
  return rel
    .split(path.sep)
    .map(slugifySegment)
    .join("/");
}

/** Clean up @ prefix from filenames for display */
function titleFromFilename(filename: string): string {
  return filename.replace(/^@\s*/, "");
}

/** Derive a tag from the folder path relative to NOTES_DIR */
function tagFromPath(filePath: string): string | null {
  const rel = path.relative(NOTES_DIR, filePath);
  const parts = rel.split(path.sep);
  return parts.length > 1 ? parts[0] : null;
}

function findMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(full));
    } else if (entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

/** Build a map of title (lowercased) -> slug for wikilink resolution */
function buildTitleSlugMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const filePath of findMarkdownFiles(NOTES_DIR)) {
    const filename = path.basename(filePath, ".md");
    const slug = slugFromPath(filePath);
    map.set(filename.toLowerCase(), slug);
    map.set(titleFromFilename(filename).toLowerCase(), slug);
  }
  return map;
}

/** Replace [[wikilinks]] and [[target|display]] with markdown links.
 *  Strip ![[image embeds]] since vault images aren't served. */
function resolveWikilinks(markdown: string, titleMap: Map<string, string>): string {
  // Remove image embeds: ![[something.png]] or ![[Pasted image ...]]
  markdown = markdown.replace(/!\[\[([^\]]+)\]\]/g, "");
  // [[target|display text]]
  markdown = markdown.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_match, target, display) => {
    const slug = titleMap.get(target.trim().toLowerCase());
    return slug ? `[${display.trim()}](/notes/${slug})` : display.trim();
  });
  // [[target]]
  markdown = markdown.replace(/\[\[([^\]]+)\]\]/g, (_match, target) => {
    const slug = titleMap.get(target.trim().toLowerCase());
    return slug ? `[${target.trim()}](/notes/${slug})` : target.trim();
  });
  return markdown;
}

function parseNote(filePath: string): { filename: string; data: Record<string, unknown>; content: string; tag: string | null } | null {
  const raw = fs.readFileSync(filePath, "utf-8");
  if (!raw.trim()) return null;

  const filename = path.basename(filePath, ".md");
  if (SKIP.has(filename.toLowerCase())) return null;

  const { data, content } = matter(raw);
  const tag = tagFromPath(filePath);

  return { filename, data, content, tag };
}

export function getPublishedNotes(): NoteMeta[] {
  const files = findMarkdownFiles(NOTES_DIR);
  const notes: NoteMeta[] = [];

  for (const filePath of files) {
    const parsed = parseNote(filePath);
    if (!parsed) continue;

    const { filename, data, tag } = parsed;

    let tags: string[] = [];
    if (Array.isArray(data.tags)) {
      tags = data.tags.map(String);
    } else if (tag) {
      tags = [tag];
    }

    notes.push({
      slug: slugFromPath(filePath),
      title: (data.title as string) || titleFromFilename(filename),
      date: data.date ? new Date(data.date as string).toISOString().split("T")[0] : "",
      tags,
    });
  }

  // Sort: notes with dates first (newest), then undated alphabetically
  return notes.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return a.title.localeCompare(b.title);
  });
}

/** Returns slug segments as arrays for generateStaticParams with [...slug] */
export function getAllSlugParams(): { slug: string[] }[] {
  return getPublishedNotes().map((n) => ({ slug: n.slug.split("/") }));
}

/** Get all note contents as a slug -> HTML map (for the single-page viewer) */
export async function getAllNoteContents(): Promise<Record<string, string>> {
  const notes = getPublishedNotes();
  const result: Record<string, string> = {};

  const titleMap = buildTitleSlugMap();

  for (const note of notes) {
    const files = findMarkdownFiles(NOTES_DIR);
    const match = files.find((f) => slugFromPath(f) === note.slug);
    if (!match) continue;

    const parsed = parseNote(match);
    if (!parsed) continue;

    const resolved = resolveWikilinks(parsed.content, titleMap);
    const html = await remark()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(resolved);

    result[note.slug] = html.toString();
  }

  return result;
}

export async function getNoteBySlug(slugParts: string[]): Promise<NoteContent | null> {
  const slug = slugParts.join("/");
  const files = findMarkdownFiles(NOTES_DIR);
  const match = files.find((f) => slugFromPath(f) === slug);
  if (!match) return null;

  const parsed = parseNote(match);
  if (!parsed) return null;

  const { filename, data, content, tag } = parsed;

  const titleMap = buildTitleSlugMap();
  const resolved = resolveWikilinks(content, titleMap);

  const result = await remark()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(resolved);

  let tags: string[] = [];
  if (Array.isArray(data.tags)) {
    tags = data.tags.map(String);
  } else if (tag) {
    tags = [tag];
  }

  return {
    slug,
    title: (data.title as string) || titleFromFilename(filename),
    date: data.date ? new Date(data.date as string).toISOString().split("T")[0] : "",
    tags,
    contentHtml: result.toString(),
  };
}
