"use client";

import GithubDataProvider from "@/components/providers/github-data-provider";
import { Button } from "@/components/ui/button";
import ContactSection from "@/components/sections/contact-section";
import GithubSection from "@/components/sections/github-section";
import HomeSection from "@/components/sections/home-section";
import ProjectsSection from "@/components/sections/projects-section";
import PublicationsSection from "@/components/sections/publications-section";
import TwitterSection from "@/components/sections/twitter-section";
import WorkSection from "@/components/sections/work-section";
import { ArrowUpRight, Download, Moon, Sun } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

type PageContentProps = {
  activeSection: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  scrollToSection: (sectionId: string) => void;
  scrollToJob: (index: number) => void;
  scrollToTweet: (index: number) => void;
  handleSkillClick: (skill: string) => void;
  renderBioWithLinks: (text: string) => ReactNode;
  highlightSkill: string | null;
  highlightJobIndex: number | null;
  highlightSectionId: string | null;
  highlightTweetIndex: number | null;
};

const SECTIONS = ["home", "work", "publications", "projects", "github", "twitter", "contact"] as const;

export default function PageContent(props: PageContentProps) {
  const [scrollY, setScrollY] = useState(0);


  const {
    activeSection,
    isDarkMode,
    toggleDarkMode,
    scrollToSection,
    scrollToJob,
    scrollToTweet,
    handleSkillClick,
    renderBioWithLinks,
    highlightSkill,
    highlightJobIndex,
    highlightSectionId,
    highlightTweetIndex,
  } = props;

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafId = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= 7) {
        scrollToSection(SECTIONS[num - 1]);
      } else if (e.key.toLowerCase() === "d") {
        toggleDarkMode();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scrollToSection, toggleDarkMode]);

  return (
    <div
      className="min-h-screen bg-[#f6f2ea] dark:bg-[#0b0c0f] transition-colors duration-300 relative pb-16 overflow-x-clip"
      style={{
        backgroundImage:
          "radial-gradient(1200px circle at 10% 2%, rgba(245,158,11,0.07), transparent 58%), radial-gradient(1000px circle at 88% 14%, rgba(14,165,233,0.06), transparent 56%), radial-gradient(950px circle at 14% 48%, rgba(249,115,22,0.05), transparent 60%), radial-gradient(900px circle at 82% 62%, rgba(56,189,248,0.045), transparent 58%), radial-gradient(980px circle at 42% 92%, rgba(251,191,36,0.045), transparent 62%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-96 inset-x-0 z-0"
        style={{ transform: `translate3d(0, ${scrollY * -0.08}px, 0)` }}
      >
        <div className="absolute top-[2%] -left-20 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-amber-300/16 via-orange-300/10 to-transparent blur-3xl"></div>
        <div className="absolute top-[24%] -right-24 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-sky-300/14 via-cyan-300/8 to-transparent blur-3xl"></div>
        <div className="absolute top-[50%] -left-20 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-orange-300/12 via-amber-200/8 to-transparent blur-3xl"></div>
        <div className="absolute top-[74%] right-[8%] h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-sky-300/12 via-indigo-300/6 to-transparent blur-3xl"></div>
        <div className="absolute top-[96%] left-[20%] h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-amber-200/10 via-orange-200/6 to-transparent blur-3xl"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-[10%] w-px h-full bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent animate-pulse"></div>
        <div
          className="absolute top-0 left-[25%] w-0.5 h-3/4 bg-gradient-to-b from-gray-400 dark:from-gray-600 to-transparent opacity-60 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-1/4 left-[40%] w-px h-1/2 bg-gradient-to-b from-transparent via-gray-500 dark:via-gray-500 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-0 left-[55%] w-0.5 h-5/6 bg-gradient-to-b from-gray-300 dark:from-gray-700 to-transparent opacity-40 animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/3 left-[70%] w-px h-2/3 bg-gradient-to-b from-transparent via-gray-400 dark:via-gray-600 to-transparent animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-0 left-[85%] w-0.5 h-4/5 bg-gradient-to-b from-gray-500 dark:from-gray-500 to-transparent opacity-50 animate-bounce"
          style={{ animationDuration: "3.5s" }}
        ></div>

        <div className="absolute top-[15%] left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent animate-pulse"></div>
        <div
          className="absolute top-[30%] left-0 w-3/4 h-0.5 bg-gradient-to-r from-gray-400 dark:from-gray-600 to-transparent opacity-60 animate-bounce"
          style={{ animationDuration: "2.5s" }}
        ></div>
        <div
          className="absolute top-[45%] right-0 w-2/3 h-px bg-gradient-to-l from-gray-500 dark:from-gray-500 to-transparent opacity-40 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-[60%] left-0 w-5/6 h-0.5 bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent opacity-50 animate-bounce"
          style={{ animationDuration: "3.2s", animationDelay: "0.8s" }}
        ></div>
        <div
          className="absolute top-[75%] right-0 w-1/2 h-px bg-gradient-to-l from-gray-400 dark:from-gray-600 to-transparent animate-pulse"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute top-[90%] left-0 w-4/5 h-0.5 bg-gradient-to-r from-gray-500 dark:from-gray-500 to-transparent opacity-30 animate-bounce"
          style={{ animationDuration: "4.5s" }}
        ></div>

        <div
          className="absolute top-[20%] left-[20%] w-32 h-px bg-gray-400 dark:bg-gray-600 opacity-40 rotate-45 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-[50%] right-[30%] w-24 h-0.5 bg-gray-300 dark:bg-gray-700 opacity-60 -rotate-45 animate-bounce"
          style={{ animationDuration: "2.8s" }}
        ></div>
        <div
          className="absolute top-[70%] left-[60%] w-20 h-px bg-gray-500 dark:bg-gray-500 opacity-50 rotate-12 animate-pulse"
          style={{ animationDelay: "1.2s" }}
        ></div>
      </div>

      <main className="relative px-4 md:px-8 z-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-white/10 dark:bg-black/20 md:backdrop-blur-[1px]"></div>

        <div className="hidden -rotate-90 lg:flex flex-row gap-3 items-center justify-center fixed left-0 h-full z-20 py-40 w-8">
          {([
            { id: "contact", active: "text-violet-500 dark:text-violet-400 decoration-violet-500 dark:decoration-violet-400" },
            { id: "twitter", active: "text-sky-500 dark:text-sky-400 decoration-sky-500 dark:decoration-sky-400" },
            { id: "github", active: "text-emerald-500 dark:text-emerald-400 decoration-emerald-500 dark:decoration-emerald-400" },
            { id: "projects", active: "text-indigo-500 dark:text-indigo-400 decoration-indigo-500 dark:decoration-indigo-400" },
            { id: "publications", active: "text-amber-500 dark:text-amber-400 decoration-amber-500 dark:decoration-amber-400" },
            { id: "work", active: "text-sky-500 dark:text-sky-400 decoration-sky-500 dark:decoration-sky-400" },
            { id: "home", active: "text-black dark:text-white decoration-black dark:decoration-white" },
          ] as const).map(({ id, active }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`block origin-center text-sm tracking-[0.3em] font-bold transition-all duration-300 whitespace-nowrap hover:scale-105 ${
                activeSection === id
                  ? `${active} underline decoration-2 underline-offset-4`
                  : "text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-gray-200"
              }`}
              style={{ fontFamily: "monospace" }}
            >
              {id.toUpperCase()}
            </button>
          ))}
        </div>

        <nav className="sticky top-0 z-50 w-full border-b border-black/[0.06] dark:border-white/[0.06] bg-white/80 dark:bg-[#0b0b0b]/80 md:backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
            <a href="/" className="text-sm font-black font-mono tracking-tight text-gray-900 dark:text-white">
              KJ
            </a>
            <div className="flex items-center gap-1">
              {[
                { href: "/writeups", label: "Writeups", dot: "bg-indigo-500" },
                { href: "/notes", label: "Notes", dot: "bg-emerald-500" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono font-bold tracking-[0.05em] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${item.dot} opacity-60 group-hover:opacity-100 transition-opacity`} />
                  {item.label}
                </a>
              ))}
              <div className="w-px h-4 bg-black/[0.08] dark:bg-white/[0.08] mx-1" />
              <a
                href="/resume.pdf"
                download
                onClick={() => (window as any).gtag?.("event", "resume_download")}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-mono text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200"
              >
                <Download className="h-4 w-4" />
              </a>
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </nav>

        <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center -mr-24 z-20">
          <div
            className="text-sm text-gray-700 dark:text-gray-400 tracking-[0.3em] font-bold whitespace-nowrap transition-all duration-300 hover:text-black dark:hover:text-gray-200"
            style={{ transform: "translateY(5px)", fontFamily: "monospace" }}
          >
            FULL STACK DEVELOPER
          </div>
        </div>

        <HomeSection
          scrollToSection={scrollToSection}
          scrollToJob={scrollToJob}
          scrollToTweet={scrollToTweet}
          handleSkillClick={handleSkillClick}
          renderBioWithLinks={renderBioWithLinks}
        />

        <WorkSection
          highlightSectionId={highlightSectionId}
          highlightSkill={highlightSkill}
          highlightJobIndex={highlightJobIndex}
          onSkillClick={handleSkillClick}
        />

        <PublicationsSection />

        <GithubDataProvider>
          <ProjectsSection highlightSectionId={highlightSectionId} />
          <GithubSection />
        </GithubDataProvider>

        <TwitterSection
          highlightSectionId={highlightSectionId}
          highlightTweetIndex={highlightTweetIndex}
          isDarkMode={isDarkMode}
        />

        <ContactSection />
      </main>
    </div>
  );
}
