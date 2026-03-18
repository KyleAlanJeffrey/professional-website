import { getAllSlugParams, getNoteBySlug } from "@/lib/notes";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllSlugParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) return { title: "Note not found" };
  return {
    title: note.title,
    description: `${note.title} — notes by Kyle Jeffrey`,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0b0b] relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute top-20 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-emerald-200/30 via-sky-200/10 to-transparent blur-3xl dark:from-emerald-500/10 dark:via-sky-500/5" />
        <div className="absolute top-1/3 -right-48 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-amber-200/20 via-emerald-200/10 to-transparent blur-3xl dark:from-amber-500/5 dark:via-emerald-500/5" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-black/5 dark:border-white/5 bg-white/80 dark:bg-[#0b0b0b]/80 md:backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/notes"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            Notes
          </Link>
          <span className="text-xs text-emerald-500 dark:text-emerald-400 tracking-[0.3em] font-bold font-mono">
            NOTE
          </span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-10">
          {note.date && (
            <time className="text-xs font-mono text-gray-400 dark:text-gray-500 tracking-[0.15em] block mb-3">
              {note.date}
            </time>
          )}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-4"
            style={{ fontFamily: "monospace" }}
          >
            {note.title}
          </h1>
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/notes?tag=${encodeURIComponent(tag)}`}
                  className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-[0.1em] rounded-full border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <article
          className="note-content"
          dangerouslySetInnerHTML={{ __html: note.contentHtml }}
        />
      </div>
    </main>
  );
}
