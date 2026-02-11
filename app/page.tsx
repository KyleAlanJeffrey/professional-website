"use client";

import PageContent from "@/components/sections/page-content";
import jobsData from "@/data/jobs.json";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const jobs = jobsData.jobs ?? [];
  const [highlightSkill, setHighlightSkill] = useState<string | null>(null);
  const [highlightSectionId, setHighlightSectionId] = useState<string | null>(
    null,
  );
  const [highlightJobIndex, setHighlightJobIndex] = useState<number | null>(
    null,
  );
  const [highlightTweetIndex, setHighlightTweetIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const sectionIds = [
      "home",
      "work",
      "publications",
      "projects",
      "github",
      "twitter",
      "contact",
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    let ticking = false;

    const updateActiveSection = () => {
      const markerY = window.scrollY + window.innerHeight * 0.28;
      let nextActive = sections[0].id;

      for (const section of sections) {
        if (markerY >= section.offsetTop - 1) {
          nextActive = section.id;
          continue;
        }
        break;
      }

      const nearPageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (nearPageBottom) {
        nextActive = sections[sections.length - 1].id;
      }

      setActiveSection((current) =>
        current === nextActive ? current : nextActive,
      );
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActiveSection);
    };

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("load", onScrollOrResize);
    const lateRecalc = window.setTimeout(onScrollOrResize, 300);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("load", onScrollOrResize);
      window.clearTimeout(lateRecalc);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSkillClick = (skill: string) => {
    setHighlightSkill(skill);
    setHighlightJobIndex(null);
    setHighlightTweetIndex(null);

    const targetIndex = jobs.findIndex(
      (job: { skills?: string[] }) =>
        Array.isArray(job.skills) &&
        job.skills.some(
          (item) => String(item).toLowerCase() === skill.toLowerCase(),
        ),
    );

    if (targetIndex >= 0) {
      const target = document.getElementById(`job-${targetIndex}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const scrollToPublicationByName = (name: string) => {
    window.dispatchEvent(
      new CustomEvent("portfolio:select-publication", {
        detail: { name },
      }),
    );
    scrollToSection("publications");
  };

  const renderBioWithLinks = (text: string) => {
    const parts = text.split(/(\(see[^)]+\))/i);
    return parts.map((part, index) => {
      const trimmed = part.trim();
      const isLink =
        trimmed.startsWith("(") &&
        trimmed.endsWith(")") &&
        /^(\(see[^)]+\))$/i.test(trimmed);

      if (!isLink) {
        return <span key={`bio-${index}`}>{part}</span>;
      }

      const label = trimmed.slice(1, -1);
      const target = label.replace(/^see\s+/i, "").toLowerCase();

      const onClick = () => {
        if (target.includes("projects below")) {
          scrollToSection("projects");
          return;
        }
        if (target.includes("project saycan")) {
          scrollToPublicationByName("Project SayCan");
          return;
        }
        if (target.includes("project starling")) {
          scrollToPublicationByName("Project Starling");
          return;
        }
        if (target.includes("project music mode")) {
          scrollToPublicationByName("Project Music Mode");
          return;
        }
      };

      return (
        <button
          key={`bio-link-${index}`}
          type="button"
          onClick={onClick}
          data-keep-highlight="true"
          className="inline-flex items-center text-amber-700 dark:text-amber-300 font-bold tracking-[0.03em] underline underline-offset-4 decoration-2 hover:text-black dark:hover:text-white transition-colors duration-300"
        >
          {trimmed}
        </button>
      );
    });
  };

  const scrollToJob = (index: number) => {
    setHighlightSectionId(null);
    setHighlightJobIndex(index);
    setHighlightTweetIndex(null);
    const target = document.getElementById(`job-${index}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      scrollToSection("work");
    }
  };

  const scrollToTweet = (index: number) => {
    setHighlightSectionId(null);
    setHighlightTweetIndex(index);
    setHighlightJobIndex(null);
    const target = document.getElementById(`tweet-${index}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      scrollToSection("twitter");
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-keep-highlight='true']")) return;
      if (highlightSkill) setHighlightSkill(null);
      if (highlightJobIndex !== null) setHighlightJobIndex(null);
      if (highlightTweetIndex !== null) setHighlightTweetIndex(null);
      if (highlightSectionId) setHighlightSectionId(null);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [
    highlightSkill,
    highlightSectionId,
    highlightJobIndex,
    highlightTweetIndex,
  ]);

  return (
    <PageContent
      activeSection={activeSection}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      scrollToSection={scrollToSection}
      scrollToJob={scrollToJob}
      scrollToTweet={scrollToTweet}
      handleSkillClick={handleSkillClick}
      renderBioWithLinks={renderBioWithLinks}
      highlightSkill={highlightSkill}
      highlightJobIndex={highlightJobIndex}
      highlightSectionId={highlightSectionId}
      highlightTweetIndex={highlightTweetIndex}
    />
  );
}
