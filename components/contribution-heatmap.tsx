"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type CommitLike = { commit: { author: { date: string } } };

const CELL = 14;
const GAP  = 3;
const STEP = CELL + GAP; // 17 px per slot

const LEFT = 32; // space for day-of-week labels
const TOP  = 18; // space for month labels

const MAX_WEEKS = 52;

function cellFillClass(count: number): string {
  if (count === 0) return "fill-gray-200 dark:fill-white/10";
  if (count === 1) return "fill-emerald-200 dark:fill-emerald-900";
  if (count === 2) return "fill-emerald-400 dark:fill-emerald-700";
  return "fill-emerald-600 dark:fill-emerald-500";
}

function buildGrid(commits: CommitLike[]) {
  const countByDay = new Map<string, number>();
  for (const c of commits) {
    const key = new Date(c.commit.author.date).toLocaleDateString("en-CA");
    countByDay.set(key, (countByDay.get(key) ?? 0) + 1);
  }

  const today = new Date();
  const gridEnd = new Date(today);
  gridEnd.setDate(today.getDate() + (6 - today.getDay()));

  const gridStart = new Date(gridEnd);
  gridStart.setDate(gridEnd.getDate() - (MAX_WEEKS * 7 - 1));

  const weeks: { date: Date; count: number }[][] = [];
  const monthLabels: { label: string; col: number }[] = [];
  const seenMonths = new Set<string>();

  const cursor = new Date(gridStart);
  for (let w = 0; w < MAX_WEEKS; w++) {
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

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function ContributionHeatmap({ commits }: { commits: CommitLike[] }) {
  const { weeks: allWeeks, monthLabels: allMonthLabels } = useMemo(() => buildGrid(commits), [commits]);
  const [tooltip, setTooltip] = useState<{ date: Date; count: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleWeeks, setVisibleWeeks] = useState(MAX_WEEKS);

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const availableWidth = width - LEFT;
    const fits = Math.max(8, Math.min(MAX_WEEKS, Math.floor((availableWidth + GAP) / STEP)));
    setVisibleWeeks(fits);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Show the most recent weeks
  const startIdx = Math.max(0, allWeeks.length - visibleWeeks);
  const weeks = allWeeks.slice(startIdx);
  const monthLabels = allMonthLabels
    .filter((m) => m.col >= startIdx)
    .map((m) => ({ ...m, col: m.col - startIdx }));

  const svgW = LEFT + visibleWeeks * STEP - GAP;
  const svgH = TOP + 7 * STEP - GAP;

  return (
    <div ref={containerRef}>
      <div className="text-xs font-black tracking-[0.2em] text-black dark:text-white mb-3 text-center" style={{ fontFamily: "monospace" }}>
        CONTRIBUTIONS
      </div>

      <div>
        <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ display: "block", width: "100%", height: "auto" }}>
          {/* Month labels */}
          {monthLabels.map(({ label, col }) => (
            <text
              key={label + col}
              x={LEFT + col * STEP}
              y={TOP - 4}
              className="fill-gray-500 dark:fill-gray-400"
              style={{ fontSize: 9, fontFamily: "monospace", fontWeight: "bold" }}
            >
              {label.toUpperCase()}
            </text>
          ))}

          {/* Day-of-week labels */}
          {DAY_LABELS.map((lbl, i) =>
            lbl ? (
              <text
                key={i}
                x={LEFT - 4}
                y={TOP + i * STEP + CELL - 1}
                textAnchor="end"
                className="fill-gray-400 dark:fill-gray-500"
                style={{ fontSize: 8, fontFamily: "monospace", fontWeight: "bold" }}
              >
                {lbl.toUpperCase()}
              </text>
            ) : null
          )}

          {/* Cells */}
          {weeks.map((week, wi) =>
            week.map((cell, di) => (
              <rect
                key={`${wi}-${di}`}
                x={LEFT + wi * STEP}
                y={TOP + di * STEP}
                width={CELL}
                height={CELL}
                rx={2}
                ry={2}
                className={`${cellFillClass(cell.count)} cursor-pointer transition-opacity duration-100 hover:opacity-60`}
                onMouseEnter={() => setTooltip(cell)}
                onMouseLeave={() => setTooltip(null)}
              />
            ))
          )}
        </svg>
      </div>

      {/* Tooltip */}
      <div className="h-4 mt-2 text-[10px] font-bold tracking-[0.08em] text-gray-500 dark:text-gray-400 text-center" style={{ fontFamily: "monospace" }}>
        {tooltip
          ? `${tooltip.count} commit${tooltip.count !== 1 ? "s" : ""} · ${tooltip.date.toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" })}`
          : "\u00A0"}
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-1.5 mt-1">
        <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 tracking-[0.05em]" style={{ fontFamily: "monospace" }}>LESS</span>
        <svg width={STEP * 4 - GAP} height={CELL} style={{ display: "block" }}>
          {[0, 1, 2, 3].map((t, i) => (
            <rect key={t} x={i * STEP} y={0} width={CELL} height={CELL} rx={2} ry={2} className={cellFillClass(t)} />
          ))}
        </svg>
        <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 tracking-[0.05em]" style={{ fontFamily: "monospace" }}>MORE</span>
      </div>
    </div>
  );
}
