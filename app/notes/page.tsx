"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NotesPage() {
  const [mounted, setMounted] = useState(false);

  useState(() => {
    setMounted(true);
  });

  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0b0b] relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute top-20 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-emerald-200/30 via-sky-200/10 to-transparent blur-3xl dark:from-emerald-500/10 dark:via-sky-500/5" />
        <div className="absolute top-1/3 -right-48 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-amber-200/20 via-emerald-200/10 to-transparent blur-3xl dark:from-amber-500/5 dark:via-emerald-500/5" />
      </div>

      <nav
        className={`sticky top-0 z-50 border-b border-black/5 dark:border-white/5 bg-white/80 dark:bg-[#0b0b0b]/80 md:backdrop-blur-xl transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <span className="text-xs text-emerald-500 dark:text-emerald-400 tracking-[0.3em] font-bold font-mono">
            NOTES
          </span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <header
          className={`mb-12 md:mb-16 transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs text-emerald-500 dark:text-emerald-400 tracking-[0.3em] font-bold font-mono">
              ARCHIVE
            </span>
            <div className="h-0.5 w-12 bg-emerald-500 dark:bg-emerald-400" />
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-4"
            style={{ fontFamily: "monospace" }}
          >
            Notes
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl">
            Quick thoughts, references, and things worth remembering.
          </p>
        </header>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 font-mono text-sm">
            Coming soon.
          </p>
        </div>
      </div>
    </main>
  );
}
