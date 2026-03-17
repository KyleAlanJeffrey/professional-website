"use client";

import { useInView } from "@/hooks/use-in-view";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export default function SeniorThesisPage() {
  const [mounted, setMounted] = useState(false);

  // Trigger entrance animation
  useState(() => {
    setMounted(true);
  });

  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0b0b] relative overflow-hidden">
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
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <span className="text-xs text-indigo-500 dark:text-indigo-400 tracking-[0.3em] font-bold font-mono">
            WRITEUP
          </span>
        </div>
      </nav>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-16 md:mb-24">
          <FadeIn delay={100}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs text-indigo-500 dark:text-indigo-400 tracking-[0.3em] font-bold font-mono">
                SENIOR THESIS
              </span>
              <div className="h-0.5 w-12 bg-indigo-500 dark:bg-indigo-400" />
            </div>
          </FadeIn>

          <FadeIn delay={250}>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6"
              style={{ fontFamily: "monospace" }}
            >
              Your Thesis Title Here
            </h1>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              A brief abstract or hook describing what this thesis is about and why it matters.
            </p>
          </FadeIn>

          <FadeIn delay={500}>
            <div className="flex flex-wrap gap-3 mt-8">
              {["Robotics", "Computer Vision", "Machine Learning"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono font-bold tracking-wider rounded-full border border-indigo-300/40 dark:border-indigo-400/20 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>
        </header>

        {/* --- Sections --- */}

        <FadeIn>
          <section className="mb-16">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              Introduction
            </h2>
            <div className="prose-custom">
              <p>
                Write your introduction here. This section sets up the problem space
                and motivation for the work.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Example: Glass card for key insight / figure */}
        <FadeIn>
          <section className="mb-16">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              Approach
            </h2>
            <div className="prose-custom mb-8">
              <p>
                Describe your approach and methodology here.
              </p>
            </div>

            {/* Glass card — place interactive components, diagrams, etc. here */}
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span className="text-xs font-mono font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                  FIGURE 1
                </span>
              </div>
              <div className="aspect-video rounded-lg bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center">
                <span className="text-sm text-gray-400 dark:text-gray-500 font-mono">
                  Interactive component goes here
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Caption describing the figure or interactive element.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Example: Data / results with a glass card */}
        <FadeIn>
          <section className="mb-16">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              Results
            </h2>
            <div className="prose-custom mb-8">
              <p>
                Present your results and key findings here.
              </p>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Accuracy", value: "94.2%", delta: "+12%" },
                { label: "Inference Time", value: "23ms", delta: "-40%" },
                { label: "Parameters", value: "1.2M", delta: "" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  <span className="text-xs font-mono font-bold tracking-wider text-gray-500 dark:text-gray-400">
                    {metric.label}
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black font-mono text-gray-900 dark:text-white">
                      {metric.value}
                    </span>
                    {metric.delta && (
                      <span className="text-sm font-mono font-bold text-emerald-500">
                        {metric.delta}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="mb-16">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              Conclusion
            </h2>
            <div className="prose-custom">
              <p>
                Summarize your conclusions and future work here.
              </p>
            </div>
          </section>
        </FadeIn>
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
