import Commit from "@/components/commit";
import { useGithubData } from "@/components/providers/github-data-provider";
import SectionShell from "@/components/sections/section-shell";

export default function GithubSection() {
  const { commits, githubRepos, languageStats, languageColors } =
    useGithubData();

  return (
    <SectionShell
      id="github"
      className="mt-16 md:mt-24 max-w-7xl mx-auto cv-auto relative isolate"
      decorations={
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-10 -right-10 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-200/35 via-cyan-200/15 to-transparent blur-3xl animate-pulse [animation-duration:9s] dark:from-emerald-400/10 dark:via-cyan-400/5"></div>
          <div className="absolute top-14 right-24 h-3 w-3 rounded-full bg-emerald-300/60 dark:bg-emerald-300/20"></div>
          <div className="absolute bottom-16 right-24 h-12 w-12 -rotate-12 rounded-2xl bg-gradient-to-br from-amber-400/50 to-orange-500/50 blur-sm dark:from-amber-300/20 dark:to-orange-300/20"></div>
          <div className="absolute top-20 left-4 h-20 w-20 rounded-2xl border border-black/10 dark:border-white/10 rotate-12"></div>
          <div className="absolute bottom-12 right-8 h-7 w-28 -rotate-3 border border-black/10 dark:border-white/10"></div>
          <div className="absolute bottom-8 left-10 h-16 w-16 rounded-full border border-emerald-300/40 dark:border-emerald-300/20"></div>
          <div className="absolute inset-x-10 top-4 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10"></div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5 text-left">
          <div className="mb-4">
            <div className="text-sm text-gray-700 dark:text-gray-300 tracking-[0.3em] font-bold mb-2" style={{ fontFamily: "monospace" }}>DEVELOPMENT</div>
            <div className="w-16 h-1 bg-black dark:bg-white mx-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>GITHUB</h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>ACTIVITY</h2>
          <div className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-bold tracking-[0.2em]" style={{ fontFamily: "monospace" }}>AT</div>
          <div className="text-5xl md:text-6xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:scale-105 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>05</div>
          <div className="w-16 h-1 bg-black dark:bg-white mx-0 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
          </div>

          <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-8 transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium">
            Here's a snapshot of my recent coding activity and contributions.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 backdrop-blur shadow-[0_16px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)]">
              <div className="text-3xl font-black text-black dark:text-white mb-1 transition-all duration-300 group-hover:scale-105 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>{commits.length ? commits.length : "NA"}</div>
              <div className="text-sm text-gray-700 dark:text-gray-300 tracking-[0.2em] font-bold" style={{ fontFamily: "monospace" }}>COMMITS</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 font-bold tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
                THIS YEAR
              </div>
            </div>
            <div className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 backdrop-blur shadow-[0_16px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)]">
              <div className="text-3xl font-black text-black dark:text-white mb-1 transition-all duration-300 group-hover:scale-105 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>{githubRepos.length ? githubRepos.length : "NA"}</div>
              <div className="text-sm text-gray-700 dark:text-gray-300 tracking-[0.2em] font-bold" style={{ fontFamily: "monospace" }}>REPOSITORIES</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 font-bold tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
                ACTIVE
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="w-full rounded-2xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 p-5 md:p-8 backdrop-blur shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_52px_rgba(0,0,0,0.16)]">
            <div className="flex items-center justify-between mb-6">
              <h3
                className="text-xl font-black text-black dark:text-white transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                RECENT ACTIVITY
              </h3>
              <div
                className="text-sm text-red-500 animate-pulse font-bold tracking-[0.2em]"
                style={{ fontFamily: "monospace" }}
              >
                LIVE
              </div>
            </div>

            <div className="mb-8">
              {commits.length ? (
                <div className="space-y-4 max-h-80 overflow-y-auto overflow-x-hidden pr-3 scrollbar-hidden">
                  {commits.slice(0, 20).map((commit, index) => (
                    <Commit key={index} commit={commit} index={index} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-4 p-2 border border-black/10 dark:border-white/10 animate-pulse"
                    >
                      <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700"></div>
                      <div className="flex-1">
                        <div className="h-3 w-3/4 bg-gray-300 dark:bg-gray-700 mb-2"></div>
                        <div className="h-2 w-1/3 bg-gray-300 dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2 w-16 bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h4
                  className="text-sm font-black text-black dark:text-white transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.2em]"
                  style={{ fontFamily: "monospace" }}
                >
                  TOP LANGUAGES
                </h4>
                <div
                  className="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-[0.1em]"
                  style={{ fontFamily: "monospace" }}
                >
                  ALL REPOS
                </div>
              </div>
              <div className="space-y-3">
                {languageStats.length ? (
                  languageStats.slice(0, 5).map((stat) => {
                    const color = languageColors[stat.language.toLowerCase()] ?? "#6b7280";
                    return (
                      <div key={stat.language} className="flex items-center gap-4 group">
                        <div className="flex items-center space-x-3 min-w-[160px]">
                          <div className="w-3 h-3 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: color }}></div>
                          <span className="text-sm text-gray-800 dark:text-gray-200 transition-all duration-300 group-hover:text-black dark:group-hover:text-white font-bold tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
                            {stat.language.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 bg-gray-300 dark:bg-gray-600 h-2 overflow-hidden border border-gray-400 dark:border-gray-500">
                          <div className="h-2 transition-all duration-1000 group-hover:opacity-80" style={{ width: `${stat.percent}%`, backgroundColor: color }}></div>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 w-12 text-right transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 font-bold tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
                          {stat.percent}%
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="space-y-3 animate-pulse">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700"></div>
                        <div className="flex-1 h-2 bg-gray-300 dark:bg-gray-700"></div>
                        <div className="h-3 w-10 bg-gray-300 dark:bg-gray-700"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
