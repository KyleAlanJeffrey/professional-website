import { getAllNoteContents, getPublishedNotes } from "@/lib/notes";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Suspense } from "react";
import NotesList from "./components/notes-list";

export const metadata: Metadata = {
  title: "Notes",
  description: "Quick thoughts, references, and things worth remembering — by Kyle Jeffrey.",
};

export default async function NotesPage() {
  const notes = getPublishedNotes();
  const noteContents = await getAllNoteContents();

  return (
    <main className="min-h-screen bg-[#f6f2ea] dark:bg-[#0b0c0f] relative">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-20 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-emerald-200/20 via-sky-200/10 to-transparent blur-3xl dark:from-emerald-500/8 dark:via-sky-500/5" />
        <div className="absolute top-1/3 -right-48 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-amber-200/15 via-emerald-200/10 to-transparent blur-3xl dark:from-amber-500/5 dark:via-emerald-500/5" />
      </div>

      <Navbar />

      <div className="max-w-[90rem] mx-auto px-4 md:px-6 py-4">
        <Suspense>
          <NotesList notes={notes} noteContents={noteContents} />
        </Suspense>
      </div>
    </main>
  );
}
