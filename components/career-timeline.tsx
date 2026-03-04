"use client";

import { useMemo, useState } from "react";

type Job = { title: string; company: string; duration: string };

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseMonthYear(s: string): Date {
  const clean = s.trim();
  if (clean.toLowerCase() === "present") return new Date();
  const [mon, yearStr] = clean.split(" ");
  const year = 2000 + parseInt(yearStr.replace("'", ""), 10);
  return new Date(year, MONTHS[mon] ?? 0, 1);
}

function parseDuration(duration: string): { start: Date; end: Date } {
  const [startStr, endStr] = duration.trim().split(" - ");
  return { start: parseMonthYear(startStr), end: parseMonthYear(endStr) };
}

function fmt(d: Date, isPresent: boolean): string {
  if (isPresent) return "NOW";
  return `'${String(d.getFullYear()).slice(2)}`;
}

type TimelineNode = {
  jobIndex: number;
  company: string;
  title: string;
  start: Date;
  end: Date;
  startPct: number;
  endPct: number;
  isPresent: boolean;
};

function buildTimeline(jobs: Job[]): TimelineNode[] {
  const parsed = jobs.map((job, i) => ({ ...parseDuration(job.duration), job, i }));
  const minMs = Math.min(...parsed.map((p) => p.start.getTime()));
  const maxMs = Math.max(...parsed.map((p) => p.end.getTime()));
  const span  = maxMs - minMs;

  return parsed
    .map(({ start, end, job, i }) => ({
      jobIndex:  i,
      company:   job.company,
      title:     job.title,
      start,
      end,
      startPct:  ((start.getTime() - minMs) / span) * 100,
      endPct:    ((end.getTime()   - minMs) / span) * 100,
      isPresent: end.getTime() >= Date.now() - 30 * 24 * 3600 * 1000,
    }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}

export default function CareerTimeline({ jobs }: { jobs: Job[] }) {
  const nodes = useMemo(() => buildTimeline(jobs), [jobs]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function scrollToJob(jobIndex: number) {
    document.getElementById(`job-${jobIndex}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    setActiveIndex(jobIndex);
  }

  return (
    <div className="mb-8 md:mb-10">
      <div className="text-sm text-gray-700 dark:text-gray-300 tracking-[0.3em] font-bold mb-8" style={{ fontFamily: "monospace" }}>
        TIMELINE
      </div>

      <div className="relative h-20 mx-4">
        {/* Base line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/20 dark:bg-white/20" />

        {/* Duration bars */}
        {nodes.map((node) => (
          <div
            key={node.jobIndex}
            className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-black/15 dark:bg-white/15 rounded-full"
            style={{ left: `${node.startPct}%`, width: `${node.endPct - node.startPct}%` }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, sortedIdx) => {
          const isActive  = activeIndex === node.jobIndex;
          const labelUp   = sortedIdx % 2 === 0;

          return (
            <button
              key={node.jobIndex}
              type="button"
              onClick={() => scrollToJob(node.jobIndex)}
              aria-label={`Jump to ${node.company}`}
              className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300
                ${isActive
                  ? "w-4 h-4 border-black dark:border-white bg-black dark:bg-white"
                  : "w-3 h-3 border-black/50 dark:border-white/50 bg-white dark:bg-gray-900 hover:border-black dark:hover:border-white hover:scale-125"
                }`}
              style={{ left: `${node.startPct}%` }}
            >
              {/* Label */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none
                  ${labelUp ? "bottom-full mb-3" : "top-full mt-3"}`}
              >
                <div className="text-[10px] font-black tracking-[0.08em] text-black dark:text-white leading-tight" style={{ fontFamily: "monospace" }}>
                  {node.company.split(" ")[0].toUpperCase()}
                </div>
                <div className="text-[9px] text-gray-500 dark:text-gray-400 font-bold tracking-[0.05em] leading-tight" style={{ fontFamily: "monospace" }}>
                  {fmt(node.start, false)}–{fmt(node.end, node.isPresent)}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
