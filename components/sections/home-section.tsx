import { Button } from "@/components/ui/button";
import bio from "@/data/bio.json";
import jobsData from "@/data/jobs.json";
import Image from "next/image";
import { ReactNode } from "react";

type HomeSectionProps = {
  scrollToSection: (sectionId: string) => void;
  scrollToJob: (index: number) => void;
  scrollToTweet: (index: number) => void;
  handleSkillClick: (skill: string) => void;
  renderBioWithLinks: (text: string) => ReactNode;
};

export default function HomeSection({
  scrollToSection,
  scrollToJob,
  scrollToTweet,
  handleSkillClick,
  renderBioWithLinks,
}: HomeSectionProps) {
  const jobs = jobsData.jobs ?? [];

  return (
    <section id="home" className="max-w-7xl mx-auto pt-4 lg:pt-12 pb-14 lg:pb-28 relative">
      <h2 className="sr-only">Robotics Software Engineer Portfolio and AI Projects</h2>
      <div className="absolute top-12 right-6 w-40 h-40 border border-black/10 dark:border-white/10 rotate-12 hidden lg:block"></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 min-h-[48vh] lg:min-h-[60vh]">
        <div className="lg:col-span-7 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2 text-xs md:text-sm font-semibold tracking-[0.2em] text-gray-800 dark:text-gray-200 backdrop-blur mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"></span>
            OPEN TO COLLABS
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-black dark:text-white leading-[0.78] sm:leading-[0.62] mb-6 transition-all duration-300"
            style={{
              letterSpacing: "0.06em",
              textShadow: "0 12px 40px rgba(0,0,0,0.12)",
            }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white">
              KYLE
            </span>
            <br />
            <span className="-mt-4 sm:-mt-8 block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600">
              JEFFREY
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 max-w-xl mb-8">
            Robotics engineer. Agriculture AI Software Engineer. Humanoid Robot Obsessed. Web Developer Occasionally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start justify-start">
            <Button
              className="group bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 px-6 h-11 text-sm font-semibold tracking-[0.2em] shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.25)] transition-all duration-300"
              onClick={() => scrollToSection("work")}
            >
              VIEW WORK
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Button>
            <Button
              variant="outline"
              className="group border-black/30 dark:border-white/30 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 px-6 h-11 text-sm font-semibold tracking-[0.2em] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              CONTACT
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Button>
          </div>

          <div className="mt-8 text-left">
            <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/85 dark:bg-white/5 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]"></span>
                    <div className="text-xs font-black tracking-[0.3em] text-gray-800 dark:text-gray-200">
                      CURRENT FOCUS
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em]">
                    TAP TO JUMP
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      desc: "Autonomy for Agricultural",
                      onClick: () => scrollToJob(0),
                    },
                    {
                      desc: "Robot Fighting",
                      onClick: () => scrollToTweet(0),
                    },
                  ].map((item) => (
                    <button
                      key={item.desc}
                      type="button"
                      className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-white/10 px-4 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(0,0,0,0.14)] hover:bg-white dark:hover:bg-white/20"
                      onClick={item.onClick}
                      data-keep-highlight="true"
                    >
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400/40 via-cyan-300/20 to-indigo-400/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-6 w-6 rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 flex items-center justify-center text-[10px] font-black text-gray-700 dark:text-gray-200">
                          →
                        </div>
                        <div>
                          <p className="text-sm text-gray-800 dark:text-gray-100 transition-colors duration-300 group-hover:text-black dark:group-hover:text-white font-semibold tracking-[0.03em]">
                            {item.desc}
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em] mt-2">
                            VIEW
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto w-full max-w-[20rem] md:max-w-[26rem] lg:max-w-[34rem] aspect-[3/2]">
            <div className="absolute inset-0 rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-[0_30px_60px_rgba(0,0,0,0.15)]"></div>
            <div className="absolute top-6 -right-2 w-16 h-16 -rotate-6 rounded-2xl bg-gradient-to-br from-amber-400/65 to-orange-500/65 blur-sm"></div>
            <Image
              src="/me-hero.webp"
              alt="Portrait"
              className="absolute inset-3 rounded-2xl object-cover"
              fill
              sizes="(min-width: 1024px) 26rem, (min-width: 768px) 20rem, 16rem"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 relative z-10">
        <div className="lg:col-span-1 hidden lg:block self-start">
          <div
            className="text-sm text-gray-500 dark:text-gray-400 tracking-[0.3em] font-bold -rotate-90 origin-center transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300"
            style={{ fontFamily: "monospace" }}
          >
            01
          </div>
        </div>

        <div className="lg:col-span-5 text-left">
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-8 font-semibold text-base md:text-lg">
            {renderBioWithLinks(bio.bio)}
          </p>
        </div>
        <div className="lg:col-span-6 flex lg:block gap-4 lg:gap-0 justify-center">
          <div className="grid gap-4 w-full max-w-xl">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 backdrop-blur">
              <div className="text-xs tracking-[0.3em] text-gray-500 dark:text-gray-400 font-semibold mb-2">SIGNAL</div>
              <div className="text-3xl font-black text-black dark:text-white tracking-[0.08em]">ROBOTICS</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                software systems and interfaces
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 backdrop-blur">
              <div className="text-xs tracking-[0.3em] text-gray-500 dark:text-gray-400 font-semibold mb-3">TOOLBOX</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-[10px] font-bold">
                  i
                </span>
                Click a skill to jump to the matching role
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(jobs.flatMap((job) => job.skills ?? []).map((skill) => String(skill).trim()).filter(Boolean)))
                  .slice(0, 99)
                  .map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSkillClick(item)}
                      data-keep-highlight="true"
                      className="text-xs px-2.5 py-1 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 text-gray-700 dark:text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:bg-white dark:hover:bg-white/20"
                    >
                      {item}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
