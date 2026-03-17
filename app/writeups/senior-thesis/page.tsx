"use client";

import { ArrowLeft, Download, Github } from "lucide-react";
import Link from "next/link";
import { useState, useCallback } from "react";

import { ALL_FIGURES } from "./components/figures";
import { FadeIn } from "./components/ui";
import { Lightbox } from "./components/lightbox";

import Abstract from "./chapters/abstract";
import Chapter1 from "./chapters/ch1-introduction";
import Chapter2 from "./chapters/ch2-kinematic-model";
import Chapter3 from "./chapters/ch3-design";
import Chapter4 from "./chapters/ch4-simulation";
import Chapter5 from "./chapters/ch5-final-model";
import References from "./chapters/references";

const TOC_ITEMS = [
  { id: "abstract", label: "Abstract" },
  { id: "ch1", label: "1. Introduction" },
  { id: "ch1-problem", label: "1.1 Problem Statement" },
  { id: "ch1-existing", label: "1.2 Existing Work" },
  { id: "ch1-characteristics", label: "1.3 Characteristics" },
  { id: "ch2", label: "2. Kinematic Model" },
  { id: "ch3", label: "3. Design" },
  { id: "ch3-geared-bar", label: "3.1 Geared Bar" },
  { id: "ch3-cam", label: "3.2 Cam Designs" },
  { id: "ch4", label: "4. Simulation" },
  { id: "ch4-results", label: "4.3 Results" },
  { id: "ch5", label: "5. Final Model" },
  { id: "ch5-testing", label: "5.2 Testing" },
  { id: "ch5-conclusion", label: "5.3 Conclusion" },
  { id: "references", label: "References" },
];

export default function SeniorThesisPage() {
  const [mounted, setMounted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [tocOpen, setTocOpen] = useState(false);

  useState(() => {
    setMounted(true);
  });

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % ALL_FIGURES.length : null));
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + ALL_FIGURES.length) % ALL_FIGURES.length : null));
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0b0b] relative overflow-hidden">
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={ALL_FIGURES}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}

      {/* Background decorations */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-20 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-indigo-200/30 via-sky-200/10 to-transparent blur-3xl dark:from-indigo-500/10 dark:via-sky-500/5" />
        <div className="absolute top-1/3 -right-48 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-amber-200/20 via-indigo-200/10 to-transparent blur-3xl dark:from-amber-500/5 dark:via-indigo-500/5" />
        <div className="absolute bottom-20 left-1/4 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-200/20 to-transparent blur-3xl dark:from-emerald-500/5" />
      </div>

      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 border-b border-black/5 dark:border-white/5 bg-white/80 dark:bg-[#0b0b0b]/80 md:backdrop-blur-xl transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/writeups"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            All Writeups
          </Link>
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="text-xs text-indigo-500 dark:text-indigo-400 tracking-[0.3em] font-bold font-mono hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            CONTENTS
          </button>
        </div>

        {/* Table of Contents dropdown */}
        {tocOpen && (
          <div className="absolute right-4 top-full mt-1 w-64 rounded-xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#1a1a1a]/95 md:backdrop-blur-xl shadow-2xl p-4 z-50">
            <span className="text-xs font-mono font-bold tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 block">
              TABLE OF CONTENTS
            </span>
            <nav className="space-y-1">
              {TOC_ITEMS.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setTocOpen(false)}
                  className="flex items-center gap-3 px-2 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 transition-colors"
                >
                  <span className="text-xs font-mono text-gray-400 dark:text-gray-500 w-4 text-right">
                    {i + 1}
                  </span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </nav>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-16 md:mb-24">
          <FadeIn delay={100}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs text-indigo-500 dark:text-indigo-400 tracking-[0.3em] font-bold font-mono">
                UC SANTA CRUZ &middot; SPRING 2021
              </span>
              <div className="h-0.5 w-12 bg-indigo-500 dark:bg-indigo-400" />
            </div>
          </FadeIn>

          <FadeIn delay={250}>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6"
              style={{ fontFamily: "monospace" }}
            >
              Walker: A Simple Millipede Bot
            </h1>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mb-4">
              Using biological inspiration from millipedes and centipedes, this thesis develops
              a cost-effective and easily reproducible robot design for traversal through diverse terrain.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              B.S. Robotics Engineering &middot; Supervised by Prof. Steve McGuire &middot; Dept. of Electrical and Computer Engineering
            </p>
          </FadeIn>

          <FadeIn delay={500}>
            <div className="flex flex-wrap gap-3 mt-8">
              {["Bio-Inspired Robotics", "Cam Mechanisms", "Gait Kinematics", "3D Printing", "MATLAB Simscape"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono font-bold tracking-wider rounded-full border border-indigo-300/40 dark:border-indigo-400/20 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={600}>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="https://github.com/KyleAlanJeffrey/Senior-Robotics-Thesis-Walker/tree/main"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-mono font-bold tracking-wider hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                VIEW SOURCE
              </a>
              <a
                href="/writeups/senior-thesis/Jeffrey_Kyle_Robotics_Thesis.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/20 dark:border-white/20 text-gray-700 dark:text-gray-300 text-sm font-mono font-bold tracking-wider hover:-translate-y-0.5 hover:shadow-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                DOWNLOAD PDF
              </a>
            </div>
          </FadeIn>
        </header>

        {/* Table of Contents */}
        <FadeIn delay={700}>
          <nav className="mb-16 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                TABLE OF CONTENTS
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
              {TOC_ITEMS.map((item) => {
                const isChapter = item.label.match(/^\d\./);
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block py-1.5 text-sm transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                      isChapter
                        ? "font-bold font-mono text-gray-900 dark:text-white"
                        : "pl-4 text-gray-500 dark:text-gray-400 border-l-2 border-black/5 dark:border-white/5 hover:border-indigo-400"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </nav>
        </FadeIn>

        {/* Chapters */}
        <Abstract />
        <Chapter1 openLightbox={openLightbox} />
        <Chapter2 openLightbox={openLightbox} />
        <Chapter3 openLightbox={openLightbox} />
        <Chapter4 openLightbox={openLightbox} />
        <Chapter5 openLightbox={openLightbox} />
        <References />
      </article>

      {/* Custom prose styles */}
      <style jsx global>{`
        .prose-custom p {
          color: rgb(75 85 99);
          line-height: 1.8;
          margin-bottom: 1.25rem;
          font-size: 1.0625rem;
        }
        .dark .prose-custom p {
          color: rgb(209 213 219);
        }
        .prose-custom a {
          color: rgb(99 102 241);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .dark .prose-custom a {
          color: rgb(129 140 248);
        }
        .prose-custom strong {
          color: rgb(17 24 39);
          font-weight: 700;
        }
        .dark .prose-custom strong {
          color: white;
        }
        .prose-custom ul,
        .prose-custom ol {
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .prose-custom li {
          color: rgb(75 85 99);
          line-height: 1.8;
          margin-bottom: 0.5rem;
        }
        .dark .prose-custom li {
          color: rgb(209 213 219);
        }
        .prose-custom code {
          font-family: monospace;
          font-size: 0.875rem;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          background: rgb(243 244 246);
          color: rgb(99 102 241);
        }
        .dark .prose-custom code {
          background: rgba(255 255 255 / 0.1);
          color: rgb(165 180 252);
        }
      `}</style>
    </main>
  );
}
