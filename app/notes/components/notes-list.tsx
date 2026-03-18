"use client";

import type { NoteMeta } from "@/lib/notes";
import { Check, ChevronRight, Copy, File, Folder, PanelLeftClose, PanelLeft, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useCallback } from "react";

type TreeNode = {
  name: string;
  slug: string | null;
  children: TreeNode[];
  note: NoteMeta | null;
};

function buildTree(notes: NoteMeta[]): TreeNode {
  const root: TreeNode = { name: "root", slug: null, children: [], note: null };

  for (const note of notes) {
    const parts = note.slug.split("/");
    let node = root;

    for (let i = 0; i < parts.length; i++) {
      const segment = parts[i];
      const isFile = i === parts.length - 1;

      if (isFile) {
        node.children.push({ name: note.title, slug: note.slug, children: [], note });
      } else {
        let child = node.children.find((c) => c.slug === null && c.name === segment);
        if (!child) {
          child = { name: segment, slug: null, children: [], note: null };
          node.children.push(child);
        }
        node = child;
      }
    }
  }

  function sortTree(node: TreeNode) {
    node.children.sort((a, b) => {
      if (a.slug === null && b.slug !== null) return -1;
      if (a.slug !== null && b.slug === null) return 1;
      return a.name.localeCompare(b.name);
    });
    for (const child of node.children) if (child.slug === null) sortTree(child);
  }
  sortTree(root);
  return root;
}

function prettify(name: string): string {
  return name.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/** Collect all file slugs under a tree node */
function collectSlugs(node: TreeNode): Set<string> {
  const slugs = new Set<string>();
  if (node.slug) slugs.add(node.slug);
  for (const child of node.children) {
    for (const s of collectSlugs(child)) slugs.add(s);
  }
  return slugs;
}

function FolderNode({
  node, depth = 0, activeSlug, onSelect, searchQuery,
}: {
  node: TreeNode; depth?: number; activeSlug: string | null; onSelect: (slug: string) => void; searchQuery: string;
}) {
  // Auto-expand if search matches something inside, otherwise start collapsed
  const hasSearchMatch = searchQuery && collectSlugs(node).size > 0;
  const [open, setOpen] = useState(!!hasSearchMatch);

  // Re-open when search finds matches inside
  const shouldForceOpen = searchQuery && hasSearchMatch;

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 w-full py-[6px] hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-colors rounded-md"
        style={{ paddingLeft: `${depth * 14 + 10}px` }}
      >
        <ChevronRight className={`w-3 h-3 text-gray-400 dark:text-gray-500 transition-transform duration-100 shrink-0 ${open || shouldForceOpen ? "rotate-90" : ""}`} />
        <Folder className="w-3.5 h-3.5 text-emerald-600/60 dark:text-emerald-400/50 shrink-0" />
        <span className="text-[13px] font-mono text-gray-600 dark:text-gray-400 truncate ml-0.5 font-medium">
          {prettify(node.name)}
        </span>
      </button>
      {(open || shouldForceOpen) &&
        node.children.map((child, i) =>
          child.slug === null ? (
            <FolderNode key={child.name + i} node={child} depth={depth + 1} activeSlug={activeSlug} onSelect={onSelect} searchQuery={searchQuery} />
          ) : (
            <FileNode key={child.slug} node={child} depth={depth + 1} activeSlug={activeSlug} onSelect={onSelect} />
          )
        )}
    </div>
  );
}

function FileNode({
  node, depth, activeSlug, onSelect,
}: {
  node: TreeNode; depth: number; activeSlug: string | null; onSelect: (slug: string) => void;
}) {
  const isActive = node.slug === activeSlug;

  return (
    <button
      onClick={() => node.slug && onSelect(node.slug)}
      className={`flex items-center gap-1.5 w-full py-[6px] transition-colors rounded-md text-left ${
        isActive
          ? "bg-emerald-500/10 dark:bg-emerald-500/10"
          : "hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
      }`}
      style={{ paddingLeft: `${depth * 14 + 10 + 16}px` }}
    >
      <File className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-emerald-500 dark:text-emerald-400" : "text-gray-400 dark:text-gray-500"}`} />
      <span className={`text-[13px] font-mono truncate ml-0.5 ${isActive ? "text-gray-900 dark:text-white font-semibold" : "text-gray-500 dark:text-gray-400"}`}>
        {node.name}
      </span>
    </button>
  );
}

