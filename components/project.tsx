import { TechStack } from "@/app/api";

const COLOR_PALETTE = [
  "bg-purple-400",
  "bg-orange-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-red-400",
  "bg-yellow-400",
  "bg-pink-400",
  "bg-teal-400",
  "bg-indigo-400",
];

type TopicCategory = "framework" | "host" | "language" | "database";

const CATEGORY_META: Record<TopicCategory, { label: string; color: string; dotColor: string }> = {
  framework: { label: "FRAMEWORK", color: "text-indigo-600 dark:text-indigo-400", dotColor: "bg-indigo-400" },
  host: { label: "HOST", color: "text-sky-600 dark:text-sky-400", dotColor: "bg-sky-400" },
  language: { label: "LANGUAGE", color: "text-emerald-600 dark:text-emerald-400", dotColor: "bg-emerald-400" },
  database: { label: "DATABASE", color: "text-amber-600 dark:text-amber-400", dotColor: "bg-amber-400" },
};

export type GithubRepoType = {
  pinned: boolean;
  name: string;
  homepage: string;
  topics: string[];
  description: string;
  pypiPackage?: string;
  techStack?: TechStack;
};
function getProjectColor(index: number): string {
  return COLOR_PALETTE[index % COLOR_PALETTE.length];
}
function WebappStack({ meta }: { meta: TechStack }) {
  const orderedCategories: TopicCategory[] = ["framework", "language", "host", "database"];
  const entries = orderedCategories
    .filter((cat) => meta[cat]?.length)
    .map((cat) => ({ category: cat, items: meta[cat]! }));

  return (
    <div className="shrink-0">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-400/15 text-indigo-700 dark:text-indigo-400 text-[10px] font-black border border-indigo-300/60 dark:border-indigo-400/30 tracking-[0.15em]"
          style={{ fontFamily: "monospace" }}
        >
          WEB APP
        </span>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 items-center">
        {entries.map(({ category, items }) => {
          const meta = CATEGORY_META[category];
          return (
            <div key={category} className="contents">
              <span
                className={`text-[9px] md:text-[10px] font-black tracking-[0.15em] ${meta.color} text-right`}
                style={{ fontFamily: "monospace" }}
              >
                {meta.label}
              </span>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 items-center">
                {items.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-gray-700 dark:text-gray-200 text-[10px] md:text-[11px] font-bold tracking-[0.05em]"
                    style={{ fontFamily: "monospace" }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${meta.dotColor}`} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Project(props: { githubRepo: GithubRepoType; index: number }) {
  const techStack = props.githubRepo.techStack;
  const isWebapp = !!techStack;
  const displayTopics = props.githubRepo.topics;

  return (
    <a href={props.githubRepo.homepage} className="space-y-12 p-2">
      <div className="group cursor-pointer p-5 md:p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 md:backdrop-blur shadow-[0_18px_36px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.16)]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 min-w-0">
            <h3
              className="text-lg md:text-xl font-black text-black dark:text-white transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 tracking-[0.1em] truncate"
              style={{ fontFamily: "monospace" }}
            >
              {props.githubRepo.name}
            </h3>
            {props.githubRepo.homepage && !props.githubRepo.homepage.includes("github.com") && (
              <span
                className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-400/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-black border border-emerald-300/60 dark:border-emerald-400/30 tracking-[0.15em] animate-pulse [animation-duration:3s]"
                style={{ fontFamily: "monospace" }}
              >
                LIVE
              </span>
            )}
            {props.githubRepo.pypiPackage && (
              <span
                className="inline-flex gap-1.5 items-center shrink-0"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    `https://pypi.org/project/${props.githubRepo.pypiPackage}`,
                    "_blank",
                  );
                }}
              >
                <img
                  src={`https://img.shields.io/pypi/v/${props.githubRepo.pypiPackage}?style=for-the-badge&color=3572A5`}
                  alt={`PyPI version for ${props.githubRepo.pypiPackage}`}
                  className="h-5 md:h-6 rounded-md transition-transform duration-200 hover:scale-110"
                />
                <img
                  src={`https://img.shields.io/pypi/dm/${props.githubRepo.pypiPackage}?style=for-the-badge&color=3572A5`}
                  alt={`PyPI downloads for ${props.githubRepo.pypiPackage}`}
                  className="h-5 md:h-6 rounded-md transition-transform duration-200 hover:scale-110 hidden sm:block"
                />
              </span>
            )}
          </div>
          <div
            className="text-sm text-gray-500 dark:text-gray-400 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 font-bold tracking-[0.2em]"
            style={{ fontFamily: "monospace" }}
          >
            0{props.index + 1}
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm mb-4 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 font-medium">
          {props.githubRepo.description || "No description available"}
        </p>
        {isWebapp ? (
          <div className="border-t border-black/5 dark:border-white/5 pt-4 flex flex-col md:flex-row gap-3 md:gap-4 items-start">
            <WebappStack meta={techStack} />
            <div className="flex flex-wrap gap-1.5 items-center flex-1 min-w-0 md:justify-end">
              {displayTopics.map((topic, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 rounded-full bg-white/80 dark:bg-white/10 text-gray-700 dark:text-gray-200 text-[10px] md:text-[11px] font-bold border border-black/10 dark:border-white/10 transition-all duration-300 hover:bg-white dark:hover:bg-white/20 hover:scale-105 tracking-[0.05em]"
                  style={{ fontFamily: "monospace" }}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5 items-center">
            {displayTopics.map((topic, index) => (
              <span
                key={index}
                className="px-2 py-0.5 rounded-full bg-white/80 dark:bg-white/10 text-gray-700 dark:text-gray-200 text-[10px] md:text-[11px] font-bold border border-black/10 dark:border-white/10 transition-all duration-300 hover:bg-white dark:hover:bg-white/20 hover:scale-105 tracking-[0.05em]"
                style={{ fontFamily: "monospace" }}
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

export default Project;
