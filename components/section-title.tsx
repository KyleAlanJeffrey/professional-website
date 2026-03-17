"use client";

import { useInView } from "@/hooks/use-in-view";
import { Check, Link } from "lucide-react";
import { useState } from "react";

type SectionTitleProps = {
  category: string;
  title: string;
  number: string;
  color: "sky" | "emerald" | "indigo" | "amber" | "violet";
  sectionId?: string;
};

const colorMap = {
  sky: {
    text: "text-sky-600 dark:text-sky-400",
    line: "bg-sky-500 dark:bg-sky-400",
    gradient: "from-sky-500 to-gray-900 dark:from-sky-400 dark:to-white",
    gradientHover: "group-hover/title:from-gray-900 group-hover/title:to-sky-500 dark:group-hover/title:from-white dark:group-hover/title:to-sky-400",
    number: "text-sky-500 dark:text-sky-400",
    copyHover: "hover:text-sky-500 dark:hover:text-sky-400",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    line: "bg-emerald-500 dark:bg-emerald-400",
    gradient: "from-emerald-500 to-gray-900 dark:from-emerald-400 dark:to-white",
    gradientHover: "group-hover/title:from-gray-900 group-hover/title:to-emerald-500 dark:group-hover/title:from-white dark:group-hover/title:to-emerald-400",
    number: "text-emerald-500 dark:text-emerald-400",
    copyHover: "hover:text-emerald-500 dark:hover:text-emerald-400",
  },
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    line: "bg-indigo-500 dark:bg-indigo-400",
    gradient: "from-indigo-500 to-gray-900 dark:from-indigo-400 dark:to-white",
    gradientHover: "group-hover/title:from-gray-900 group-hover/title:to-indigo-500 dark:group-hover/title:from-white dark:group-hover/title:to-indigo-400",
    number: "text-indigo-500 dark:text-indigo-400",
    copyHover: "hover:text-indigo-500 dark:hover:text-indigo-400",
  },
  amber: {
    text: "text-amber-600 dark:text-amber-400",
    line: "bg-amber-500 dark:bg-amber-400",
    gradient: "from-amber-500 to-gray-900 dark:from-amber-400 dark:to-white",
    gradientHover: "group-hover/title:from-gray-900 group-hover/title:to-amber-500 dark:group-hover/title:from-white dark:group-hover/title:to-amber-400",
    number: "text-amber-500 dark:text-amber-400",
    copyHover: "hover:text-amber-500 dark:hover:text-amber-400",
  },
  violet: {
    text: "text-violet-600 dark:text-violet-400",
    line: "bg-violet-500 dark:bg-violet-400",
    gradient: "from-violet-500 to-gray-900 dark:from-violet-400 dark:to-white",
    gradientHover: "group-hover/title:from-gray-900 group-hover/title:to-violet-500 dark:group-hover/title:from-white dark:group-hover/title:to-violet-400",
    number: "text-violet-500 dark:text-violet-400",
    copyHover: "hover:text-violet-500 dark:hover:text-violet-400",
  },
};

export default function SectionTitle({ category, title, number, color, sectionId }: SectionTitleProps) {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const [copied, setCopied] = useState(false);
  const c = colorMap[color];

  const base = "transition-all ease-out";

  const handleCopy = () => {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="group/title cursor-default">
      {/* Category label + line */}
      <div className="flex items-center gap-3 mb-2 md:mb-3 overflow-hidden">
        <div
          className={`text-xs ${c.text} tracking-[0.3em] font-bold ${base} duration-500 group-hover/title:tracking-[0.4em] ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
          style={{ fontFamily: "monospace", transitionDelay: inView ? "0ms" : "0ms" }}
        >
          {category}
        </div>
        <div
          className={`h-0.5 ${c.line} ${base} duration-700 group-hover/title:w-24 ${
            inView ? "w-12 opacity-100" : "w-0 opacity-0"
          }`}
          style={{ transitionDelay: inView ? "150ms" : "0ms" }}
        ></div>
        {sectionId && (
          <button
            onClick={handleCopy}
            aria-label="Copy section link"
            className={`opacity-60 group-hover/title:opacity-100 transition-all duration-300 p-1.5 rounded-lg ${c.text} hover:bg-black/5 dark:hover:bg-white/10`}
          >
            {copied
              ? <Check className="w-4 h-4 text-emerald-500" />
              : <Link className="w-4 h-4" />
            }
          </button>
        )}
      </div>

      {/* Title + AT + number */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2 md:mb-3">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r ${c.gradient} bg-clip-text text-transparent ${base} duration-700 tracking-[0.1em] ${c.gradientHover} ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "monospace", transitionDelay: inView ? "200ms" : "0ms" }}
        >
          {title}
        </h2>
        <span
          className={`text-xs ${c.text} font-bold tracking-[0.2em] ${base} duration-500 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
          style={{ fontFamily: "monospace", transitionDelay: inView ? "400ms" : "0ms" }}
        >
          AT
        </span>
        <span
          className={`text-4xl md:text-5xl font-black ${c.number} tracking-[0.1em] ${base} duration-500 group-hover/title:scale-110 ${
            inView ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{ fontFamily: "monospace", transitionDelay: inView ? "500ms" : "0ms" }}
        >
          {number}
        </span>
      </div>

      {/* Bottom divider */}
      <div
        className={`h-0.5 ${c.line} ${base} duration-700 group-hover/title:w-24 ${
          inView ? "w-12 opacity-100" : "w-0 opacity-0"
        }`}
        style={{ transitionDelay: inView ? "600ms" : "0ms" }}
      ></div>
    </div>
  );
}
