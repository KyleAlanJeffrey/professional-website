"use client";

import Commit from "@/components/commit";
import Job from "@/components/job";
import Project, { GithubRepoType } from "@/components/project";
import { Button } from "@/components/ui/button";
import bio from "@/data/bio.json";
import jobsData from "@/data/jobs.json";
import tweetsData from "@/data/tweets.json";
import workProjectsData from "@/data/work_projects.json";
import { Github, Linkedin, Mail, MapPin, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Tweet } from "react-tweet";
import { getAllCommits, getAllRepos, getLanguageStats } from "./api";

import Image from "next/image";
export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [githubRepos, setGithubRepos] = useState<GithubRepoType[]>([]);
  const workProjects = workProjectsData.projects ?? [];
  const jobs = jobsData.jobs ?? [];
  const [commits, setCommits] = useState<any[]>([]);
  const [languageStats, setLanguageStats] = useState<
    { language: string; percent: number }[]
  >([]);
  const [highlightSkill, setHighlightSkill] = useState<string | null>(null);
  const [highlightSectionId, setHighlightSectionId] = useState<string | null>(
    null,
  );
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSent, setContactSent] = useState(false);

  const tweetIds = Array.isArray(tweetsData)
    ? tweetsData.map((id) => String(id))
    : [];
  const languageColors: Record<string, string> = {
    typescript: "#3178c6",
    javascript: "#f1e05a",
    python: "#3572A5",
    html: "#e34c26",
    css: "#563d7c",
    shell: "#89e051",
    go: "#00ADD8",
    rust: "#dea584",
    java: "#b07219",
    "c++": "#f34b7d",
    "c#": "#178600",
    kotlin: "#A97BFF",
    swift: "#F05138",
    php: "#4F5D95",
    ruby: "#701516",
    dart: "#00B4AB",
  };

  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_GITHUB_API_TOKEN;
    if (!accessToken) {
      console.log("Token not grabbed");
    }
    // Get pinned repositories
    getAllRepos().then((data) => {
      const allRepos = data.map((repo) => {
        const topics = Array.isArray(repo.topics) ? [...repo.topics] : [];
        const isPinned = topics.includes("pinned");
        const cleanedTopics = topics.filter((topic) => topic !== "pinned");
        return {
          pinned: isPinned,
          name: repo.name,
          homepage: repo.homepage ?? "",
          topics: cleanedTopics,
          description: repo.description ?? "",
        };
      });
      setGithubRepos(allRepos);
    });

    getAllCommits().then((data) => {
      console.log(`Found ${data.length} commits`);
      console.log(data);
      setCommits(data);
    });

    getLanguageStats().then((data) => {
      setLanguageStats(data);
    });
  }, []);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
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
      "projects",
      "github",
      "twitter",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      },
    );

    const sections: HTMLElement[] = [];

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        sections.push(section);
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
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

  const handleFocusClick = (sectionId: string) => {
    setHighlightSectionId(sectionId);
    scrollToSection(sectionId);
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-keep-highlight='true']")) return;
      if (highlightSkill) setHighlightSkill(null);
      if (highlightSectionId) setHighlightSectionId(null);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [highlightSkill, highlightSectionId]);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactError(null);
    setContactSent(false);

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError("Please fill out name, email, and message.");
      return;
    }

    const to = "kyle.alan.jeffrey@gmail.com";
    const subject = contactSubject.trim()
      ? contactSubject.trim()
      : `Website inquiry from ${contactName.trim()}`;

    const bodyLines = [
      `Name: ${contactName.trim()}`,
      `Email: ${contactEmail.trim()}`,
      "",
      contactMessage.trim(),
    ];

    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
    setContactSent(true);
  };

  return (
    <div
      className="min-h-screen bg-[#f6f2ea] dark:bg-[#0b0c0f] transition-colors duration-300 relative pb-16"
      style={{
        backgroundImage:
          "radial-gradient(900px_circle_at_8%_-10%, rgba(255,195,120,0.35), transparent 55%), radial-gradient(700px_circle_at_92%_0%, rgba(120,210,255,0.25), transparent 50%)",
      }}
    >
      {/* Animated Background Lines */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Vertical Lines */}
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

        {/* Horizontal Lines */}
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

        {/* Diagonal Lines */}
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

      {/* Main Content */}
      <main className="relative px-4 md:px-8 z-10">
        {/* Left Sidebar Navigation - Hidden on mobile */}
        <div className="hidden -rotate-90 lg:flex flex-row gap-3 items-center justify-center fixed left-0 h-full z-20 py-40 w-8">
          <button
            onClick={() => scrollToSection("contact")}
            className={`blockorigin-center text-sm tracking-[0.3em] font-bold transition-all duration-300 whitespace-nowrap hover:scale-105 ${
              activeSection === "contact"
                ? "text-black dark:text-white underline decoration-2 underline-offset-4"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
            style={{
              fontFamily: "monospace",
            }}
          >
            CONTACT
          </button>
          <button
            onClick={() => scrollToSection("twitter")}
            className={`block origin-center text-sm tracking-[0.3em] font-bold transition-all duration-300 whitespace-nowrap hover:scale-105 ${
              activeSection === "twitter"
                ? "text-black dark:text-white underline decoration-2 underline-offset-4"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
            style={{
              fontFamily: "monospace",
            }}
          >
            TWITTER
          </button>
          <button
            onClick={() => scrollToSection("github")}
            className={`block  origin-center text-sm tracking-[0.3em] font-bold transition-all duration-300 whitespace-nowrap hover:scale-105 ${
              activeSection === "github"
                ? "text-black dark:text-white underline decoration-2 underline-offset-4"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
            style={{
              fontFamily: "monospace",
            }}
          >
            GITHUB
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className={`blocktext-sm tracking-[0.3em] font-bold transition-all duration-300 whitespace-nowrap hover:scale-105 ${
              activeSection === "projects"
                ? "text-black dark:text-white underline decoration-2 underline-offset-4"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
            style={{
              fontFamily: "monospace",
            }}
          >
            PROJECTS
          </button>
          <button
            onClick={() => scrollToSection("work")}
            className={`block origin-center text-sm tracking-[0.3em] font-bold transition-all duration-300 whitespace-nowrap hover:scale-105 ${
              activeSection === "work"
                ? "text-black dark:text-white underline decoration-2 underline-offset-4"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
            style={{
              fontFamily: "monospace",
            }}
          >
            WORK
          </button>
          <button
            onClick={() => scrollToSection("home")}
            className={`block whitespace-nowrap text-sm tracking-[0.3em] font-bold transition-all duration-300 hover:scale-105 ${
              activeSection === "home"
                ? "text-black dark:text-white underline decoration-2 underline-offset-4"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
            style={{
              fontFamily: "monospace",
            }}
          >
            HOME
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Right Sidebar Text - Hidden on mobile */}
        <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center -mr-24 z-20">
          <div
            className="text-sm text-gray-500 dark:text-gray-400 tracking-[0.3em] font-bold whitespace-nowrap transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-200"
            style={{ transform: "translateY(5px)", fontFamily: "monospace" }}
          >
            FULL STACK DEVELOPER
          </div>
        </div>

        {/* Home Section - Mobile responsive */}
        <section
          id="home"
          className="max-w-7xl mx-auto pt-12 lg:pt-20 pb-20 lg:pb-28 relative"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-amber-200/50 via-orange-200/20 to-sky-200/40 blur-3xl pointer-events-none dark:from-amber-400/10 dark:via-orange-400/5 dark:to-sky-400/10"></div>
          <div className="absolute top-12 right-6 w-40 h-40 border border-black/10 dark:border-white/10 rotate-12 hidden lg:block"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10 min-h-[70vh]">
            {/* Left Content */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2 text-xs md:text-sm font-semibold tracking-[0.2em] text-gray-700 dark:text-gray-300 backdrop-blur mb-6">
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
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white">
                  KYLE
                </span>
                <br />
                <span className="-mt-4 sm:-mt-8 block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-sky-600 dark:from-amber-300 dark:via-orange-300 dark:to-sky-300">
                  JEFFREY
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8">
                Robotics engineer. Agriculture AI Software Engineer. Humanoid
                Robot Obsessed. Web Developer Occasionally.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
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
            </div>

            {/* Center Content - Industrial Elements */}
            <div className="lg:col-span-3 relative">
              <div className="relative mx-auto w-80 md:w-[26rem] lg:w-[34rem] aspect-[3/2]">
                <div className="absolute inset-0 rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-[0_30px_60px_rgba(0,0,0,0.15)]"></div>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400/70 to-orange-500/70 blur-sm"></div>
                <Image
                  src="/me.jpeg"
                  alt="Portrait"
                  className="absolute inset-3 rounded-2xl object-cover"
                  fill
                  sizes="(min-width: 1024px) 26rem, (min-width: 768px) 20rem, 16rem"
                  priority
                />
              </div>
            </div>

            {/* Right Content - Mobile responsive */}
            <div className="lg:col-span-3 text-center lg:text-left lg:sticky lg:top-24 self-start lg:pl-10">
              <div className="mb-8 border border-black/10 dark:border-white/10 rounded-2xl bg-white/70 dark:bg-white/5 p-6 backdrop-blur shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                <div className="text-xs text-gray-500 dark:text-gray-400 tracking-[0.3em] font-semibold mb-3">
                  CURRENT FOCUS
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-[10px] font-bold">
                    i
                  </span>
                  Click an item to jump to the section
                </div>
                <div className="space-y-3 text-left">
                  {[
                    { desc: "Autonomy for Agricultural", section: "work" },
                    { desc: "Robot Fighting", section: "twitter" },
                    { desc: "Mobile and Web Apps", section: "projects" },
                  ].map((item) => (
                    <div
                      key={item.desc}
                      className="group flex items-start gap-3 cursor-pointer rounded-lg px-2 py-2 -mx-2 transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/10 hover:translate-x-1"
                      onClick={() => handleFocusClick(item.section)}
                      data-keep-highlight="true"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-black dark:bg-white transition-transform duration-300 group-hover:scale-125"></span>
                      <p className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-black dark:group-hover:text-white">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Mobile responsive */}
          <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 relative z-10">
            <div className="lg:col-span-1 hidden lg:block self-start">
              <div
                className="text-sm text-gray-500 dark:text-gray-400 tracking-[0.3em] font-bold -rotate-90 origin-center transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300"
                style={{ fontFamily: "monospace" }}
              >
                01
              </div>
            </div>

            <div className="lg:col-span-5 text-center lg:text-left">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium">
                {bio.bio}
              </p>

              <Button
                variant="ghost"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white p-0 h-auto font-bold group transition-all duration-300 tracking-[0.2em] hover:translate-x-1"
                style={{ fontFamily: "monospace" }}
              >
                <span className="relative">
                  — ABOUT PROJECT
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 dark:bg-gray-400 transition-all duration-300 group-hover:w-full group-hover:bg-black dark:group-hover:bg-white"></span>
                </span>
              </Button>
            </div>
            <div className="lg:col-span-6 flex lg:block gap-4 lg:gap-0 justify-center">
              <div className="grid gap-4 w-full max-w-xl">
                <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 backdrop-blur shadow-[0_18px_36px_rgba(0,0,0,0.12)]">
                  <div className="text-xs tracking-[0.3em] text-gray-500 dark:text-gray-400 font-semibold mb-2">
                    SIGNAL
                  </div>
                  <div className="text-3xl font-black text-black dark:text-white tracking-[0.08em]">
                    ROBOTICS
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    software systems and interfaces
                  </div>
                </div>
                <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 backdrop-blur">
                  <div className="text-xs tracking-[0.3em] text-gray-500 dark:text-gray-400 font-semibold mb-3">
                    TOOLBOX
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-[10px] font-bold">
                      i
                    </span>
                    Click a skill to jump to the matching role
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(
                      new Set(
                        jobs
                          .flatMap((job) => job.skills ?? [])
                          .map((skill) => String(skill).trim())
                          .filter(Boolean),
                      ),
                    )
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

        {/* Work Experience Section */}
        <section
          id="work"
          className={`mt-28 max-w-7xl mx-auto transition-all duration-300 rounded-2xl ${
            highlightSectionId === "work"
              ? "ring-2 ring-amber-400/70 bg-amber-50/40 dark:bg-white/5 shadow-[0_16px_40px_rgba(251,191,36,0.2)]"
              : ""
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="mb-4">
                <div
                  className="text-sm text-gray-600 dark:text-gray-400 tracking-[0.3em] font-bold mb-2"
                  style={{ fontFamily: "monospace" }}
                >
                  CAREER
                </div>
                <div className="w-16 h-1 bg-black dark:bg-white mx-auto lg:mx-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
                </div>
              </div>
              <h2
                className="text-4xl md:text-5xl font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                WORK
              </h2>
              <h2
                className="text-4xl md:text-5xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                EXPERIENCE
              </h2>
              <div
                className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-bold tracking-[0.2em]"
                style={{ fontFamily: "monospace" }}
              >
                AT
              </div>
              <div
                className="text-6xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:scale-105 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                02
              </div>
              <div className="w-16 h-1 bg-black dark:bg-white mx-auto lg:mx-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
              </div>
            </div>

            <div className="lg:col-span-6 text-center lg:text-left">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium">
                {/* Here's my journey as a developer, from learning the fundamentals
                to building complex applications and leading teams to create
                amazing digital experiences. */}
              </p>
            </div>
          </div>

          <div className="space-y-16">
            {jobs.length ? (
              jobs.map((job, index) => (
                <div key={index} id={`job-${index}`}>
                  <Job
                    job={job}
                    index={index}
                    highlightSkill={highlightSkill}
                  />
                </div>
              ))
            ) : (
              <div className="space-y-8">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 backdrop-blur shadow-[0_18px_36px_rgba(0,0,0,0.12)] animate-pulse"
                  >
                    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 mb-4"></div>
                    <div className="h-6 w-64 bg-gray-300 dark:bg-gray-700 mb-3"></div>
                    <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 mb-6"></div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-gray-300 dark:bg-gray-700"></div>
                      <div className="h-3 w-11/12 bg-gray-300 dark:bg-gray-700"></div>
                      <div className="h-3 w-10/12 bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`mt-28 max-w-7xl mx-auto transition-all duration-300 rounded-2xl ${
            highlightSectionId === "projects"
              ? "ring-2 ring-amber-400/70 bg-amber-50/40 dark:bg-white/5 shadow-[0_16px_40px_rgba(251,191,36,0.2)]"
              : ""
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            <div className="lg:col-span-5 text-center lg:text-left">
              <div
                className="text-sm text-gray-600 dark:text-gray-400 tracking-[0.3em] font-bold mb-2"
                style={{ fontFamily: "monospace" }}
              >
                PORTFOLIO
              </div>
              <div className="w-16 h-1 bg-black dark:bg-white mx-auto lg:mx-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
              </div>
              <h2
                className="text-4xl md:text-5xl font-black text-black dark:text-white mb-2 mt-6 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                FEATURED
              </h2>
              <h2
                className="text-4xl md:text-5xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                PROJECTS
              </h2>
              <div
                className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-bold tracking-[0.2em]"
                style={{ fontFamily: "monospace" }}
              >
                AT
              </div>
              <div className="w-16 h-1 bg-black dark:bg-white mx-auto lg:mx-0 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
              </div>

              <div
                className="text-6xl font-black text-black dark:text-white mb-6 transition-all duration-300 hover:scale-105 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                03
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium">
                A curated selection of my recent personal projects.
              </p>
            </div>

            <div className="lg:col-span-7">
              {githubRepos.length ? (
                githubRepos.map((repo, index) =>
                  repo.pinned ? (
                    <Project
                      githubRepo={repo}
                      key={`repo-${index}`}
                      index={index}
                    />
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
        </section>

        {/* GitHub Stats Section */}
        <section id="github" className="mt-28 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 text-center lg:text-left">
              <div className="mb-4">
                <div
                  className="text-sm text-gray-600 dark:text-gray-400 tracking-[0.3em] font-bold mb-2"
                  style={{ fontFamily: "monospace" }}
                >
                  DEVELOPMENT
                </div>
                <div className="w-16 h-1 bg-black dark:bg-white mx-auto lg:mx-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
                </div>
              </div>
              <h2
                className="text-4xl md:text-5xl font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                GITHUB
              </h2>
              <h2
                className="text-4xl md:text-5xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                ACTIVITY
              </h2>
              <div
                className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-bold tracking-[0.2em]"
                style={{ fontFamily: "monospace" }}
              >
                AT
              </div>
              <div
                className="text-6xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:scale-105 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                04
              </div>
              <div className="w-16 h-1 bg-black dark:bg-white mx-auto lg:mx-0 mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium">
                Here's a snapshot of my recent coding activity and
                contributions.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 backdrop-blur shadow-[0_16px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)]">
                  <div
                    className="text-3xl font-black text-black dark:text-white mb-1 transition-all duration-300 group-hover:scale-105 tracking-[0.1em]"
                    style={{ fontFamily: "monospace" }}
                  >
                    {commits.length ? commits.length : "NA"}
                  </div>
                  <div
                    className="text-sm text-gray-600 dark:text-gray-400 tracking-[0.2em] font-bold transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200"
                    style={{ fontFamily: "monospace" }}
                  >
                    COMMITS
                  </div>
                  <div
                    className="text-xs text-gray-500 dark:text-gray-500 font-bold tracking-[0.1em]"
                    style={{ fontFamily: "monospace" }}
                  >
                    THIS YEAR
                  </div>
                </div>
                <div className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 backdrop-blur shadow-[0_16px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)]">
                  <div
                    className="text-3xl font-black text-black dark:text-white mb-1 transition-all duration-300 group-hover:scale-105 tracking-[0.1em]"
                    style={{ fontFamily: "monospace" }}
                  >
                    {githubRepos.length ? githubRepos.length : "NA"}
                  </div>
                  <div
                    className="text-sm text-gray-600 dark:text-gray-400 tracking-[0.2em] font-bold transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200"
                    style={{ fontFamily: "monospace" }}
                  >
                    REPOSITORIES
                  </div>
                  <div
                    className="text-xs text-gray-500 dark:text-gray-500 font-bold tracking-[0.1em]"
                    style={{ fontFamily: "monospace" }}
                  >
                    ACTIVE
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="w-full rounded-2xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 p-8 backdrop-blur shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_52px_rgba(0,0,0,0.16)]">
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

                {/* Commit Activity Visualization */}
                <div className="space-y-4 mb-8">
                  {commits.length ? (
                    commits
                      .slice(0, 5)
                      .map((commit, index) => (
                        <Commit key={index} commit={commit} index={index} />
                      ))
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

                {/* Language Stats */}
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
                        const color =
                          languageColors[stat.language.toLowerCase()] ??
                          "#6b7280";
                        return (
                          <div
                            key={stat.language}
                            className="flex items-center gap-4 group"
                          >
                            <div className="flex items-center space-x-3 min-w-[160px]">
                              <div
                                className="w-3 h-3 transition-all duration-300 group-hover:scale-110"
                                style={{ backgroundColor: color }}
                              ></div>
                              <span
                                className="text-sm text-gray-800 dark:text-gray-200 transition-all duration-300 group-hover:text-black dark:group-hover:text-white font-bold tracking-[0.1em]"
                                style={{ fontFamily: "monospace" }}
                              >
                                {stat.language.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1 bg-gray-300 dark:bg-gray-600 h-2 overflow-hidden border border-gray-400 dark:border-gray-500">
                              <div
                                className="h-2 transition-all duration-1000 group-hover:opacity-80"
                                style={{
                                  width: `${stat.percent}%`,
                                  backgroundColor: color,
                                }}
                              ></div>
                            </div>
                            <span
                              className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 font-bold tracking-[0.1em]"
                              style={{ fontFamily: "monospace" }}
                            >
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
        </section>

        {/* Twitter Section */}
        <section
          id="twitter"
          className={`mt-28 max-w-7xl mx-auto transition-all duration-300 rounded-2xl ${
            highlightSectionId === "twitter"
              ? "ring-2 ring-amber-400/70 bg-amber-50/40 dark:bg-white/5 shadow-[0_16px_40px_rgba(251,191,36,0.2)]"
              : ""
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="mb-4">
                <div
                  className="text-sm text-gray-600 dark:text-gray-400 tracking-[0.3em] font-bold mb-2"
                  style={{ fontFamily: "monospace" }}
                >
                  SOCIAL
                </div>
                <div className="w-16 h-1 bg-black dark:bg-white mx-auto lg:mx-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
                </div>
              </div>
              <h2
                className="text-4xl md:text-5xl font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                TWITTER
              </h2>
              <h2
                className="text-4xl md:text-5xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                FEED
              </h2>
              <div
                className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-bold tracking-[0.2em]"
                style={{ fontFamily: "monospace" }}
              >
                AT
              </div>
              <div
                className="text-6xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:scale-105 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                05
              </div>
              <div className="w-16 h-1 bg-black dark:bg-white mx-auto lg:mx-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium mt-6 max-w-xl mx-auto lg:mx-0">
                Latest thoughts, experiments, and links from my Twitter feed.
              </p>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div
              data-theme={isDarkMode ? "dark" : "light"}
              className="flex justify-center"
            >
              {tweetIds.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-4xl mx-auto place-items-center">
                  {tweetIds.map((id) => (
                    <div key={id} className="w-full flex justify-center">
                      <Tweet id={id} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-4xl animate-pulse">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 backdrop-blur shadow-[0_14px_30px_rgba(0,0,0,0.12)]"
                    >
                      <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 mb-3"></div>
                      <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 mb-2"></div>
                      <div className="h-3 w-11/12 bg-gray-300 dark:bg-gray-700 mb-2"></div>
                      <div className="h-3 w-2/3 bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-28 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="mb-4">
                <div
                  className="text-sm text-gray-600 dark:text-gray-400 tracking-[0.3em] font-bold mb-2"
                  style={{ fontFamily: "monospace" }}
                >
                  GET IN TOUCH
                </div>
                <div className="w-16 h-1 bg-black dark:bg-white mx-auto lg:mx-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
                </div>
              </div>
              <h2
                className="text-4xl md:text-5xl font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                LET'S WORK
              </h2>
              <h2
                className="text-4xl md:text-5xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                TOGETHER
              </h2>
              <div
                className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-bold tracking-[0.2em]"
                style={{ fontFamily: "monospace" }}
              >
                AT
              </div>
              <div
                className="text-6xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:scale-105 tracking-[0.1em]"
                style={{ fontFamily: "monospace" }}
              >
                06
              </div>
              <div className="w-16 h-1 bg-black dark:bg-white mx-auto lg:mx-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
              </div>
            </div>

            <div className="lg:col-span-6 text-center lg:text-left">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium">
                {/* I'm always excited to connect with fellow developers and work on
                interesting projects. Drop me a line if you want to collaborate
                or just chat about tech! */}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <div className="space-y-8">
                <div className="flex items-start space-x-4 group cursor-pointer p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-[0_16px_34px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)]">
                  <div className="w-12 h-12 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Mail className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-black text-black dark:text-white mb-1 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 tracking-[0.1em]"
                      style={{ fontFamily: "monospace" }}
                    >
                      EMAIL
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 font-medium">
                      kyle.alan.jeffrey@gmail.com
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      I'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <a
                  href={"https://github.com/KyleAlanJeffrey"}
                  className="flex items-start space-x-4 group cursor-pointer p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-[0_16px_34px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)]"
                >
                  <div className="w-12 h-12 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Github className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-black text-black dark:text-white mb-1 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 tracking-[0.1em]"
                      style={{ fontFamily: "monospace" }}
                    >
                      GITHUB
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 font-medium">
                      @KyleAlanJeffrey
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Check out my latest projects
                    </p>
                  </div>
                </a>

                <a
                  href={"https://www.linkedin.com/in/kyle-jeffrey-1651b5189/"}
                  className="flex items-start space-x-4 group cursor-pointer p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-[0_16px_34px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)]"
                >
                  <div className="w-12 h-12 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Linkedin className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-black text-black dark:text-white mb-1 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 tracking-[0.1em]"
                      style={{ fontFamily: "monospace" }}
                    >
                      LINKEDIN
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 font-medium">
                      Kyle
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Let's connect professionally
                    </p>
                  </div>
                </a>

                <div className="flex items-start space-x-4 group cursor-pointer p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow-[0_16px_34px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.16)]">
                  <div className="w-12 h-12 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <MapPin className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-black text-black dark:text-white mb-1 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 tracking-[0.1em]"
                      style={{ fontFamily: "monospace" }}
                    >
                      LOCATION
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 font-medium">
                      San Francisco, CA
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Open to remote work
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                className="space-y-6 relative p-3"
                onSubmit={handleContactSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                      style={{ fontFamily: "monospace" }}
                    >
                      NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 font-medium"
                      placeholder="Your name"
                      style={{ fontFamily: "monospace" }}
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                      style={{ fontFamily: "monospace" }}
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 font-medium"
                      placeholder="your@email.com"
                      style={{ fontFamily: "monospace" }}
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                    style={{ fontFamily: "monospace" }}
                  >
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 font-medium"
                    placeholder="What's this about?"
                    style={{ fontFamily: "monospace" }}
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]"
                    style={{ fontFamily: "monospace" }}
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent resize-none transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 font-medium"
                    placeholder="Tell me about your project..."
                    style={{ fontFamily: "monospace" }}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                  />
                </div>

                {contactError ? (
                  <div
                    className="border-2 border-red-500 bg-red-50 dark:bg-gray-800 p-3 text-sm font-bold text-red-700 dark:text-red-400 tracking-[0.1em]"
                    style={{ fontFamily: "monospace" }}
                  >
                    {contactError}
                  </div>
                ) : null}

                {contactSent ? (
                  <div
                    className="border-2 border-green-600 bg-green-50 dark:bg-gray-800 p-3 text-sm font-bold text-green-700 dark:text-green-400 tracking-[0.1em]"
                    style={{ fontFamily: "monospace" }}
                  >
                    Opening your email client...
                  </div>
                ) : null}

                <Button
                  className="w-full md:w-auto px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-black tracking-[0.1em] transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-black dark:border-white"
                  style={{ fontFamily: "monospace" }}
                  type="submit"
                >
                  SEND MESSAGE
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
