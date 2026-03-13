// githubRepos.map((repo, index) => {
//                 if (repo.pinned) {
//                   return (
//                     <div
//                       className="item"
//                       key={`repo${index}`}
//                       title={repo.name}
//                     >
//                       <div className="header">
//                         <a
//                           rel="noreferrer"
//                           href={repo.homepage}
//                           target="_blank"
//                         >
//                           {repo.name}
//                         </a>
//                         {repo.topics.includes("website") && (
//                           <span>Live Website!</span>
//                         )}
//                       </div>
//                       <p>{repo.description}</p>
//                       <div className="flex-spacer" />
//                       <div className="topics">
//                         <TypeWriterEffect
//                           textStyle={{
//                             lineHeight: "16px",
//                             color: "#66ff66",
//                             fontSize: "12px",
//                           }}
//                           startDelay={0}
//                           typeSpeed={100}
//                           text={repo.topics.join(" / ")}
//                         />
//                       </div>
//                     </div>
//                   );
//                 } else {
//                   return null;

//                 }
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
export type GithubRepoType = {
  pinned: boolean;
  name: string;
  homepage: string;
  topics: string[];
  description: string;
  pypiPackage?: string;
};
function getProjectColor(index: number): string {
  return COLOR_PALETTE[index % COLOR_PALETTE.length];
}
function Project(props: { githubRepo: GithubRepoType; index: number }) {
  return (
    <a href={props.githubRepo.homepage} className="space-y-12 p-2">
      <div className="group cursor-pointer p-4 md:p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 md:backdrop-blur shadow-[0_18px_36px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.16)]">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 min-w-0">
            <h3
              className="text-lg md:text-xl font-black text-black dark:text-white transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 tracking-[0.1em] truncate"
              style={{ fontFamily: "monospace" }}
            >
              {props.githubRepo.name}
            </h3>
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
        <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm mb-3 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 font-medium">
          {props.githubRepo.description || "No description available"}
        </p>
        <div className="flex flex-wrap gap-1.5 items-center">
          {props.githubRepo.topics.map((topic, index) => (
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
    </a>
  );
}

export default Project;
