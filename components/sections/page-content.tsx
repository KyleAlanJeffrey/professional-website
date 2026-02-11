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
import { Moon, Sun } from "lucide-react";
import { ReactNode } from "react";

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

export default function PageContent(props: PageContentProps) {
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

  return (
    <div
      className="min-h-screen bg-[#f6f2ea] dark:bg-[#0b0c0f] transition-colors duration-300 relative pb-16 overflow-x-clip"
      style={{
        backgroundImage:
          "radial-gradient(1100px circle at 12% -12%, rgba(245,158,11,0.06), transparent 58%), radial-gradient(900px circle at 82% -4%, rgba(249,115,22,0.05), transparent 54%), radial-gradient(950px circle at 54% 8%, rgba(56,189,248,0.04), transparent 62%), radial-gradient(820px circle at 24% 28%, rgba(249,115,22,0.04), transparent 62%), radial-gradient(880px circle at 76% 36%, rgba(14,165,233,0.035), transparent 60%)",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <main className="relative px-4 md:px-8 z-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-white/25 dark:bg-black/20 backdrop-blur-[1px]"></div>

        <div className="hidden -rotate-90 lg:flex flex-row gap-3 items-center justify-center fixed left-0 h-full z-20 py-40 w-8">
          {[
            "contact",
            "twitter",
            "github",
            "projects",
            "publications",
            "work",
            "home",
          ].map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`block origin-center text-sm tracking-[0.3em] font-bold transition-all duration-300 whitespace-nowrap hover:scale-105 ${
                activeSection === id
                  ? "text-black dark:text-white underline decoration-2 underline-offset-4"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              style={{ fontFamily: "monospace" }}
            >
              {id.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center -mr-24 z-20">
          <div
            className="text-sm text-gray-500 dark:text-gray-400 tracking-[0.3em] font-bold whitespace-nowrap transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-200"
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
