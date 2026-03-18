import Job from "@/components/job";
import CareerArcStrip from "@/components/career-arc-strip";
import SectionTitle from "@/components/section-title";
import SkillsGraph from "@/components/skills-graph";
import SectionShell from "@/components/sections/section-shell";
import { Button } from "@/components/ui/button";
import jobsData from "@/data/jobs.json";
import { Download } from "lucide-react";
import { Fragment } from "react";

function getStartYear(duration: string): number {
  const yr = duration.split("'")[1]?.split(" ")[0];
  return yr ? 2000 + parseInt(yr) : 0;
}

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
          <SectionTitle category="CAREER" title="WORK EXPERIENCE" number="02" color="sky" sectionId="work" />
        </div>

        <div className="lg:col-span-6 text-left">
          <div className="flex lg:justify-end">
            <Button
              asChild
              variant="outline"
              className="group h-11 rounded-full border-black/25 bg-white/70 px-5 text-black md:backdrop-blur-smtransition-all duration-300 hover:-translate-y-0.5 hover:border-black hover:bg-white dark:border-white/25 dark:bg-white/5 dark:text-white dark:hover:border-white dark:hover:bg-white/10"
            >
              <a href="/resume.pdf" download aria-label="Download resume PDF" onClick={() => (window as any).gtag?.("event", "resume_download")}>
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                <span className="text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "monospace" }}>
                  DOWNLOAD RESUME
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>

<CareerArcStrip />

      <div className="relative space-y-6 md:space-y-10">
        {/* Continuous spine */}
        <div className="hidden lg:block absolute left-[5px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-400/50 via-sky-400/40 to-amber-400/50 -z-10" />
        {jobs.length ? (
          jobs.map((job, index) => {
            const prevYear = index > 0 ? getStartYear(jobs[index - 1].duration) : null;
            const thisYear = getStartYear(job.duration);
            const showYearMarker = prevYear !== null && thisYear !== prevYear;
            return (
            <Fragment key={index}>
              {showYearMarker && (
                <div className="hidden lg:flex items-center gap-2 !my-1">
                  <div className="text-[9px] text-sky-400/60 font-bold tracking-[0.2em] w-5 text-right" style={{ fontFamily: "monospace" }}>
                    {thisYear}
                  </div>
                  <div className="flex-1 h-px bg-sky-400/15" />
                </div>
              )}
              <div id={`job-${index}`}>
                <Job
                  job={job}
                  index={index}
                  highlightSkill={highlightSkill}
                  highlightJob={highlightJobIndex === index}
                />
              </div>
            </Fragment>
            );
          })
          ) : (
          <div className="space-y-8">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 md:backdrop-blur shadow-[0_18px_36px_rgba(0,0,0,0.12)] animate-pulse"
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
          <SkillsGraph jobs={jobs} onSkillClick={onSkillClick} autoStart={false} />
        </div>
      )}
    </SectionShell>
  );
}
