"use client";

import Navbar from "@/components/navbar";
import { useInView } from "@/hooks/use-in-view";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Writeup = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  color: string;
  gradient: string;
};

const WRITEUPS: Writeup[] = [
  {
    slug: "senior-thesis",
    title: "Walker: A Simple Millipede Bot",
    description:
      "Bio-inspired robotics thesis exploring millipede and centipede locomotion to develop a cost-effective, 3D-printed cam leg mechanism for terrain traversal. Includes kinematic modeling, Simscape simulation, and hardware validation.",
    tags: ["Bio-Inspired Robotics", "Cam Mechanisms", "Gait Kinematics", "MATLAB"],
    date: "2021",
    color: "text-indigo-500 dark:text-indigo-400",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    slug: "ahrs",
    title: "Attitude Estimation Using Complementary Feedback Filter",
    description:
      "Investigating cheap sensor fusion (gyroscope, accelerometer, magnetometer) to build an Attitude Heading Reference System. Covers DCM rotation matrices, forward integration drift, Rodrigues rotation, and closed-loop complementary filtering.",
    tags: ["Sensor Fusion", "AHRS", "DCM", "IMU", "Complementary Filter"],
    date: "2021",
    color: "text-sky-500 dark:text-sky-400",
    gradient: "from-sky-500 to-emerald-500",
  },
];

function WriteupCard({ writeup, index }: { writeup: Writeup; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <Link
      href={`/writeups/${writeup.slug}`}
      ref={ref as React.RefObject<HTMLAnchorElement>}
      className={`group block rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-1 overflow-hidden relative ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: inView ? `${index * 100}ms` : "0ms" }}
    >
      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${writeup.gradient}`}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`text-xs ${writeup.color} tracking-[0.3em] font-bold font-mono`}
            >
              {writeup.date}
            </span>
            <div className={`h-0.5 w-8 bg-gradient-to-r ${writeup.gradient}`} />
          </div>

          <h2 className="text-2xl md:text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {writeup.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
            {writeup.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {writeup.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono font-bold tracking-wider rounded-full border border-black/10 dark:border-white/10 text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-300 mt-2 shrink-0" />
      </div>
    </Link>
  );
}

export default function WriteupsPage() {
  const [mounted, setMounted] = useState(false);

  useState(() => {
    setMounted(true);
  });

  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0b0b] relative overflow-hidden">
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute top-20 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-indigo-200/30 via-sky-200/10 to-transparent blur-3xl dark:from-indigo-500/10 dark:via-sky-500/5" />
        <div className="absolute top-1/3 -right-48 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-amber-200/20 via-indigo-200/10 to-transparent blur-3xl dark:from-amber-500/5 dark:via-indigo-500/5" />
      </div>

      <Navbar />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header
          className={`mb-12 md:mb-16 transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs text-indigo-500 dark:text-indigo-400 tracking-[0.3em] font-bold font-mono">
              ARCHIVE
            </span>
            <div className="h-0.5 w-12 bg-indigo-500 dark:bg-indigo-400" />
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-4"
            style={{ fontFamily: "monospace" }}
          >
            Writeups
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl">
            Deep dives into projects, research, and things I&apos;ve built.
          </p>
        </header>

        {/* Writeup list */}
        <div className="space-y-6">
          {WRITEUPS.map((writeup, index) => (
            <WriteupCard key={writeup.slug} writeup={writeup} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
