"use client";

import tweetsData from "@/data/tweets.json";
import SectionShell from "@/components/sections/section-shell";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Tweet = dynamic(() => import("react-tweet").then((mod) => mod.Tweet), {
  ssr: false,
});

type TwitterSectionProps = {
  highlightSectionId: string | null;
  highlightTweetIndex: number | null;
  isDarkMode: boolean;
};

export default function TwitterSection({
  highlightSectionId,
  highlightTweetIndex,
  isDarkMode,
}: TwitterSectionProps) {
  const [shouldRenderTweets, setShouldRenderTweets] = useState(false);
  const tweetIds = Array.isArray(tweetsData)
    ? tweetsData.map((id) => String(id))
    : [];

  useEffect(() => {
    const twitterSection = document.getElementById("twitter");
    if (!twitterSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRenderTweets(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(twitterSection);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionShell
      id="twitter"
      className="mt-14 md:mt-20 max-w-7xl mx-auto transition-all duration-300 rounded-2xl cv-auto relative isolate"
      highlighted={highlightSectionId === "twitter"}
      highlightClassName="ring-2 ring-sky-400/70 bg-slate-100/50 dark:bg-white/5 shadow-[0_16px_40px_rgba(56,189,248,0.2)]"
      decorations={
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-8 left-8 h-44 w-44 rounded-full bg-gradient-to-tr from-sky-200/45 via-blue-200/20 to-transparent blur-3xl animate-pulse [animation-duration:8s] dark:from-sky-400/10 dark:via-blue-400/5"></div>
          <div className="absolute top-14 right-20 h-10 w-10 -rotate-12 rounded-2xl bg-gradient-to-br from-amber-400/55 to-orange-500/55 blur-sm dark:from-amber-300/20 dark:to-orange-300/20"></div>
          <div className="absolute top-10 right-28 h-12 w-12 rotate-45 border border-black/10 dark:border-white/10"></div>
          <div className="absolute bottom-10 right-8 h-24 w-36 border border-black/10 dark:border-white/10 -rotate-6"></div>
          <div className="absolute bottom-24 left-6 h-7 w-24 rotate-6 border border-black/10 dark:border-white/10"></div>
          <div className="absolute bottom-8 left-1/3 h-14 w-14 rounded-full border border-sky-300/40 dark:border-sky-300/20"></div>
          <div className="absolute inset-x-12 top-8 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10"></div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10 md:mb-12">
        <div className="lg:col-span-6 text-left">
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <div className="text-xs text-sky-600 dark:text-sky-400 tracking-[0.3em] font-bold" style={{ fontFamily: "monospace" }}>SOCIAL</div>
            <div className="w-12 h-0.5 bg-sky-500 dark:bg-sky-400"></div>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2 md:mb-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-sky-500 to-gray-900 dark:from-sky-400 dark:to-white bg-clip-text text-transparent transition-all duration-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>TWITTER FEED</h2>
            <span className="text-xs text-sky-600 dark:text-sky-400 font-bold tracking-[0.2em]" style={{ fontFamily: "monospace" }}>AT</span>
            <span className="text-4xl md:text-5xl font-black text-sky-500 dark:text-sky-400 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>06</span>
          </div>
          <div className="w-12 h-0.5 bg-sky-500 dark:bg-sky-400 mb-3"></div>
          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium max-w-xl mx-0">
            Latest thoughts, experiments, and links from my Twitter feed.
          </p>
        </div>
      </div>

      <div className="p-2 md:p-4">
        <div data-theme={isDarkMode ? "dark" : "light"} className="flex justify-start">
          {shouldRenderTweets && tweetIds.length > 0 ? (
            <div className="flex flex-wrap justify-start items-start gap-4 md:gap-5 w-full">
              {tweetIds.map((id, index) => (
                <div
                  key={id}
                  id={`tweet-${index}`}
                  className={`w-full sm:flex-1 sm:basis-[320px] sm:min-w-[280px] sm:max-w-[560px] flex justify-start rounded-2xl transition-all duration-300 ${
                    highlightTweetIndex === index
                      ? "ring-2 ring-sky-400/70 bg-slate-100/50 dark:bg-white/5 shadow-[0_16px_40px_rgba(56,189,248,0.2)]"
                      : ""
                  }`}
                >
                  <Tweet id={id} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-start items-start gap-4 md:gap-5 w-full">
              {tweetIds.map((_, i) => (
                <div
                  key={i}
                  className="w-full sm:flex-1 sm:basis-[320px] sm:min-w-[280px] sm:max-w-[560px] rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 backdrop-blur shadow-[0_14px_30px_rgba(0,0,0,0.12)] animate-pulse"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex-1">
                      <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 mb-1.5"></div>
                      <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3.5 w-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-3.5 w-11/12 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-3.5 w-4/5 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-3.5 w-2/3 bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                  <div className="h-40 w-full rounded-xl bg-gray-300 dark:bg-gray-700 mb-4"></div>
                  <div className="flex gap-8">
                    <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700"></div>
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
