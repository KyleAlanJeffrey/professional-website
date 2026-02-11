"use client";

import { GithubRepoType } from "@/components/project";
import { getAllCommits, getAllRepos, getLanguageStats } from "@/app/api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type GithubDataContextValue = {
  githubRepos: GithubRepoType[];
  commits: any[];
  languageStats: { language: string; percent: number }[];
  languageColors: Record<string, string>;
};

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

const GithubDataContext = createContext<GithubDataContextValue | null>(null);

export default function GithubDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [githubRepos, setGithubRepos] = useState<GithubRepoType[]>([]);
  const [commits, setCommits] = useState<any[]>([]);
  const [languageStats, setLanguageStats] = useState<
    { language: string; percent: number }[]
  >([]);

  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_GITHUB_API_TOKEN;
    if (!accessToken) {
      console.log("Token not grabbed");
    }

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

  const value = useMemo(
    () => ({
      githubRepos,
      commits,
      languageStats,
      languageColors,
    }),
    [githubRepos, commits, languageStats],
  );

  return (
    <GithubDataContext.Provider value={value}>
      {children}
    </GithubDataContext.Provider>
  );
}

export function useGithubData() {
  const context = useContext(GithubDataContext);
  if (!context) {
    throw new Error("useGithubData must be used within GithubDataProvider");
  }
  return context;
}
