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
          <div className="mb-4">
            <div className="text-sm text-gray-700 dark:text-gray-300 tracking-[0.3em] font-bold mb-2" style={{ fontFamily: "monospace" }}>SOCIAL</div>
            <div className="w-16 h-1 bg-black dark:bg-white mx-0 relative overflow-hidden"><div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white mb-2 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>TWITTER</h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 tracking-[0.1em]" style={{ fontFamily: "monospace" }}>FEED</h2>
          <div className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-bold tracking-[0.2em]" style={{ fontFamily: "monospace" }}>AT</div>
          <div className="inline-block text-5xl md:text-6xl font-black text-black dark:text-white mb-4 transition-all duration-300 hover:scale-105 origin-left tracking-[0.1em]" style={{ fontFamily: "monospace" }}>06</div>
          <div className="w-16 h-1 bg-black dark:bg-white mx-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-black dark:bg-white transform -translate-x-full transition-transform duration-500 hover:translate-x-0"></div>
          </div>
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium mt-4 max-w-xl mx-0">
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
            <div className="flex flex-wrap justify-start items-start gap-4 md:gap-5 w-full animate-pulse">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="w-full sm:flex-1 sm:basis-[320px] sm:min-w-[280px] sm:max-w-[560px] rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 backdrop-blur shadow-[0_14px_30px_rgba(0,0,0,0.12)]"
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
    </SectionShell>
  );
}
