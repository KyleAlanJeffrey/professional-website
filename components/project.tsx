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
      <div className="group cursor-pointer p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-[0_18px_36px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.16)]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3
              className="text-2xl font-black text-black dark:text-white transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 tracking-[0.1em]"
              style={{ fontFamily: "monospace" }}
            >
              {props.githubRepo.name}
            </h3>
            {props.githubRepo.pypiPackage && (
              <span
                className="inline-flex gap-1.5 items-center"
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
                  className="h-7 rounded-md transition-transform duration-200 hover:scale-110"
                />
                <img
                  src={`https://img.shields.io/pypi/dm/${props.githubRepo.pypiPackage}?style=for-the-badge&color=3572A5`}
                  alt={`PyPI downloads for ${props.githubRepo.pypiPackage}`}
                  className="h-7 rounded-md transition-transform duration-200 hover:scale-110"
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
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 font-medium">
          {props.githubRepo.description || "No description available"}
        </p>
        <div className="flex flex-wrap gap-2 mb-6 items-center">
          {props.githubRepo.topics.map((topic, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 text-gray-700 dark:text-gray-200 text-xs font-bold border border-black/10 dark:border-white/10 transition-all duration-300 hover:bg-white dark:hover:bg-white/20 hover:scale-105 tracking-[0.1em]"
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
