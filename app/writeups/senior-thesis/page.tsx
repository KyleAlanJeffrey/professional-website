"use client";

import { useInView } from "@/hooks/use-in-view";
import { ArrowLeft, Download, Github, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

const MEDIA = "/writeups/senior-thesis/media";

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

function GlassCard({
  label,
  children,
  caption,
}: {
  label: string;
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400" />
        <span className="text-xs font-mono font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
          {label}
        </span>
      </div>
      {children}
      {caption && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {caption}
        </p>
      )}
    </div>
  );
}

function Figure({
  src,
  alt,
  caption,
  figNum,
  onClick,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  figNum?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <figure className={`group ${className}`}>
      <div
        className="relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 cursor-zoom-in hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors"
        onClick={onClick}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
      {(caption || figNum) && (
        <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
          {figNum && (
            <span className="font-mono font-bold text-indigo-500 dark:text-indigo-400">
              {figNum}:{" "}
            </span>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function FigureGrid({
  children,
  cols = 2,
}: {
  children: React.ReactNode;
  cols?: 2 | 3;
}) {
  return (
    <div className={`grid grid-cols-1 ${cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"} gap-4 my-8`}>
      {children}
    </div>
  );
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: { src: string; alt: string; caption?: string; figNum?: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const img = images[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="max-w-full max-h-[75vh] object-contain rounded-lg"
        />
        {(img.caption || img.figNum) && (
          <p className="mt-4 text-sm text-gray-300 text-center max-w-xl">
            {img.figNum && (
              <span className="font-mono font-bold text-indigo-400">
                {img.figNum}:{" "}
              </span>
            )}
            {img.caption}
          </p>
        )}
        {images.length > 1 && (
          <p className="mt-2 text-xs text-gray-500 font-mono">
            {currentIndex + 1} / {images.length}
          </p>
        )}
      </div>
    </div>
  );
}

// All figures for lightbox navigation
const ALL_FIGURES: { src: string; alt: string; caption?: string; figNum?: string }[] = [
  // CH 1
  { src: `${MEDIA}/ch1-introduction/millipede-vs-centipede-gait.png`, alt: "Millipede vs centipede gait", caption: "Millipede vs centipede gait patterns and metachronal wave illustration", figNum: "Fig 1.1" },
  { src: `${MEDIA}/ch1-introduction/manton-leg-anatomy.png`, alt: "Manton leg structure", caption: "Manton's millipede leg anatomy — single-segment simplification", figNum: "Fig 1.2a" },
  { src: `${MEDIA}/ch1-introduction/manton-leg-anatomy-detail.png`, alt: "Leg anatomy detail", caption: "Detailed leg anatomy showing joint structure", figNum: "Fig 1.2b" },
  { src: `${MEDIA}/ch1-introduction/high-vs-low-gear-gait.png`, alt: "High vs low gear gait", caption: "High gear (fast, low duty cycle) vs low gear (slow, high duty cycle) gait modes", figNum: "Fig 1.3" },
  { src: `${MEDIA}/ch1-introduction/millipede-stroke-cycle.png`, alt: "Millipede stroke pattern", caption: "Millipede leg stroke cycle showing propulsive and transfer phases", figNum: "Fig 1.4" },
  { src: `${MEDIA}/ch1-introduction/duty-cycle-differences.png`, alt: "Duty cycle differences", caption: "Duty cycle differences between millipede and centipede locomotion", figNum: "Fig 1.5" },
  // CH 2
  { src: `${MEDIA}/ch2-kinematics/circle-of-reference.png`, alt: "Circle of reference", caption: "Circle of reference — the leg tip traces a circular arc during transfer phase", figNum: "Fig 2.1" },
  { src: `${MEDIA}/ch2-kinematics/after-effects-tracking.png`, alt: "After Effects tracking", caption: "After Effects motion tracking validating the circular trajectory model", figNum: "Fig 2.2a" },
  { src: `${MEDIA}/ch2-kinematics/trajectory-overlay-validation.png`, alt: "Gait circle validation", caption: "Trajectory overlay confirming the kinematic model", figNum: "Fig 2.2b" },
  { src: `${MEDIA}/ch2-kinematics/leg-trajectory-phases.png`, alt: "Leg trajectory", caption: "Complete leg trajectory showing transfer and propulsive phases", figNum: "Fig 2.3" },
  { src: `${MEDIA}/ch2-kinematics/propulsive-force-diagram.png`, alt: "Force diagram", caption: "Force diagram during propulsive ground contact", figNum: "Fig 2.4" },
  // CH 3
  { src: `${MEDIA}/ch3-design/existing-leg-designs-survey.png`, alt: "Existing leg designs", caption: "Survey of existing leg actuator designs in literature", figNum: "Fig 3.1" },
  { src: `${MEDIA}/ch3-design/gear-kinematics/geared-bar-mechanism.png`, alt: "Geared bar mechanism", caption: "Geared bar mechanism — two-gear, single-motor design similar to a 4-bar linkage", figNum: "Fig 3.2" },
  { src: `${MEDIA}/ch3-design/gear-kinematics/trajectory-deviation-analysis.png`, alt: "Gear trajectory analysis", caption: "Trajectory analysis of the geared bar mechanism showing deviation from desired path", figNum: "Fig 3.3" },
  { src: `${MEDIA}/ch3-design/leg-animations/geared-bar-parts.png`, alt: "Gear mechanism parts", caption: "Parts breakdown of the geared bar mechanism", figNum: "Fig 3.4" },
  { src: `${MEDIA}/ch3-design/leg-animations/sliding-cam-design.png`, alt: "Custom sliding cam", caption: "Custom sliding cam design — translates cam shape down by leg length", figNum: "Fig 3.5" },
  { src: `${MEDIA}/ch3-design/leg-animations/slide_fixed-bearing-cam-parts.png`, alt: "Sliding cam parts", caption: "Parts breakdown of the custom sliding cam", figNum: "Fig 3.6" },
  { src: `${MEDIA}/ch3-design/leg-animations/sliding-cam-motion.png`, alt: "Sliding cam motion", caption: "Motion profile of the custom sliding cam design", figNum: "Fig 3.7" },
  { src: `${MEDIA}/ch3-design/leg-animations/fixed-bearing-cam-parts.png`, alt: "Fixed bearing cam parts", caption: "Wan & Song fixed bearing cam — rotating link with bearings at fixed distance", figNum: "Fig 3.8" },
  { src: `${MEDIA}/ch3-design/wan-song-original-design.png`, alt: "Original Wan & Song design", caption: "Original Wan & Song (2004) cam actuator design", figNum: "Fig 3.9" },
  { src: `${MEDIA}/ch3-design/cam-design/cam-profile-iteration-1.png`, alt: "Cam shape iteration 1", caption: "Cam profile iteration 1 — derived from kinematic equations", figNum: "Fig 3.10" },
  { src: `${MEDIA}/ch3-design/cam-design/cam-profile-iteration-2.png`, alt: "Cam shape iteration 2", caption: "Cam profile iteration 2 — refined angular span", figNum: "Fig 3.11" },
  { src: `${MEDIA}/ch3-design/cam-design/cam-profile-iteration-3.png`, alt: "Cam shape iteration 3", caption: "Cam profile iteration 3 — Makima spline interpolation", figNum: "Fig 3.12" },
  { src: `${MEDIA}/ch3-design/cam-design/final-cam-profile.png`, alt: "Final cam profile", caption: "Final cam profile with smooth Makima spline transitions", figNum: "Fig 3.13" },
  { src: `${MEDIA}/ch3-design/cam-design/cam-shape-with-trajectory.png`, alt: "Cam shape with trajectory", caption: "Cam shape overlaid with resulting foot trajectory", figNum: "Fig 3.14" },
  { src: `${MEDIA}/ch3-design/cam-design/cam-dimensions.png`, alt: "Cam dimensions", caption: "Critical cam dimensions: H = 0.43L, d = 0.4L", figNum: "Fig 3.15" },
  { src: `${MEDIA}/ch3-design/cam-design/cam-specifications.png`, alt: "Cam specifications", caption: "Final cam specifications and tolerances", figNum: "Fig 3.16" },
  { src: `${MEDIA}/ch3-design/cam-design/trajectory-validation.png`, alt: "Cam trajectory validation", caption: "Trajectory validation — cam output vs desired half-circle path", figNum: "Fig 3.17" },
  { src: `${MEDIA}/ch3-design/cam-design/fusion360-model.png`, alt: "Fusion 360 model", caption: "Fusion 360 CAD model of the cam leg mechanism", figNum: "Fig 3.18a" },
  { src: `${MEDIA}/ch3-design/cam-design/fusion360-assembly.png`, alt: "Fusion 360 assembly", caption: "Complete assembly view in Fusion 360", figNum: "Fig 3.18b" },
  { src: `${MEDIA}/ch3-design/cam-design/final-design-render.png`, alt: "Final cam design", caption: "Final design render of the Wan & Song cam actuator", figNum: "Fig 3.19" },
  // CH 4
  { src: `${MEDIA}/ch4-simulation/single-leg-cycloid.png`, alt: "Single cycloid trajectory", caption: "Single leg cycloid trajectory — transfer and propulsive phases", figNum: "Fig 4.1" },
  { src: `${MEDIA}/ch4-simulation/multi-leg-position-analysis.png`, alt: "Multi-leg position analysis", caption: "Multi-leg position analysis showing phase offsets between legs", figNum: "Fig 4.2" },
  { src: `${MEDIA}/ch4-simulation/three-simulation-generations.png`, alt: "Three simulation generations", caption: "Three generations of simulation with increasing fidelity", figNum: "Fig 4.3" },
  { src: `${MEDIA}/ch4-simulation/body-segment-component.jpg`, alt: "Body segment component", caption: "Simscape body segment component — rigid body with mass properties", figNum: "Fig 4.4" },
  { src: `${MEDIA}/ch4-simulation/simscape-full-environment.png`, alt: "Full simulation environment", caption: "Complete Simscape Multibody simulation environment", figNum: "Fig 4.5" },
  { src: `${MEDIA}/ch4-simulation/leg-segment-component.jpg`, alt: "Leg segment component", caption: "Leg segment component with cam-driven joint", figNum: "Fig 4.6" },
  { src: `${MEDIA}/ch4-simulation/simscape-3d-visualization.png`, alt: "Simulation snapshot", caption: "3D visualization of the simulation — millipede body with cam-driven legs", figNum: "Fig 4.7" },
  { src: `${MEDIA}/ch4-simulation/center-of-gravity-results.png`, alt: "Center of gravity results", caption: "Center of gravity vertical displacement across gait configurations", figNum: "Fig 4.8" },
  { src: `${MEDIA}/ch4-simulation/velocity-comparison.png`, alt: "Velocity comparisons", caption: "Forward velocity comparison across leg count and gait configurations", figNum: "Fig 4.9" },
  { src: `${MEDIA}/ch4-simulation/leg-offset-comparison.png`, alt: "Leg offset comparison", caption: "Leg phase offset comparison — ground contact time analysis", figNum: "Fig 4.10" },
  { src: `${MEDIA}/ch4-simulation/6-leg-configuration.png`, alt: "6 leg configuration", caption: "6-leg configuration snapshot from simulation", figNum: "Fig 4.11" },
  { src: `${MEDIA}/ch4-simulation/8-leg-configuration.png`, alt: "8 leg configuration", caption: "8-leg configuration snapshot from simulation", figNum: "Fig 4.12" },
  // CH 5
  { src: `${MEDIA}/ch5-hardware/3d-printed-cam.png`, alt: "3D printed cam", caption: "3D printed cam mechanism — Raised 3D Pro2 at 0.5mm precision", figNum: "Fig 5.1" },
  { src: `${MEDIA}/ch5-hardware/slicer-preview.png`, alt: "Print slice preview", caption: "Slicer preview showing print layers and support structure", figNum: "Fig 5.2" },
  { src: `${MEDIA}/ch5-hardware/rotary-arm-redesign.png`, alt: "Rotary arm redesign", caption: "Rotary arm redesign — improved shaft stability", figNum: "Fig 5.3" },
  { src: `${MEDIA}/ch5-hardware/cam-redesign.png`, alt: "Cam redesign", caption: "Cam profile redesign — smoothed edges to reduce print jerk", figNum: "Fig 5.4" },
  { src: `${MEDIA}/ch5-hardware/test-environment.png`, alt: "Test environment", caption: "Physical test environment setup", figNum: "Fig 5.5a" },
  { src: `${MEDIA}/ch5-hardware/test-environment-detail.png`, alt: "Test environment detail", caption: "Test environment detail — motor mount and cam assembly", figNum: "Fig 5.5b" },
  { src: `${MEDIA}/ch5-hardware/ground-contact-span.png`, alt: "Ground contact span", caption: "60° propulsive ground contact span measurement", figNum: "Fig 5.6a" },
  { src: `${MEDIA}/ch5-hardware/ground-contact-span-detail.png`, alt: "Ground contact span detail", caption: "Ground contact span angular measurement detail", figNum: "Fig 5.6b" },
  { src: `${MEDIA}/ch5-hardware/normalized-ae-tracking.png`, alt: "Normalized AE tracking", caption: "Normalized After Effects tracking data overlaid on ideal trajectory", figNum: "Fig 5.7" },
  { src: `${MEDIA}/ch5-hardware/trajectory-measured-vs-designed.png`, alt: "Trajectory comparison", caption: "Cam trajectory comparison — measured vs designed path", figNum: "Fig 5.8a" },
  { src: `${MEDIA}/ch5-hardware/trajectory-radius-comparison.png`, alt: "Trajectory radius comparison", caption: "Trajectory comparison with radius measurements", figNum: "Fig 5.8b" },
  { src: `${MEDIA}/ch5-hardware/trajectory-error-analysis.png`, alt: "Error analysis", caption: "Trajectory error analysis — maximum deviation of 4.6mm", figNum: "Fig 5.9" },
  { src: `${MEDIA}/ch5-hardware/potentiometer-raw-data.png`, alt: "Raw potentiometer data", caption: "Raw potentiometer angular position data — significant noise", figNum: "Fig 5.10" },
  { src: `${MEDIA}/ch5-hardware/potentiometer-80hz-lpf.png`, alt: "80Hz low-pass filtered", caption: "Potentiometer data with 80Hz low-pass filter applied", figNum: "Fig 5.11" },
  { src: `${MEDIA}/ch5-hardware/potentiometer-15hz-lpf.png`, alt: "15Hz low-pass filtered", caption: "Potentiometer data with 15Hz low-pass filter — still too noisy", figNum: "Fig 5.12" },
  { src: `${MEDIA}/ch5-hardware/imu-linear-position-drift.png`, alt: "IMU data", caption: "IMU linear position data — drift from integration error", figNum: "Fig 5.13" },
  { src: `${MEDIA}/ch5-hardware/sim-vs-experimental-trajectory.png`, alt: "Simulation vs experimental", caption: "Simulation vs experimental trajectory — After Effects validation", figNum: "Fig 5.14" },
  { src: `${MEDIA}/ch5-hardware/assembled-front-view.jpg`, alt: "Physical build photo 1", caption: "Assembled cam leg mechanism — front view", figNum: "Fig 5.15a" },
  { src: `${MEDIA}/ch5-hardware/assembled-side-view.jpg`, alt: "Physical build photo 2", caption: "Assembled cam leg mechanism — side view", figNum: "Fig 5.15b" },
  { src: `${MEDIA}/ch5-hardware/assembled-detail-view.jpg`, alt: "Physical build photo 3", caption: "Assembled cam leg mechanism — detail view", figNum: "Fig 5.15c" },
];

const TOC_ITEMS = [
  { id: "abstract", label: "Abstract" },
  { id: "problem", label: "The Problem" },
  { id: "why-millipedes", label: "Why Millipedes?" },
  { id: "kinematic-model", label: "Kinematic Model" },
  { id: "leg-design", label: "Leg Actuator Design" },
  { id: "simulation", label: "Simulation" },
  { id: "hardware", label: "Hardware & Testing" },
  { id: "conclusion", label: "Conclusion" },
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

  // Helper to get index in ALL_FIGURES by figNum
  const figIndex = (figNum: string) => ALL_FIGURES.findIndex((f) => f.figNum === figNum);

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

        {/* --- Abstract --- */}
        <FadeIn>
          <section id="abstract" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              Abstract
            </h2>
            <div className="prose-custom">
              <p>
                Within the field of robotics, there is a demand for robots capable of atypical terrain
                traversal. Atypical environments like stairs, rocky trails, and off-road locations
                consist of chaotic, non-flat terrain that ordinary wheeled robots struggle to cross.
                Companies like Boston Dynamics have developed humanoid and animal-like robots
                capable of traversing such terrain; however, these robot designs are expensive and
                complicated.
              </p>
              <p>
                Using biological inspiration from millipedes and centipedes, this
                paper develops a cost-effective and easily reproducible design to solve the
                problem of traversal through diverse terrain. The development included research into the biology
                of millipedes and centipedes, a review of existing literature on insect-inspired leg
                actuators, implementation of an existing cam actuator by Wan and Song, and
                development of a simulation environment tested by hardware implementation &mdash; all completed
                at home in novel, affordable ways due to the COVID-19 Pandemic.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* --- Problem Statement --- */}
        <FadeIn>
          <section id="problem" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              The Problem
            </h2>
            <div className="prose-custom">
              <p>
                The need for robots capable of maneuvering uneven terrain grows yearly as simple
                wheel design robots are often limited in their capability to do so. The field of bio-locomotive
                design looks to nature for inspiration, considering animals as robust, dynamic movement
                systems evolved precisely for their habitat.
              </p>
              <p>
                Though previous papers have attempted to recreate omnipede platforms by emulating
                millipede behavior, the resulting robot designs often use <strong>numerous motors for each
                body segment</strong> and complicated control schemes, decreasing the ease of reproduction.
                Walker builds a simplified omnipede robot that utilizes the advantageous characteristics
                of the Myriapoda.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* --- Why Millipedes --- */}
        <FadeIn>
          <section id="why-millipedes" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              Why Millipedes?
            </h2>
            <div className="prose-custom mb-8">
              <p>
                Millipedes maintain a <strong>constant body length</strong> throughout their gait, making them
                relatively easy to mimic with hard body materials. Their leg trajectory can be modeled
                on a simple 2-axis plane, and the body suspends statically as it moves forward &mdash;
                unlike centipedes which involve lateral oscillatory body movement.
              </p>
              <p>
                The Myriapoda maintains consistent stability traversing uneven terrain primarily
                because of its many legs. Both millipedes and centipedes incorporate a <strong>metachronal wave</strong> &mdash;
                a sequential movement pattern where legs lift only when neighboring legs contact the ground
                to provide support. Millipedes can shift between a &ldquo;low gear&rdquo; mode with high thrust
                (duty cycle &asymp; 0.7) and a &ldquo;high gear&rdquo; mode with high speed (duty cycle &asymp; 0.3).
              </p>
            </div>

            <FigureGrid>
              <Figure
                src={ALL_FIGURES[0].src}
                alt={ALL_FIGURES[0].alt}
                caption={ALL_FIGURES[0].caption}
                figNum={ALL_FIGURES[0].figNum}
                onClick={() => openLightbox(0)}
              />
              <Figure
                src={ALL_FIGURES[3].src}
                alt={ALL_FIGURES[3].alt}
                caption={ALL_FIGURES[3].caption}
                figNum={ALL_FIGURES[3].figNum}
                onClick={() => openLightbox(3)}
              />
            </FigureGrid>

            <FigureGrid cols={3}>
              <Figure
                src={ALL_FIGURES[1].src}
                alt={ALL_FIGURES[1].alt}
                caption={ALL_FIGURES[1].caption}
                figNum={ALL_FIGURES[1].figNum}
                onClick={() => openLightbox(1)}
              />
              <Figure
                src={ALL_FIGURES[4].src}
                alt={ALL_FIGURES[4].alt}
                caption={ALL_FIGURES[4].caption}
                figNum={ALL_FIGURES[4].figNum}
                onClick={() => openLightbox(4)}
              />
              <Figure
                src={ALL_FIGURES[5].src}
                alt={ALL_FIGURES[5].alt}
                caption={ALL_FIGURES[5].caption}
                figNum={ALL_FIGURES[5].figNum}
                onClick={() => openLightbox(5)}
              />
            </FigureGrid>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5">
                <span className="text-xs font-mono font-bold tracking-wider text-amber-600 dark:text-amber-400">
                  MILLIPEDE GAIT
                </span>
                <div className="mt-2 prose-custom">
                  <p className="!text-sm !mb-0">
                    Left and right metachronal waves are <strong>in phase</strong>. Body remains rigid.
                    Optimized for <strong>thrust and burrowing</strong>.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5">
                <span className="text-xs font-mono font-bold tracking-wider text-sky-600 dark:text-sky-400">
                  CENTIPEDE GAIT
                </span>
                <div className="mt-2 prose-custom">
                  <p className="!text-sm !mb-0">
                    Left and right waves are <strong>180&deg; out of phase</strong> with lateral body undulation.
                    Optimized for <strong>speed</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* --- Kinematic Model --- */}
        <FadeIn>
          <section id="kinematic-model" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              Kinematic Model
            </h2>
            <div className="prose-custom mb-8">
              <p>
                The kinematic model is based on three simplifying assumptions from Sathirapongsasuti et al.:
                the number of leg segments is one, every leg shares a common motion pattern, and the tip
                of each leg traces out a <strong>circle of reference</strong>. When walking on the floor, this circle
                is trimmed to a segment, creating a cycloid trajectory.
              </p>
              <p>
                The trajectory divides into two phases: in the <strong>transfer phase</strong>, the leg lifts and
                moves forward along the arc of a circle; in the <strong>propulsive phase</strong>, the leg contacts
                the ground and pushes the body forward along a straight line. Garcia proved this model
                is representative of real millipede motion through After Effects video analysis.
              </p>
            </div>

            <FigureGrid>
              <Figure
                src={ALL_FIGURES[6].src}
                alt={ALL_FIGURES[6].alt}
                caption={ALL_FIGURES[6].caption}
                figNum={ALL_FIGURES[6].figNum}
                onClick={() => openLightbox(6)}
              />
              <Figure
                src={ALL_FIGURES[9].src}
                alt={ALL_FIGURES[9].alt}
                caption={ALL_FIGURES[9].caption}
                figNum={ALL_FIGURES[9].figNum}
                onClick={() => openLightbox(9)}
              />
            </FigureGrid>

            <FigureGrid cols={3}>
              <Figure
                src={ALL_FIGURES[7].src}
                alt={ALL_FIGURES[7].alt}
                caption={ALL_FIGURES[7].caption}
                figNum={ALL_FIGURES[7].figNum}
                onClick={() => openLightbox(7)}
              />
              <Figure
                src={ALL_FIGURES[8].src}
                alt={ALL_FIGURES[8].alt}
                caption={ALL_FIGURES[8].caption}
                figNum={ALL_FIGURES[8].figNum}
                onClick={() => openLightbox(8)}
              />
              <Figure
                src={ALL_FIGURES[10].src}
                alt={ALL_FIGURES[10].alt}
                caption={ALL_FIGURES[10].caption}
                figNum={ALL_FIGURES[10].figNum}
                onClick={() => openLightbox(10)}
              />
            </FigureGrid>

            <GlassCard
              label="KEY PARAMETERS"
              caption="The duty cycle D = t_transfer / t_propulsive determines the wave characteristics and thrust behavior, ranging from 0.3 (high speed) to 0.7 (high thrust)."
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { symbol: "V_wave", desc: "Metachronal wave velocity" },
                  { symbol: "V_mill", desc: "Millipede velocity" },
                  { symbol: "H", desc: "Leg clearance height" },
                  { symbol: "D", desc: "Duty cycle (0.3\u20130.7)" },
                ].map((param) => (
                  <div key={param.symbol} className="text-center p-3 rounded-lg bg-gray-50 dark:bg-white/5">
                    <span className="block text-lg font-black font-mono text-indigo-600 dark:text-indigo-400">
                      {param.symbol}
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {param.desc}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </section>
        </FadeIn>

        {/* --- Leg Design --- */}
        <FadeIn>
          <section id="leg-design" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              Leg Actuator Design
            </h2>
            <div className="prose-custom mb-8">
              <p>
                Determining a leg actuation device was a primary challenge. The design goals were:
                a single actuated leg with <strong>one degree of freedom</strong>, minimized individual parts
                (less than three), and a foot path creating the half-circle trajectory defined by the
                kinematic model. Three designs were evaluated:
              </p>
            </div>

            {/* Existing designs survey */}
            <FadeIn>
              <Figure
                src={ALL_FIGURES[11].src}
                alt={ALL_FIGURES[11].alt}
                caption={ALL_FIGURES[11].caption}
                figNum={ALL_FIGURES[11].figNum}
                onClick={() => openLightbox(11)}
                className="mb-8"
              />
            </FadeIn>

            {/* Design comparison cards */}
            <div className="space-y-4 mb-8">
              {[
                {
                  name: "Geared Bar Mechanism",
                  source: "Long et al.",
                  parts: 3,
                  trajectory: false,
                  faults: -2,
                  score: "3/10",
                  desc: "Simple two-gear, single-motor design similar to a 4-bar mechanism. However, the trajectory didn't match the desired half-circle path, and 3D printing gears with sufficient teeth resolution proved difficult.",
                  figures: [12, 13, 14],
                },
                {
                  name: "Custom Sliding Cam",
                  source: "Original design",
                  parts: 4,
                  trajectory: true,
                  faults: -3,
                  score: "6/10",
                  desc: "My own intuitive design that translates the cam shape down by the leg length. Achieved the desired trajectory but suffered from excessive friction points and too many parts.",
                  figures: [15, 16, 17],
                },
                {
                  name: "Fixed Bearing Cam",
                  source: "Wan & Song",
                  parts: 3,
                  trajectory: true,
                  faults: -1,
                  score: "9/10",
                  desc: "A rotating link with bearings at fixed distance and a sliding joint with leg attachment. The cam profile is derived from kinematic equations to produce the half-circle trajectory. Robust, simple, and printable.",
                  figures: [18, 19],
                },
              ].map((design) => (
                <div
                  key={design.name}
                  className={`rounded-xl border p-5 transition-all ${
                    design.score === "9/10"
                      ? "border-indigo-300/60 dark:border-indigo-400/30 bg-indigo-50/30 dark:bg-indigo-500/5"
                      : "border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span className="text-sm font-black font-mono text-gray-900 dark:text-white">
                        {design.name}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                        {design.source}
                      </span>
                    </div>
                    <span className={`text-sm font-black font-mono ${
                      design.score === "9/10"
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}>
                      {design.score}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {design.desc}
                  </p>
                  <div className="flex gap-4 mt-3 mb-4">
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                      Parts: {design.parts}
                    </span>
                    <span className={`text-xs font-mono ${design.trajectory ? "text-emerald-500" : "text-red-400"}`}>
                      Trajectory: {design.trajectory ? "Yes" : "No"}
                    </span>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                      Faults: {design.faults}
                    </span>
                  </div>
                  {/* Design figures */}
                  <div className={`grid grid-cols-${design.figures.length} gap-2`}>
                    {design.figures.map((fi) => (
                      <div
                        key={fi}
                        className="relative overflow-hidden rounded-lg border border-black/5 dark:border-white/5 cursor-zoom-in hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors"
                        onClick={() => openLightbox(fi)}
                      >
                        <img
                          src={ALL_FIGURES[fi].src}
                          alt={ALL_FIGURES[fi].alt}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Mechanism GIFs */}
            <FadeIn>
              <GlassCard label="MECHANISM ANIMATIONS">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { src: `${MEDIA}/ch3-design/leg-animations/custom-cam-animation.gif`, label: "Custom Cam" },
                    { src: `${MEDIA}/ch3-design/leg-animations/wan-song-cam-side.gif`, label: "Wan & Song (Side)" },
                    { src: `${MEDIA}/ch3-design/leg-animations/wan-song-cam-iso.gif`, label: "Wan & Song (Iso)" },
                  ].map((gif) => (
                    <div key={gif.label} className="text-center">
                      <div className="rounded-lg overflow-hidden border border-black/10 dark:border-white/10">
                        <img src={gif.src} alt={gif.label} className="w-full h-auto" loading="lazy" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-2 block">
                        {gif.label}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>

            {/* Cam design details */}
            <div className="prose-custom mt-8 mb-8">
              <p>
                The cam shape is defined by the function S&#8321; = f(&theta;) = (L + d)/2 &minus; H/sin(&theta;),
                where L is leg length, d is bearing distance, and H is axle height. An angular span of
                60&deg; maximizes the axle height and bearing width, with H = 0.43L and d = 0.4L.
                The final cam profile uses Makima polynomial spline interpolation to create smooth transitions.
              </p>
            </div>

            <FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Figure
                  src={ALL_FIGURES[20].src}
                  alt={ALL_FIGURES[20].alt}
                  caption={ALL_FIGURES[20].caption}
                  figNum={ALL_FIGURES[20].figNum}
                  onClick={() => openLightbox(20)}
                />
                <Figure
                  src={ALL_FIGURES[23].src}
                  alt={ALL_FIGURES[23].alt}
                  caption={ALL_FIGURES[23].caption}
                  figNum={ALL_FIGURES[23].figNum}
                  onClick={() => openLightbox(23)}
                />
              </div>
            </FadeIn>

            <FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <Figure
                  src={ALL_FIGURES[25].src}
                  alt={ALL_FIGURES[25].alt}
                  caption={ALL_FIGURES[25].caption}
                  figNum={ALL_FIGURES[25].figNum}
                  onClick={() => openLightbox(25)}
                />
                <Figure
                  src={ALL_FIGURES[27].src}
                  alt={ALL_FIGURES[27].alt}
                  caption={ALL_FIGURES[27].caption}
                  figNum={ALL_FIGURES[27].figNum}
                  onClick={() => openLightbox(27)}
                />
                <Figure
                  src={ALL_FIGURES[30].src}
                  alt={ALL_FIGURES[30].alt}
                  caption={ALL_FIGURES[30].caption}
                  figNum={ALL_FIGURES[30].figNum}
                  onClick={() => openLightbox(30)}
                />
              </div>
            </FadeIn>

            <FadeIn>
              <FigureGrid>
                <Figure
                  src={ALL_FIGURES[28].src}
                  alt={ALL_FIGURES[28].alt}
                  caption={ALL_FIGURES[28].caption}
                  figNum={ALL_FIGURES[28].figNum}
                  onClick={() => openLightbox(28)}
                />
                <Figure
                  src={ALL_FIGURES[29].src}
                  alt={ALL_FIGURES[29].alt}
                  caption={ALL_FIGURES[29].caption}
                  figNum={ALL_FIGURES[29].figNum}
                  onClick={() => openLightbox(29)}
                />
              </FigureGrid>
            </FadeIn>
          </section>
        </FadeIn>

        {/* --- Simulation --- */}
        <FadeIn>
          <section id="simulation" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              Simulation
            </h2>
            <div className="prose-custom mb-8">
              <p>
                A MATLAB Simscape Multibody simulation modeled the cam design through three generations
                of increasing fidelity. The simulation focused on <strong>maximizing stability</strong> &mdash; defined as
                maintaining ground contact &mdash; rather than mimicking a specific biological gait.
              </p>
              <p>
                Initial kinematic analysis narrowed viable gait patterns by calculating ground contact time
                across different combinations of leg count, phase difference, and gait type. This was followed
                by full 3D dynamics simulations measuring center of gravity stability over 10-second runs.
              </p>
            </div>

            <FadeIn>
              <FigureGrid>
                <Figure
                  src={ALL_FIGURES[31].src}
                  alt={ALL_FIGURES[31].alt}
                  caption={ALL_FIGURES[31].caption}
                  figNum={ALL_FIGURES[31].figNum}
                  onClick={() => openLightbox(31)}
                />
                <Figure
                  src={ALL_FIGURES[32].src}
                  alt={ALL_FIGURES[32].alt}
                  caption={ALL_FIGURES[32].caption}
                  figNum={ALL_FIGURES[32].figNum}
                  onClick={() => openLightbox(32)}
                />
              </FigureGrid>
            </FadeIn>

            <FadeIn>
              <Figure
                src={ALL_FIGURES[33].src}
                alt={ALL_FIGURES[33].alt}
                caption={ALL_FIGURES[33].caption}
                figNum={ALL_FIGURES[33].figNum}
                onClick={() => openLightbox(33)}
                className="mb-8"
              />
            </FadeIn>

            {/* Simscape environment figures */}
            <FadeIn>
              <FigureGrid cols={3}>
                <Figure
                  src={ALL_FIGURES[34].src}
                  alt={ALL_FIGURES[34].alt}
                  caption={ALL_FIGURES[34].caption}
                  figNum={ALL_FIGURES[34].figNum}
                  onClick={() => openLightbox(34)}
                />
                <Figure
                  src={ALL_FIGURES[35].src}
                  alt={ALL_FIGURES[35].alt}
                  caption={ALL_FIGURES[35].caption}
                  figNum={ALL_FIGURES[35].figNum}
                  onClick={() => openLightbox(35)}
                />
                <Figure
                  src={ALL_FIGURES[36].src}
                  alt={ALL_FIGURES[36].alt}
                  caption={ALL_FIGURES[36].caption}
                  figNum={ALL_FIGURES[36].figNum}
                  onClick={() => openLightbox(36)}
                />
              </FigureGrid>
            </FadeIn>

            <FadeIn>
              <Figure
                src={ALL_FIGURES[37].src}
                alt={ALL_FIGURES[37].alt}
                caption={ALL_FIGURES[37].caption}
                figNum={ALL_FIGURES[37].figNum}
                onClick={() => openLightbox(37)}
                className="mb-8"
              />
            </FadeIn>

            {/* Simulation videos */}
            <FadeIn>
              <GlassCard label="SIMULATION RECORDINGS">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { src: `${MEDIA}/videos/demo-full-body-locomotion.mp4`, label: "Demo 1 — Full body locomotion" },
                    { src: `${MEDIA}/videos/demo-multi-leg-coordination.mp4`, label: "Demo 2 — Multi-leg coordination" },
                    { src: `${MEDIA}/videos/demo-gait-analysis.mp4`, label: "Demo 3 — Gait analysis view" },
                    { src: `${MEDIA}/videos/demo-stability-test.mp4`, label: "Demo 4 — Stability test" },
                  ].map((video) => (
                    <div key={video.label}>
                      <video
                        src={video.src}
                        controls
                        preload="metadata"
                        className="w-full rounded-lg border border-black/10 dark:border-white/10"
                      />
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-2 block text-center">
                        {video.label}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>

            {/* Results */}
            <FadeIn>
              <FigureGrid>
                <Figure
                  src={ALL_FIGURES[38].src}
                  alt={ALL_FIGURES[38].alt}
                  caption={ALL_FIGURES[38].caption}
                  figNum={ALL_FIGURES[38].figNum}
                  onClick={() => openLightbox(38)}
                />
                <Figure
                  src={ALL_FIGURES[39].src}
                  alt={ALL_FIGURES[39].alt}
                  caption={ALL_FIGURES[39].caption}
                  figNum={ALL_FIGURES[39].figNum}
                  onClick={() => openLightbox(39)}
                />
              </FigureGrid>
            </FadeIn>

            <FadeIn>
              <FigureGrid>
                <Figure
                  src={ALL_FIGURES[40].src}
                  alt={ALL_FIGURES[40].alt}
                  caption={ALL_FIGURES[40].caption}
                  figNum={ALL_FIGURES[40].figNum}
                  onClick={() => openLightbox(40)}
                />
                <Figure
                  src={ALL_FIGURES[41].src}
                  alt={ALL_FIGURES[41].alt}
                  caption={ALL_FIGURES[41].caption}
                  figNum={ALL_FIGURES[41].figNum}
                  onClick={() => openLightbox(41)}
                />
              </FigureGrid>
            </FadeIn>

            <GlassCard
              label="STABILITY FINDINGS"
              caption="Center of gravity measurements from 10-second simulations across four gait configurations with 60&deg; phase difference."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { config: "Centipede, 8 legs", stability: "Most stable", highlight: true },
                  { config: "Centipede, 6 legs", stability: "Good horizontal", highlight: false },
                  { config: "Millipede, 8 legs", stability: "Good vertical", highlight: false },
                  { config: "Millipede, 6 legs", stability: "High variability", highlight: false },
                ].map((result) => (
                  <div
                    key={result.config}
                    className={`p-4 rounded-lg ${
                      result.highlight
                        ? "bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-400/20"
                        : "bg-gray-50 dark:bg-white/5"
                    }`}
                  >
                    <span className="block text-sm font-bold font-mono text-gray-900 dark:text-white">
                      {result.config}
                    </span>
                    <span className={`block text-xs mt-1 ${
                      result.highlight
                        ? "text-indigo-600 dark:text-indigo-400 font-bold"
                        : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {result.stability}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="prose-custom mt-8">
              <p>
                Key finding: <strong>centipede locomotion with neighboring legs 60&deg; out of phase</strong> provides
                the most stable system, with zero ground-contact-loss time for configurations with 3+ leg pairs.
                This creates greater stability with fewer legs, lowering the cost of the robot.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* --- Hardware Results --- */}
        <FadeIn>
          <section id="hardware" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              Hardware &amp; Testing
            </h2>
            <div className="prose-custom mb-8">
              <p>
                The cam leg mechanism was 3D printed using a Raised 3D Pro2 printer at 0.5mm precision,
                then attached to an Antrader Dual Shaft 3-6V Motor. Two print iterations were needed &mdash;
                the first revealed an unstable shaft connection, missing mounting brackets, and sharp
                contour edges causing print jerk. All were fixed in the second iteration.
              </p>
            </div>

            {/* 3D printing */}
            <FadeIn>
              <FigureGrid>
                <Figure
                  src={ALL_FIGURES[42].src}
                  alt={ALL_FIGURES[42].alt}
                  caption={ALL_FIGURES[42].caption}
                  figNum={ALL_FIGURES[42].figNum}
                  onClick={() => openLightbox(42)}
                />
                <Figure
                  src={ALL_FIGURES[43].src}
                  alt={ALL_FIGURES[43].alt}
                  caption={ALL_FIGURES[43].caption}
                  figNum={ALL_FIGURES[43].figNum}
                  onClick={() => openLightbox(43)}
                />
              </FigureGrid>
            </FadeIn>

            {/* Print iteration fixes */}
            <FadeIn>
              <FigureGrid>
                <Figure
                  src={ALL_FIGURES[44].src}
                  alt={ALL_FIGURES[44].alt}
                  caption={ALL_FIGURES[44].caption}
                  figNum={ALL_FIGURES[44].figNum}
                  onClick={() => openLightbox(44)}
                />
                <Figure
                  src={ALL_FIGURES[45].src}
                  alt={ALL_FIGURES[45].alt}
                  caption={ALL_FIGURES[45].caption}
                  figNum={ALL_FIGURES[45].figNum}
                  onClick={() => openLightbox(45)}
                />
              </FigureGrid>
            </FadeIn>

            {/* Test environment */}
            <FadeIn>
              <FigureGrid>
                <Figure
                  src={ALL_FIGURES[46].src}
                  alt={ALL_FIGURES[46].alt}
                  caption={ALL_FIGURES[46].caption}
                  figNum={ALL_FIGURES[46].figNum}
                  onClick={() => openLightbox(46)}
                />
                <Figure
                  src={ALL_FIGURES[47].src}
                  alt={ALL_FIGURES[47].alt}
                  caption={ALL_FIGURES[47].caption}
                  figNum={ALL_FIGURES[47].figNum}
                  onClick={() => openLightbox(47)}
                />
              </FigureGrid>
            </FadeIn>

            {/* Physical build photos */}
            <FadeIn>
              <GlassCard label="PHYSICAL BUILD">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[59, 60, 61].map((fi) => (
                    <div
                      key={fi}
                      className="overflow-hidden rounded-lg border border-black/10 dark:border-white/10 cursor-zoom-in hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors"
                      onClick={() => openLightbox(fi)}
                    >
                      <img
                        src={ALL_FIGURES[fi].src}
                        alt={ALL_FIGURES[fi].alt}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>

            <div className="prose-custom mt-8 mb-8">
              <p>
                Trajectory validation used <strong>After Effects motion tracking</strong> of slow-motion video,
                comparing tracked foot position against the ideal cam trajectory. The leg achieved the
                designed 60&deg; propulsive ground contact span.
              </p>
            </div>

            {/* Trajectory validation */}
            <FadeIn>
              <FigureGrid>
                <Figure
                  src={ALL_FIGURES[48].src}
                  alt={ALL_FIGURES[48].alt}
                  caption={ALL_FIGURES[48].caption}
                  figNum={ALL_FIGURES[48].figNum}
                  onClick={() => openLightbox(48)}
                />
                <Figure
                  src={ALL_FIGURES[49].src}
                  alt={ALL_FIGURES[49].alt}
                  caption={ALL_FIGURES[49].caption}
                  figNum={ALL_FIGURES[49].figNum}
                  onClick={() => openLightbox(49)}
                />
              </FigureGrid>
            </FadeIn>

            <FadeIn>
              <FigureGrid cols={3}>
                <Figure
                  src={ALL_FIGURES[50].src}
                  alt={ALL_FIGURES[50].alt}
                  caption={ALL_FIGURES[50].caption}
                  figNum={ALL_FIGURES[50].figNum}
                  onClick={() => openLightbox(50)}
                />
                <Figure
                  src={ALL_FIGURES[51].src}
                  alt={ALL_FIGURES[51].alt}
                  caption={ALL_FIGURES[51].caption}
                  figNum={ALL_FIGURES[51].figNum}
                  onClick={() => openLightbox(51)}
                />
                <Figure
                  src={ALL_FIGURES[52].src}
                  alt={ALL_FIGURES[52].alt}
                  caption={ALL_FIGURES[52].caption}
                  figNum={ALL_FIGURES[52].figNum}
                  onClick={() => openLightbox(52)}
                />
              </FigureGrid>
            </FadeIn>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Max Trajectory Error", value: "4.6mm", delta: "" },
                { label: "Ground Contact Span", value: "60\u00B0", delta: "" },
                { label: "Angular Velocity", value: "~395", unit: "\u00B0/s" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  <span className="text-xs font-mono font-bold tracking-wider text-gray-500 dark:text-gray-400">
                    {metric.label}
                  </span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black font-mono text-gray-900 dark:text-white">
                      {metric.value}
                    </span>
                    {metric.unit && (
                      <span className="text-sm font-mono text-gray-400 dark:text-gray-500">
                        {metric.unit}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Failed tests - potentiometer and IMU */}
            <div className="prose-custom mb-8">
              <p>
                Additional attempts to measure angular position with a potentiometer and linear position
                with an IMU both failed due to noise and integration drift &mdash; a consequence of
                the home laboratory constraints imposed by COVID-19.
              </p>
            </div>

            <FadeIn>
              <FigureGrid cols={3}>
                <Figure
                  src={ALL_FIGURES[53].src}
                  alt={ALL_FIGURES[53].alt}
                  caption={ALL_FIGURES[53].caption}
                  figNum={ALL_FIGURES[53].figNum}
                  onClick={() => openLightbox(53)}
                />
                <Figure
                  src={ALL_FIGURES[54].src}
                  alt={ALL_FIGURES[54].alt}
                  caption={ALL_FIGURES[54].caption}
                  figNum={ALL_FIGURES[54].figNum}
                  onClick={() => openLightbox(54)}
                />
                <Figure
                  src={ALL_FIGURES[55].src}
                  alt={ALL_FIGURES[55].alt}
                  caption={ALL_FIGURES[55].caption}
                  figNum={ALL_FIGURES[55].figNum}
                  onClick={() => openLightbox(55)}
                />
              </FigureGrid>
            </FadeIn>

            <FadeIn>
              <FigureGrid>
                <Figure
                  src={ALL_FIGURES[56].src}
                  alt={ALL_FIGURES[56].alt}
                  caption={ALL_FIGURES[56].caption}
                  figNum={ALL_FIGURES[56].figNum}
                  onClick={() => openLightbox(56)}
                />
                <Figure
                  src={ALL_FIGURES[57].src}
                  alt={ALL_FIGURES[57].alt}
                  caption={ALL_FIGURES[57].caption}
                  figNum={ALL_FIGURES[57].figNum}
                  onClick={() => openLightbox(57)}
                />
              </FigureGrid>
            </FadeIn>

            <div className="prose-custom mt-8">
              <p>
                Despite the sensor failures, the After Effects
                trajectory analysis confirmed the device functions within a negligible margin of its
                intended design.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* --- Conclusion --- */}
        <FadeIn>
          <section id="conclusion" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              Conclusion
            </h2>
            <div className="prose-custom">
              <p>
                This thesis contributes a <strong>literature review of omnipede gait kinematics</strong>, a
                verified <strong>Simscape Multibody simulation environment</strong> for omnipede robots, and a
                robust, affordable prototype of the Wan &amp; Song cam leg actuator using modern 3D printing.
              </p>
              <p>
                The simulation proved that centipede-like locomotion with 60&deg; phase offset provides
                optimal stability, while the 3D-printed cam mechanism achieved the designed half-circle
                foot trajectory with only 4.6mm maximum error. The entire project was completed at home
                during the pandemic, demonstrating that meaningful robotics research can be conducted
                with accessible tools.
              </p>
              <p>
                Future work includes full-body Walker assembly, expanded terrain simulation, force analysis
                with experimentally-verified friction parameters, and exploring this cam actuator as a
                replacement for bulky multi-motor locomotion systems beyond just millipede-inspired designs.
              </p>
            </div>

            {/* Demo video */}
            <FadeIn>
              <div className="mt-8">
                <GlassCard label="FINAL DEMO">
                  <video
                    src={`${MEDIA}/videos/demo-final.mp4`}
                    controls
                    preload="metadata"
                    className="w-full rounded-lg border border-black/10 dark:border-white/10"
                  />
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                    Final demonstration of the cam leg mechanism in operation
                  </p>
                </GlassCard>
              </div>
            </FadeIn>
          </section>
        </FadeIn>

        {/* --- References --- */}
        <FadeIn>
          <section id="references" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              Key References
            </h2>
            <div className="space-y-3">
              {[
                "Garcia, A. J. C. (2018). Millipede-Inspired Locomotion for Rumen Monitoring through Remotely Operated Vehicle. PhD thesis, Virginia Tech.",
                "Wan, X. & Song, S.-M. (2004). A cam-controlled, single actuator-driven leg mechanism for legged vehicles. ASME IMECE.",
                "Manton, S. M. (1954). The evolution of arthropodan locomotory mechanisms. Part 4: The Diplopoda.",
                "Kano, T. et al. (2017). Decentralized control mechanism underlying interlimb coordination of millipedes. Bioinspiration & Biomimetics.",
                "Long, G. et al. (2002). The kinematic design of the OmniPede. IEEE ICRA.",
                "Sathirapongsasuti, J. et al. (2004). Walking with a millipede. Intel ISF.",
              ].map((ref, i) => (
                <div key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-xs font-mono font-bold text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0">
                    [{i + 1}]
                  </span>
                  <span className="leading-relaxed">{ref}</span>
                </div>
              ))}
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
