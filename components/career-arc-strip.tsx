"use client";

const milestones = [
  {
    key: "brain",
    label: "GOOGLE BRAIN",
    sublabel: "FS Studio · 6mo",
    dotColor: "bg-amber-400",
    tickColor: "bg-amber-400/50",
    textColor: "text-amber-500 dark:text-amber-400",
    jobIndex: "04",
    spaceBefore: 0,
    align: "items-start" as const,
  },
  {
    key: "googlex",
    label: "GOOGLE X",
    sublabel: "Everyday Robots · 14mo",
    dotColor: "bg-sky-400",
    tickColor: "bg-sky-400/50",
    textColor: "text-sky-500 dark:text-sky-400",
    jobIndex: "03",
    spaceBefore: 6,
    align: "items-center" as const,
  },
  {
    key: "stout",
    label: "STOUT AG",
    sublabel: "Current · 34mo+",
    dotColor: "bg-emerald-400",
    tickColor: "bg-emerald-400/50",
    textColor: "text-emerald-500 dark:text-emerald-400",
    isActive: true,
    jobIndex: "01",
    spaceBefore: 18,
    align: "items-center" as const,
  },
];

export default function CareerArcStrip() {
  return (
    <div className="hidden md:block mb-10 md:mb-14">
      <div
        className="text-xs text-gray-500 dark:text-gray-400 tracking-[0.3em] font-bold mb-6"
        style={{ fontFamily: "monospace" }}
      >
        CAREER ARC
      </div>

      {/* Relative container — continuous line behind everything */}
      <div className="relative flex items-start w-full">
        {/* Full-width line at vertical center of dot (dot = 10px, center = 5px) */}
        <div className="absolute left-0 right-0 top-[5px] h-px bg-black/20 dark:bg-white/25 pointer-events-none" />

        {milestones.map((m) => (
          <>
            {/* Proportional spacer */}
            {m.spaceBefore > 0 && (
              <div key={`sp-${m.key}`} style={{ flex: m.spaceBefore }} className="shrink-0" />
            )}

            {/* Dot + label, stacked, centered on line */}
            <div key={m.key} className={`shrink-0 flex flex-col ${m.align} gap-2 relative z-10`}>
              {/* Dot */}
              <div className="relative flex flex-col items-center">
                {m.isActive && (
                  <div className={`absolute inset-0 rounded-full ${m.dotColor} animate-ping opacity-20`} />
                )}
                <div className={`w-2.5 h-2.5 rounded-full border-2 ${m.dotColor} ${m.isActive ? m.dotColor : "bg-white dark:bg-gray-950"}`} />
                {/* Tick line pointing down toward the job card */}
                <div className={`w-px h-2 ${m.tickColor} mt-0.5`} />
                <div className={`text-[8px] font-black tracking-widest ${m.textColor} opacity-60`} style={{ fontFamily: "monospace" }}>
                  {m.jobIndex}
                </div>
              </div>
              {/* Label */}
              <div>
                <div className={`text-xs font-black tracking-[0.15em] ${m.textColor} whitespace-nowrap`} style={{ fontFamily: "monospace" }}>
                  {m.label}
                </div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 tracking-[0.1em] font-bold whitespace-nowrap" style={{ fontFamily: "monospace" }}>
                  {m.sublabel}
                </div>
              </div>
            </div>
          </>
        ))}

        {/* Spacer from Stout to NOW */}
        <div style={{ flex: 34 }} className="shrink-0" />

        {/* NOW */}
        <div className="shrink-0 flex flex-col items-end gap-2 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="text-xs font-black tracking-[0.2em] text-emerald-500 dark:text-emerald-400 whitespace-nowrap" style={{ fontFamily: "monospace" }}>
            NOW
          </div>
        </div>
      </div>
    </div>
  );
}
