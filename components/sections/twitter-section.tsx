"use client";

import { CustomTweet } from "@/components/custom-tweet";
import SectionTitle from "@/components/section-title";
import tweetsData from "@/data/tweets.json";
import SectionShell from "@/components/sections/section-shell";
import { useEffect, useState } from "react";

type TwitterSectionProps = {
  highlightSectionId: string | null;
  highlightTweetIndex: number | null;
};

export default function TwitterSection({
  highlightSectionId,
  highlightTweetIndex,
}: TwitterSectionProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const tweetIds = Array.isArray(tweetsData)
    ? tweetsData.map((id) => String(id))
    : [];

  useEffect(() => {
    const el = document.getElementById("twitter");
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionShell
      id="twitter"
      className="mt-14 md:mt-20 max-w-[90rem] mx-auto transition-all duration-300 rounded-2xl relative isolate"
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
          <SectionTitle category="SOCIAL" title="TWITTER FEED" number="06" color="sky" sectionId="twitter" />
          <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed mt-6 font-semibold pl-3 border-l-2 border-sky-400 max-w-xl">
            Latest thoughts, experiments, and links from my Twitter feed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tweetIds.map((id, index) => (
          <div
            key={id}
            id={`tweet-${index}`}
            className={`transition-all duration-300 ${
              highlightTweetIndex === index
                ? "ring-2 ring-sky-400/70 rounded-2xl shadow-[0_16px_40px_rgba(56,189,248,0.2)]"
                : ""
            }`}
          >
            {shouldRender ? <CustomTweet id={id} /> : (
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#161618] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] animate-pulse h-full">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
                  <div className="h-3.5 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="space-y-2 mb-3">
                  <div className="h-3.5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3.5 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3.5 w-3/5 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="aspect-video rounded-xl bg-gray-200 dark:bg-gray-700" />
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
