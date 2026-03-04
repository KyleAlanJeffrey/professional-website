"use client";

import { useMemo, useState } from "react";

type CommitLike = { commit: { author: { date: string } } };

function cellColor(count: number): string {
  if (count === 0) return "bg-gray-200 dark:bg-white/10";
  if (count === 1) return "bg-emerald-200 dark:bg-emerald-900";
  if (count === 2) return "bg-emerald-400 dark:bg-emerald-700";
  return "bg-emerald-600 dark:bg-emerald-500";
}

function buildGrid(commits: CommitLike[]) {
  const countByDay = new Map<string, number>();
  for (const c of commits) {
    const key = new Date(c.commit.author.date).toLocaleDateString("en-CA"); // YYYY-MM-DD local
    countByDay.set(key, (countByDay.get(key) ?? 0) + 1);
  }

  // Align grid end to most recent Saturday so it ends on a full week
  const today = new Date();
  const gridEnd = new Date(today);
  gridEnd.setDate(today.getDate() + (6 - today.getDay())); // next Saturday (or today if Sat)

  const gridStart = new Date(gridEnd);
  gridStart.setDate(gridEnd.getDate() - 364); // 52 weeks

  const weeks: { date: Date; count: number }[][] = [];
  const monthLabels: { label: string; col: number }[] = [];
  const seenMonths = new Set<string>();

  const cursor = new Date(gridStart);
  for (let w = 0; w < 52; w++) {
    const week: { date: Date; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const key = cursor.toLocaleDateString("en-CA");
      const monthKey = `${cursor.getFullYear()}-${cursor.getMonth()}`;
      if (!seenMonths.has(monthKey)) {
        seenMonths.add(monthKey);
        monthLabels.push({
          label: cursor.toLocaleString("default", { month: "short" }),
          col: w,
        });
      }
      week.push({ date: new Date(cursor), count: countByDay.get(key) ?? 0 });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return { weeks, monthLabels };
}

export default function ContributionHeatmap({ commits }: { commits: CommitLike[] }) {
  const { weeks, monthLabels } = useMemo(() => buildGrid(commits), [commits]);
  const [tooltip, setTooltip] = useState<{ date: Date; count: number } | null>(null);

  const CELL = 11; // px per cell
  const GAP  = 2;  // px gap
  const STEP = CELL + GAP;

  return (
    <div className="min-w-max">
      <div className="text-xs font-black tracking-[0.2em] text-black dark:text-white mb-3" style={{ fontFamily: "monospace" }}>
        CONTRIBUTIONS
      </div>

      {/* Month labels */}
      <div className="relative h-4 ml-8 mb-1">
        {monthLabels.map(({ label, col }) => (
          <span
            key={label + col}
            className="absolute text-[9px] font-bold text-gray-500 dark:text-gray-400 tracking-[0.05em]"
            style={{ left: col * STEP, fontFamily: "monospace" }}
          >
            {label.toUpperCase()}
          </span>
        ))}
      </div>

      <div className="flex gap-[2px]">
        {/* Day-of-week labels */}
        <div className="flex flex-col gap-[2px] mr-1 w-7">
          {["", "MON", "", "WED", "", "FRI", ""].map((lbl, i) => (
            <div
              key={i}
              className="text-[8px] font-bold text-gray-400 dark:text-gray-500 text-right leading-none"
              style={{ height: CELL, lineHeight: `${CELL}px`, fontFamily: "monospace" }}
            >
              {lbl}
            </div>
          ))}
        </div>

        {/* Week columns */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[2px]">
            {week.map((cell, di) => (
              <div
                key={di}
                className={`rounded-[2px] cursor-pointer transition-opacity duration-100 hover:opacity-60 ${cellColor(cell.count)}`}
                style={{ width: CELL, height: CELL }}
                onMouseEnter={() => setTooltip(cell)}
                onMouseLeave={() => setTooltip(null)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Inline tooltip */}
      <div className="h-4 mt-2 text-[10px] font-bold tracking-[0.08em] text-gray-500 dark:text-gray-400" style={{ fontFamily: "monospace" }}>
        {tooltip
          ? `${tooltip.count} commit${tooltip.count !== 1 ? "s" : ""} · ${tooltip.date.toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" })}`
          : "\u00A0"}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-1">
        <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 tracking-[0.05em]" style={{ fontFamily: "monospace" }}>LESS</span>
        {[0, 1, 2, 3].map((t) => (
          <div key={t} className={`rounded-[2px] ${cellColor(t)}`} style={{ width: CELL, height: CELL }} />
        ))}
        <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 tracking-[0.05em]" style={{ fontFamily: "monospace" }}>MORE</span>
      </div>
    </div>
  );
}
