"use client";

import { Button } from "@/components/ui/button";
import bio from "@/data/bio.json";
import jobsData from "@/data/jobs.json";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

type HomeSectionProps = {
  scrollToSection: (sectionId: string) => void;
  scrollToJob: (index: number) => void;
  scrollToTweet: (index: number) => void;
  handleSkillClick: (skill: string) => void;
  renderBioWithLinks: (text: string) => ReactNode;
};

const HIGHLIGHTS = [
  { label: "GOOGLE X", sub: "Everyday Robots", color: "bg-sky-500" },
  { label: "STOUT AG", sub: "Agriculture AI", color: "bg-amber-500" },
  { label: "UCSC", sub: "Robotics BSc", color: "bg-violet-500" },
];

export default function HomeSection({
  scrollToSection,
  scrollToJob,
  scrollToTweet,
  handleSkillClick,
  renderBioWithLinks,
}: HomeSectionProps) {
  const jobs = jobsData.jobs ?? [];
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const a = `transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;
  const d = (ms: number) => ({ transitionDelay: mounted ? `${ms}ms` : "0ms" });

  const skills = Array.from(
    new Set(jobs.flatMap((job) => job.skills ?? []).map((s) => String(s).trim()).filter(Boolean))
  );

  return (
    <section id="home" className="max-w-7xl mx-auto pt-6 lg:pt-16 pb-10 lg:pb-20 relative">
      <h2 className="sr-only">Robotics Software Engineer Portfolio and AI Projects</h2>

      {/* ─── Hero: Full-width name + photo overlap ─── */}
      <div className="relative min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-center">
        {/* Decorative elements */}
        <div className="absolute top-8 right-8 w-32 h-32 border border-black/10 dark:border-white/10 rotate-12 hidden lg:block" />
        <div className="absolute bottom-12 left-8 w-20 h-20 rounded-full border border-black/10 dark:border-white/10 hidden lg:block" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-amber-400/15 to-orange-500/10 blur-3xl hidden lg:block" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-sky-400/10 to-indigo-500/10 blur-3xl hidden lg:block" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">
          {/* Left: Text content */}
          <div className="lg:pr-8">
            <div
              className={`inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-1.5 text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-600 dark:text-gray-400 md:backdrop-blur mb-6 ${a}`}
              style={d(0)}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
              </span>
              OPEN TO COLLABS
            </div>

            <h1
              className={`mb-4 ${a}`}
              style={d(100)}
            >
              <span
                className="block text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-[0.04em]"
                style={{ fontFamily: "monospace" }}
              >
                <span className="text-black dark:text-white">KYLE</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600">
                  JEFFREY
                </span>
              </span>
            </h1>

            <p
              className={`text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium tracking-[0.05em] max-w-md mb-6 ${a}`}
              style={{ fontFamily: "monospace", ...d(200) }}
            >
              Robotics Engineer. Agriculture AI. Humanoid Robots.
            </p>

            {/* Credential pills */}
            <div className={`flex flex-wrap gap-2 mb-8 ${a}`} style={d(280)}>
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${h.color}`} />
                  <span className="text-[10px] font-black tracking-[0.15em] text-black dark:text-white" style={{ fontFamily: "monospace" }}>
                    {h.label}
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
                    {h.sub}
                  </span>
                </div>
              ))}
            </div>

            <div className={`flex items-center gap-4 ${a}`} style={d(350)}>
              <Button
                className="group bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 px-6 h-11 text-sm font-bold tracking-[0.2em] shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.25)] transition-all duration-300"
                onClick={() => scrollToSection("work")}
              >
                VIEW WORK
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Button>
              <Button
                variant="outline"
                className="group border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 px-6 h-11 text-sm font-bold tracking-[0.2em] hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => scrollToSection("contact")}
              >
                CONTACT
              </Button>
            </div>
          </div>

          {/* Right: Photo + overlay stats */}
          <div className={`relative ${a}`} style={d(200)}>
            <div className="relative mx-auto w-full max-w-[20rem] lg:max-w-[24rem] aspect-[3/4]">
              {/* Background frame */}
              <div className="absolute inset-0 rounded-3xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.12)]" />
              {/* Accent blob */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/40 to-orange-500/40 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-sky-400/30 to-indigo-500/30 blur-2xl" />
              {/* Image */}
              <Image
                src="/me-hero.webp"
                alt="Kyle Jeffrey"
                className="absolute inset-3 rounded-2xl object-cover"
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 22rem, 90vw"
                priority
              />
              {/* Floating quick-nav cards */}
              <button
                type="button"
                onClick={() => scrollToJob(0)}
                className="absolute -left-4 lg:-left-14 bottom-28 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-gray-900/90 md:backdrop-blur pl-5 pr-5 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] cursor-pointer overflow-hidden"
                data-keep-highlight="true"
              >
                <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-amber-400 to-orange-500" />
                <div className="text-[10px] font-bold tracking-[0.25em] text-amber-600 dark:text-amber-400 mb-0.5" style={{ fontFamily: "monospace" }}>NOW</div>
                <div className="text-sm font-black text-black dark:text-white tracking-[0.08em]" style={{ fontFamily: "monospace" }}>AG AUTONOMY</div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 tracking-[0.1em] mt-0.5" style={{ fontFamily: "monospace" }}>STOUT AG</div>
              </button>
              <button
                type="button"
                onClick={() => scrollToTweet(0)}
                className="absolute -right-4 lg:-right-10 bottom-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-gray-900/90 md:backdrop-blur pl-5 pr-5 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] cursor-pointer overflow-hidden"
                data-keep-highlight="true"
              >
                <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-sky-400 to-indigo-500" />
                <div className="text-[10px] font-bold tracking-[0.25em] text-sky-600 dark:text-sky-400 mb-0.5" style={{ fontFamily: "monospace" }}>HOBBY</div>
                <div className="text-sm font-black text-black dark:text-white tracking-[0.08em]" style={{ fontFamily: "monospace" }}>ROBOT FIGHTING</div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 tracking-[0.1em] mt-0.5" style={{ fontFamily: "monospace" }}>COMBAT BOTS</div>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`hidden lg:flex justify-center mt-12 ${a}`} style={d(600)}>
          <button
            onClick={() => scrollToSection("work")}
            className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
          >
            <span className="text-[10px] font-bold tracking-[0.3em]" style={{ fontFamily: "monospace" }}>SCROLL</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className={`mt-12 lg:mt-16 flex items-center gap-4 ${a}`} style={d(450)}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />
        <div className="h-1.5 w-1.5 rounded-full bg-amber-500/50" />
        <div className="h-1.5 w-1.5 rounded-full bg-orange-500/50" />
        <div className="h-1.5 w-1.5 rounded-full bg-sky-500/50" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />
      </div>

      {/* ─── Below fold: Bio + Skills ─── */}
      <div className={`mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 ${a}`} style={d(500)}>
        {/* Bio */}
        <div className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 md:backdrop-blur overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600" />
          <div className="text-[10px] font-bold tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-3" style={{ fontFamily: "monospace" }}>
            ABOUT
          </div>
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-medium text-sm md:text-base">
            {renderBioWithLinks(bio.bio)}
          </p>
        </div>

        {/* Skills cloud */}
        <div>
          <div className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 md:backdrop-blur overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-500" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500 dark:text-gray-400" style={{ fontFamily: "monospace" }}>
                SKILLS
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>
                CLICK TO JUMP TO ROLE
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((item) => (
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
    </section>
  );
}