export default function NotesList({
  notes,
  noteContents,
}: {
  notes: NoteMeta[];
  noteContents: Record<string, string>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slugFromUrl = searchParams.get("note");

  const [activeSlug, setActiveSlug] = useState<string | null>(slugFromUrl);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  // Filter notes by search query
  const filteredNotes = useMemo(() => {
    if (!search.trim()) return notes;
    const q = search.toLowerCase();
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.slug.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [notes, search]);

  const tree = useMemo(() => buildTree(filteredNotes), [filteredNotes]);

  // Push to history so back/forward works between notes
  const handleSelect = useCallback((slug: string) => {
    setActiveSlug(slug);
    router.push(`/notes?note=${encodeURIComponent(slug)}`, { scroll: false });
  }, [router]);

  // Sync with URL when browser back/forward is used
  const currentUrlSlug = searchParams.get("note");
  if (currentUrlSlug && currentUrlSlug !== activeSlug) {
    // This runs during render to sync state with URL without an effect loop
    setActiveSlug(currentUrlSlug);
  }

  const activeNote = notes.find((n) => n.slug === activeSlug);
  const activeHtml = activeSlug ? noteContents[activeSlug] ?? "" : "";

  const breadcrumb = activeSlug
    ? activeSlug.split("/").slice(0, -1).map(prettify).join(" / ")
    : "";

  return (
    <div className="flex gap-0 lg:gap-6" style={{ height: "calc(100vh - 6rem)" }}>
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 min-w-[16rem] shrink-0 flex flex-col overflow-hidden">
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-black/10 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] font-mono text-xs text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 transition-all"
            />
          </div>
          {/* Tree */}
          <div className="flex-1 overflow-y-auto rounded-lg border border-black/10 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03]">
            <div className="p-1.5">
              {tree.children.length === 0 ? (
                <p className="text-xs font-mono text-gray-400 dark:text-gray-500 p-3 text-center">No matches</p>
              ) : (
                tree.children.map((child, i) =>
                  child.slug === null ? (
                    <FolderNode key={child.name + i} node={child} activeSlug={activeSlug} onSelect={handleSelect} searchQuery={search} />
                  ) : (
                    <FileNode key={child.slug} node={child} depth={0} activeSlug={activeSlug} onSelect={handleSelect} />
                  )
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content pane */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-2 mb-3 rounded-lg border border-black/10 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </button>
          {breadcrumb && (
            <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wide">
              {breadcrumb} /
            </span>
          )}
          {activeNote && (
            <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300 tracking-wide font-bold truncate">
              {activeNote.title}
            </span>
          )}
          <div className="ml-auto">
            {activeNote && (
              <button
                onClick={() => {
                  const el = document.getElementById("note-content");
                  if (el) {
                    navigator.clipboard.writeText(el.innerText);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                }}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-colors"
                aria-label="Copy note content"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copied ? "COPIED" : "COPY"}
              </button>
            )}
          </div>
        </div>

        {/* Article */}
        <div className="flex-1 overflow-y-auto rounded-lg border border-black/10 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] px-6 md:px-10 py-8 select-text">
          {activeNote ? (
            <div className="max-w-3xl">
              <h1
                className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white leading-tight mb-8"
                style={{ fontFamily: "monospace" }}
              >
                {activeNote.title}
              </h1>
              <article id="note-content" className="note-content select-text cursor-text" dangerouslySetInnerHTML={{ __html: activeHtml }} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 font-mono text-sm">
              Select a note
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
