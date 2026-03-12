import Job from "@/components/job";
import SkillsGraph from "@/components/skills-graph";
import SectionShell from "@/components/sections/section-shell";
import { Button } from "@/components/ui/button";
import jobsData from "@/data/jobs.json";
import { Download } from "lucide-react";

type WorkSectionProps = {
  highlightSectionId: string | null;
  highlightSkill: string | null;
  highlightJobIndex: number | null;
  onSkillClick?: (skill: string) => void;
};

export default function WorkSection({
  highlightSectionId,
  highlightSkill,
  highlightJobIndex,
  onSkillClick,
}: WorkSectionProps) {
  const jobs = jobsData.jobs ?? [];

  return (
    <SectionShell
      id="work"
      className="mt-16 md:mt-24 max-w-7xl mx-auto transition-all duration-300 rounded-2xl relative isolate"
      highlighted={highlightSectionId === "work"}
      highlightClassName="ring-2 ring-sky-400/70 bg-slate-100/50 dark:bg-white/5 shadow-[0_16px_40px_rgba(56,189,248,0.2)]"
      decorations={
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-12 -left-10 h-52 w-52 rounded-full bg-gradient-to-br from-sky-200/40 via-indigo-200/20 to-transparent blur-3xl animate-pulse [animation-duration:7s] dark:from-sky-400/10 dark:via-indigo-400/5"></div>
          <div className="absolute bottom-10 left-10 h-10 w-10 -rotate-6 rounded-2xl bg-gradient-to-br from-amber-400/55 to-orange-500/55 blur-sm dark:from-amber-300/20 dark:to-orange-300/20"></div>
          <div className="absolute top-20 right-28 h-16 w-16 rounded-full border border-sky-300/40 dark:border-sky-300/20"></div>
          <div className="absolute top-24 right-6 h-28 w-28 rotate-12 border border-black/10 dark:border-white/10"></div>
          <div className="absolute bottom-14 right-24 h-8 w-24 -rotate-6 border border-black/10 dark:border-white/10"></div>
          <div className="absolute bottom-8 left-20 h-20 w-px bg-gradient-to-b from-transparent via-black/15 to-transparent dark:via-white/15"></div>
          <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10"></div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start mb-6 md:mb-10">
        <div className="lg:col-span-6 text-left">
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <div className="text-xs text-sky-600 dark:text-sky-400 tracking-[0.3em] font-bold" style={{ fontFamily: "monospace" }}>
              CAREER
            </div>
            <div className="w-12 h-0.5 bg-sky-500 dark:bg-sky-400"></div>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2 md:mb-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-sky-500 to-gray-900 dark:from-sky-400 dark:to-white bg-clip-text text-transparent transition-all duration-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
              WORK EXPERIENCE
            </h2>
            <span className="text-xs text-sky-600 dark:text-sky-400 font-bold tracking-[0.2em]" style={{ fontFamily: "monospace" }}>AT</span>
            <span className="text-4xl md:text-5xl font-black text-sky-500 dark:text-sky-400 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>02</span>
          </div>
          <div className="w-12 h-0.5 bg-sky-500 dark:bg-sky-400"></div>
        </div>

        <div className="lg:col-span-6 text-left">
          <div className="flex lg:justify-end">
            <Button
              asChild
              variant="outline"
              className="group h-11 rounded-full border-black/25 bg-white/70 px-5 text-black backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black hover:bg-white dark:border-white/25 dark:bg-white/5 dark:text-white dark:hover:border-white dark:hover:bg-white/10"
            >
              <a href="/resume.pdf" download aria-label="Download resume PDF">
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                <span className="text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "monospace" }}>
                  DOWNLOAD RESUME
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>

<div className="space-y-6 md:space-y-10">
        {jobs.length ? (
          jobs.map((job, index) => (
            <div key={index} id={`job-${index}`}>
              <Job
                job={job}
                index={index}
                highlightSkill={highlightSkill}
                highlightJob={highlightJobIndex === index}
              />
            </div>
          ))
        ) : (
          <div className="space-y-8">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 backdrop-blur shadow-[0_18px_36px_rgba(0,0,0,0.12)] animate-pulse"
              >
                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 mb-4"></div>
                <div className="h-6 w-64 bg-gray-300 dark:bg-gray-700 mb-3"></div>
                <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="h-3 w-11/12 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="h-3 w-10/12 bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {jobs.length > 0 && (
        <div className="mt-10 md:mt-14">
          <div className="text-sm text-gray-700 dark:text-gray-300 tracking-[0.3em] font-bold mb-4" style={{ fontFamily: "monospace" }}>
            SKILLS GRAPH
          </div>
          <SkillsGraph jobs={jobs} onSkillClick={onSkillClick} />
        </div>
      )}
    </SectionShell>
  );
}
