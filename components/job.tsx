//   "jobs": [
//     {
//       "title": "Senior Software Engineer",
//       "description": "Robotics Engineer, Full Stack Software Engineer:",
//       "skills": [
//         "Python",
//         "SaltStack",
//         "React",
//         "React Native",
//         "Expo",
//         "FastAPI",
//         "AWS",
//         "Gitlab",
//         "CI/CD",
//         "Linux",
//         "IOT",
//         "Node.js",
//         "Redux",
//         "Docker",
//         "Postgres",
//         "NestJS"
//       ],
//       "accomplishments": [
//         "SaltStack for Deploying versioned software stacks.",
//         "OS tooling and infrastructure for linux based IOT devices.",
//         "Dev OPS involving CI/CD on Gitlab.",
//         "React Native and Expo for Cross Platform Mobile App Development.",
//         "React for Web using Redux/React Router/React Query/ Next.js",
//         "Python for Backend API Development using FastAPI. ",
//         "AWS Cloud Management."
//       ],
//       "company": "Stout Industrial Technology",
//       "duration": " May '23 - Present"
//     },
type JobType = {
  title: string;
  description: string;
  skills: string[];
  accomplishments: string[];
  company: string;
  duration: string;
  website?: string;
};
function Job(props: {
  job: JobType;
  index: number;
  highlightSkill?: string | null;
  highlightJob?: boolean;
}) {
  function parseDurationMonths(duration: string): number {
    const monthMap: Record<string, number> = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
    };
    const parts = duration.split(" - ");
    const parseDate = (s: string): Date => {
      if (s.trim().toLowerCase() === "present") return new Date(2026, 2);
      const [mon, yr] = s.trim().split("'");
      return new Date(2000 + parseInt(yr), monthMap[mon.trim().toLowerCase().slice(0, 3)]);
    };
    const start = parseDate(parts[0]);
    const end = parseDate(parts[1] ?? "Present");
    return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  }

  const highlightSkill = props.highlightSkill?.toLowerCase() ?? null;
  const isHighlighted =
    !!props.highlightJob ||
    (highlightSkill &&
      props.job.skills.some(
        (skill) => skill.toLowerCase() === highlightSkill,
      ));
  const isActive = props.job.duration.toLowerCase().includes("present");
  const durationMonths = parseDurationMonths(props.job.duration);
  const barPct = Math.min((durationMonths / 40) * 100, 100);

  const company = props.job.company.toLowerCase();
  const dotColor = company.includes("stout")
    ? { border: "border-emerald-400", solid: "bg-emerald-400", text: "text-emerald-500 dark:text-emerald-400", bar: "bg-emerald-400/60 group-hover:bg-emerald-400", accent: "border-emerald-400/30" }
    : company.includes("google x") || company.includes("everyday")
    ? { border: "border-sky-400", solid: "bg-sky-400", text: "text-sky-500 dark:text-sky-400", bar: "bg-sky-400/60 group-hover:bg-sky-400", accent: "border-sky-400/30" }
    : company.includes("brain") || company.includes("fs studio")
    ? { border: "border-amber-400", solid: "bg-amber-400", text: "text-amber-500 dark:text-amber-400", bar: "bg-amber-400/60 group-hover:bg-amber-400", accent: "border-amber-400/30" }
    : { border: "border-sky-400", solid: "bg-sky-400", text: "text-sky-500 dark:text-sky-400", bar: "bg-sky-400/60 group-hover:bg-sky-400", accent: "border-sky-400/30" };

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-start group transition-all duration-300 rounded-2xl ${
        isHighlighted
          ? "bg-amber-50/60 dark:bg-white/5 ring-2 ring-amber-400/60 shadow-[0_12px_30px_rgba(251,191,36,0.15)] p-3 md:p-4"
          : ""
      }`}
    >
      <div className="lg:col-span-2 text-left relative">
        {/* Spine line */}
        {/* Dot */}
        <div className="hidden lg:block absolute left-0 top-1">
          {isActive && <div className={`absolute w-3 h-3 rounded-full ${dotColor.solid} animate-ping opacity-60`} />}
          <div className={`relative w-3 h-3 rounded-full border-2 ${dotColor.border} ${isActive ? dotColor.solid : "bg-white dark:bg-gray-950"}`} />
        </div>
        <div className="lg:pl-5">
          <div
            className="text-xs md:text-sm text-gray-600 dark:text-gray-400 tracking-[0.2em] font-bold mb-1.5 md:mb-2 transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200"
            style={{ fontFamily: "monospace" }}
          >
            {props.job.duration.toUpperCase()}
          </div>
          <div className="w-full max-w-[80px] h-1 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
            <div className={`absolute inset-y-0 left-0 transition-all duration-700 ${dotColor.bar}`} style={{ width: `${barPct}%` }} />
          </div>
          <div className="text-[9px] text-gray-400 dark:text-gray-500 font-bold tracking-widest mt-0.5" style={{ fontFamily: "monospace" }}>
            {durationMonths}MO
          </div>
          <div
            className="text-xl md:text-2xl font-black mt-2 md:mt-3 transition-all duration-300 group-hover:scale-105 tracking-[0.1em] text-gray-400 dark:text-gray-500"
            style={{ fontFamily: "monospace" }}
          >
            0{props.index + 1}
          </div>
        </div>
      </div>

      <div className="lg:col-span-10 text-left">
        <h3
          className="text-xl sm:text-2xl md:text-3xl font-black text-black dark:text-white mb-1.5 md:mb-2 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 tracking-[0.1em]"
          style={{ fontFamily: "monospace" }}
        >
          {props.job.title.toUpperCase()}
        </h3>
        <h3
          className="text-xl sm:text-2xl md:text-3xl font-black text-black dark:text-white mb-2 md:mb-3 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 tracking-[0.1em]"
          style={{ fontFamily: "monospace" }}
        >
          DEVELOPER
        </h3>
        <div
          className="text-xs md:text-sm mb-1.5 md:mb-2 font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500"
          style={{ fontFamily: "monospace" }}
        >
          AT
        </div>
        {props.job.website ? (
          <a
            href={props.job.website}
            target="_blank"
            rel="noreferrer"
            className={`text-base md:text-lg mb-2 md:mb-3 font-bold tracking-[0.1em] underline underline-offset-4 decoration-current/30 hover:decoration-current hover:underline-offset-2 opacity-80 hover:opacity-100 inline-block transition-all duration-300 ${dotColor.text}`}
            style={{ fontFamily: "monospace" }}
          >
            {props.job.company.toUpperCase()}
          </a>
        ) : (
          <h4
            className={`text-base md:text-lg mb-2 md:mb-3 font-bold tracking-[0.1em] ${dotColor.text}`}
            style={{ fontFamily: "monospace" }}
          >
            {props.job.company.toUpperCase()}
          </h4>
        )}
        <p className={`text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-3 md:mb-4 font-medium whitespace-pre-line break-words pl-3 border-l-2 ${dotColor.accent}`}>
          {props.job.description}
        </p>
        <div
          className="text-xs md:text-sm mb-2 md:mb-3 font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500"
          style={{ fontFamily: "monospace" }}
        >
          ACCOMPLISHMENTS
        </div>

        <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-4 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium list-disc list-outside pl-5 text-left">
          {props.job.accomplishments.map((accomplishment, index) => (
            <li key={index} className="break-words">
              {accomplishment}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 md:gap-2 justify-start">
          {props.job.skills.map((skill, index) => {
            const isSkillHighlighted =
              highlightSkill &&
              skill.toLowerCase() === highlightSkill;
            return (
            <span
              key={`${skill}-${index}`}
              className={`px-2.5 md:px-3 py-0.5 md:py-1 text-[11px] md:text-xs font-bold border rounded-full transition-all duration-300 hover:scale-105 tracking-[0.1em] ${
                isSkillHighlighted
                  ? "bg-amber-200 dark:bg-amber-300 text-gray-900 border-amber-400 dark:border-amber-300"
                  : "bg-white/80 dark:bg-white/10 text-gray-700 dark:text-gray-200 border-black/10 dark:border-white/10 hover:bg-white dark:hover:bg-white/20"
              }`}
              style={{ fontFamily: "monospace" }}
            >
              {skill.toUpperCase()}
            </span>
          )})}
        </div>
      </div>

    </div>
  );
}

export default Job;
