import Project from "@/components/project";
import { useGithubData } from "@/components/providers/github-data-provider";
import SectionShell from "@/components/sections/section-shell";

type ProjectsSectionProps = {
  highlightSectionId: string | null;
};

export default function ProjectsSection({
  highlightSectionId,
}: ProjectsSectionProps) {
  const { githubRepos } = useGithubData();

  return (
    <SectionShell
      id="projects"
      className="mt-16 md:mt-24 max-w-7xl mx-auto transition-all duration-300 rounded-2xl relative isolate"
      highlighted={highlightSectionId === "projects"}
      highlightClassName="ring-2 ring-sky-400/70 bg-slate-100/50 dark:bg-white/5 shadow-[0_16px_40px_rgba(56,189,248,0.2)]"
      decorations={
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-8 right-4 h-44 w-44 rounded-full bg-gradient-to-tr from-sky-200/45 via-indigo-200/20 to-transparent blur-3xl animate-pulse [animation-duration:8s] dark:from-sky-400/10 dark:via-indigo-400/5"></div>
          <div className="absolute bottom-8 right-8 h-11 w-11 rotate-3 rounded-2xl bg-gradient-to-br from-amber-400/55 to-orange-500/55 blur-sm dark:from-amber-300/20 dark:to-orange-300/20"></div>
          <div className="absolute top-10 left-14 h-14 w-14 rounded-full border border-cyan-300/40 dark:border-cyan-300/20"></div>
          <div className="absolute bottom-8 -left-8 h-24 w-32 -rotate-6 border border-black/10 dark:border-white/10"></div>
          <div className="absolute top-28 left-6 h-8 w-20 rotate-12 border border-black/10 dark:border-white/10"></div>
          <div className="absolute bottom-10 right-10 h-3 w-3 rounded-full bg-indigo-300/60 dark:bg-indigo-300/20 animate-pulse [animation-duration:6s]"></div>
          <div className="absolute inset-x-12 bottom-6 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10"></div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 md:mb-20">
        <div className="lg:col-span-5 text-left">
          <div className="text-sm text-gray-700 dark:text-gray-300 tracking-[0.3em] font-bold mb-2" style={{ fontFamily: "monospace" }}>
            PORTFOLIO
          </div>
          <div className="w-16 h-1 bg-black dark:bg-white mx-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white mb-2 mt-6 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
            FEATURED
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
            PROJECTS
          </h2>
          <div className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-bold tracking-[0.2em]" style={{ fontFamily: "monospace" }}>
            AT
          </div>
          <div className="w-16 h-1 bg-black dark:bg-white mx-0 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
          </div>
          <div className="text-5xl md:text-6xl font-black text-black dark:text-white mb-6 transition-all duration-300 hover:scale-105 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
            04
          </div>
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium">
            A curated selection of my recent personal projects.
          </p>
        </div>

        <div className="lg:col-span-7">
          {githubRepos.length ? (
            githubRepos.map((repo, index) =>
                repo.pinned ? (
                  <Project githubRepo={repo} key={`repo-${index}`} index={index} />
                ) : null,
              )
          ) : (
            <div className="space-y-6">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 backdrop-blur shadow-[0_18px_36px_rgba(0,0,0,0.12)] animate-pulse"
                >
                  <div className="h-5 w-48 bg-gray-300 dark:bg-gray-700 mb-4"></div>
                  <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 mb-2"></div>
                  <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-700 mb-6"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
