"use client";

const monthDiff = (a: Date, b: Date) =>
  (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());

const NOW = new Date(2026, 2); // March 2026
const CAREER_START = new Date(2021, 4); // May 2021 (Google Brain)

const segments = [
  {
    key: "brain",
    label: "GOOGLE BRAIN",
    sublabel: "FS Studio",
    start: new Date(2021, 4),
    end: new Date(2021, 10),
    color: "bg-amber-400 dark:bg-amber-500",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    key: "googlex",
    label: "GOOGLE X",
    sublabel: "Everyday Robots",
    start: new Date(2021, 10),
    end: new Date(2023, 0),
    color: "bg-sky-400 dark:bg-sky-500",
    textColor: "text-sky-600 dark:text-sky-400",
  },
  {
    key: "gap",
    label: "",
    sublabel: "",
    start: new Date(2023, 0),
    end: new Date(2023, 4),
    color: "bg-gray-200 dark:bg-gray-700",
    textColor: "",
    isGap: true,
  },
  {
    key: "stout",
    label: "STOUT AG",
    sublabel: "Current",
    start: new Date(2023, 4),
    end: NOW,
    color: "bg-emerald-400 dark:bg-emerald-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    isActive: true,
  },
];

const total = monthDiff(CAREER_START, NOW);

export default function CareerArcStrip() {
  return (
    <div className="mb-10 md:mb-14">
      <div
        className="text-xs text-gray-500 dark:text-gray-400 tracking-[0.3em] font-bold mb-3"
        style={{ fontFamily: "monospace" }}
      >
        CAREER ARC
      </div>

      {/* Bar */}
      <div className="flex w-full h-7 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 gap-px bg-black/5 dark:bg-white/5">
        {segments.map((seg) => {
          const months = monthDiff(seg.start, seg.end);
          const pct = (months / total) * 100;
          return (
            <div
              key={seg.key}
              className={`${seg.color} relative flex items-center justify-center transition-all duration-300 hover:brightness-110 group`}
              style={{ width: `${pct}%` }}
              title={seg.label ? `${seg.label} · ${months} months` : undefined}
            >
              {!seg.isGap && pct > 9 && (
                <span
                  className="text-[9px] font-black text-white/90 tracking-wider truncate px-1 select-none"
                  style={{ fontFamily: "monospace" }}
                >
                  {seg.label}
                </span>
              )}
              {seg.isActive && (
                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <span className="absolute w-2 h-2 rounded-full bg-white animate-ping opacity-70" />
                  <span className="relative w-2 h-2 rounded-full bg-white shadow-sm" />
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Labels below bar */}
      <div className="flex w-full mt-1.5">
        {segments.map((seg) => {
          const months = monthDiff(seg.start, seg.end);
          const pct = (months / total) * 100;
          return (
            <div key={seg.key} style={{ width: `${pct}%` }} className="overflow-hidden">
              {!seg.isGap && pct > 9 && (
                <div
                  className={`text-[9px] font-bold tracking-widest truncate ${seg.textColor}`}
                  style={{ fontFamily: "monospace" }}
                >
                  {seg.sublabel}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Year markers */}
      <div className="relative mt-3 h-4">
        <div className="absolute inset-0 flex">
          {segments.map((seg) => {
            const months = monthDiff(seg.start, seg.end);
            const pct = (months / total) * 100;
            return (
              <div key={seg.key} style={{ width: `${pct}%` }} className="relative">
                <div
                  className="absolute left-0 top-0 text-[8px] text-gray-400 dark:text-gray-500 font-bold tracking-widest border-l border-gray-200 dark:border-gray-700 pl-1 select-none"
                  style={{ fontFamily: "monospace" }}
                >
                  {seg.start.getFullYear()}
                </div>
              </div>
            );
          })}
          {/* NOW label at end */}
          <div className="absolute right-0 top-0 text-[8px] text-emerald-500 font-bold tracking-widest" style={{ fontFamily: "monospace" }}>
            NOW
          </div>
        </div>
      </div>
    </div>
  );
}
