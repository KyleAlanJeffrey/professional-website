"use client";

import { useInView } from "@/hooks/use-in-view";
import { ArrowLeft, Download, Github, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
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
  { src: `${MEDIA}/ch3-design/leg-animations/sliding-cam-parts.png`, alt: "Sliding cam parts", caption: "Parts breakdown of the custom sliding cam", figNum: "Fig 3.6" },
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

        {/* ================================================================ */}
        {/*  ABSTRACT                                                        */}
        {/* ================================================================ */}
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

        {/* ================================================================ */}
        {/*  CHAPTER 1: INTRODUCTION                                         */}
        {/* ================================================================ */}
        <FadeIn>
          <section id="ch1" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
              <span className="text-indigo-500 dark:text-indigo-400">1.</span> Introduction
            </h2>
            <div className="h-1 w-16 bg-indigo-500 dark:bg-indigo-400 rounded mb-8" />

            {/* 1.1 Problem Statement */}
            <div id="ch1-problem" className="scroll-mt-20 mb-12">
              <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
                1.1 Problem Statement
              </h3>
              <div className="prose-custom">
                <p>
                  The need for robots capable of maneuvering uneven terrain grows yearly as simple
                  wheeled robots are often limited in their ability to traverse non-flat surfaces. The field of
                  bio-locomotive design looks to nature for inspiration, treating animals as robust, dynamic
                  movement systems evolved precisely for their habitat.
                </p>
                <p>
                  Though previous papers have attempted to recreate omnipede platforms by emulating
                  millipede behavior, the resulting designs often use <strong>numerous motors for each
                  body segment</strong> and complicated control schemes, decreasing the ease of reproduction.
                  Walker aims to build a simplified omnipede robot that utilizes the advantageous characteristics
                  of the Myriapoda subphylum while keeping fabrication simple and affordable.
                </p>
              </div>
            </div>

            {/* 1.2 Existing Work */}
            <div id="ch1-existing" className="scroll-mt-20 mb-12">
              <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
                1.2 Existing Work
              </h3>
              <div className="prose-custom">
                <p>
                  Several researchers have explored multi-legged robots inspired by myriapods. <strong>Garcia</strong> [7]
                  provided an extensive analysis of millipede gait kinematics, validating the cycloid trajectory
                  model through After Effects video tracking of live specimens. <strong>Koh et al.</strong> [10] developed
                  a centipede robot for uneven terrain exploration using multiple servos per segment.
                  <strong> Kano et al.</strong> [9] investigated decentralized control mechanisms underlying interlimb
                  coordination. <strong>Long et al.</strong> [11] designed the OmniPede using geared bar mechanisms
                  for leg actuation. Each of these designs, however, required multiple actuators per segment,
                  increasing cost and complexity.
                </p>
                <p>
                  Garcia&apos;s work was particularly influential for Walker. His After Effects-based analysis of
                  live millipede footage demonstrated that leg tips trace a circular arc during the transfer phase,
                  providing the kinematic foundation that Walker&apos;s design builds upon.
                </p>
              </div>
            </div>

            {/* 1.3 Characteristics of a Millipede */}
            <div id="ch1-characteristics" className="scroll-mt-20 mb-8">
              <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
                1.3 Characteristics of a Millipede
              </h3>

              {/* 1.3.1 Leg Anatomy */}
              <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3 mt-6">
                1.3.1 Leg Anatomy
              </h4>
              <div className="prose-custom">
                <p>
                  Manton&apos;s foundational analysis of arthropod locomotion showed that while millipede legs
                  contain many segments, they are <strong>mostly rigid</strong> and can be simplified to a single
                  rotating segment for modeling purposes. The leg motion occurs primarily in a 2D plane
                  perpendicular to the body axis, which greatly simplifies the kinematic model.
                </p>
              </div>

              <FigureGrid cols={3}>
                <Figure
                  src={ALL_FIGURES[1].src}
                  alt={ALL_FIGURES[1].alt}
                  caption={ALL_FIGURES[1].caption}
                  figNum={ALL_FIGURES[1].figNum}
                  onClick={() => openLightbox(1)}
                />
                <Figure
                  src={ALL_FIGURES[2].src}
                  alt={ALL_FIGURES[2].alt}
                  caption={ALL_FIGURES[2].caption}
                  figNum={ALL_FIGURES[2].figNum}
                  onClick={() => openLightbox(2)}
                />
                <Figure
                  src={ALL_FIGURES[4].src}
                  alt={ALL_FIGURES[4].alt}
                  caption={ALL_FIGURES[4].caption}
                  figNum={ALL_FIGURES[4].figNum}
                  onClick={() => openLightbox(4)}
                />
              </FigureGrid>

              {/* 1.3.2 Gait Analysis */}
              <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3 mt-8">
                1.3.2 Gait Analysis
              </h4>
              <div className="prose-custom">
                <p>
                  Millipede locomotion is governed by <strong>duty cycle modulation</strong>, ranging from 0.3 to 0.7.
                  The duty cycle D represents the ratio of propulsive (ground contact) time to total stride
                  period. Low duty cycles (~0.3) produce a &ldquo;high gear&rdquo; mode optimized for speed,
                  while high duty cycles (~0.7) produce a &ldquo;low gear&rdquo; mode optimized for thrust
                  and burrowing force. The legs move in a <strong>metachronal wave</strong> &mdash; a sequential
                  ripple pattern where each leg lifts only when neighboring legs are on the ground to provide support.
                </p>
              </div>

              <FigureGrid>
                <Figure
                  src={ALL_FIGURES[3].src}
                  alt={ALL_FIGURES[3].alt}
                  caption={ALL_FIGURES[3].caption}
                  figNum={ALL_FIGURES[3].figNum}
                  onClick={() => openLightbox(3)}
                />
                <Figure
                  src={ALL_FIGURES[5].src}
                  alt={ALL_FIGURES[5].alt}
                  caption={ALL_FIGURES[5].caption}
                  figNum={ALL_FIGURES[5].figNum}
                  onClick={() => openLightbox(5)}
                />
              </FigureGrid>

              {/* 1.3.3 Why Millipedes? */}
              <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3 mt-8">
                1.3.3 Why Millipedes?
              </h4>
              <div className="prose-custom">
                <p>
                  Millipedes maintain a <strong>constant body length</strong> throughout their gait, making them
                  relatively easy to mimic with rigid body materials. Their body suspends statically as it moves
                  forward &mdash; unlike centipedes, which exhibit lateral oscillatory body movement. Both species
                  use metachronal waves, but with a key difference: millipede left/right waves are <strong>in
                  phase</strong>, while centipede waves are <strong>180&deg; out of phase</strong>, producing lateral undulation.
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
              </FigureGrid>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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

              {/* Biological reference footage */}
              <FadeIn>
                <GlassCard label="BIOLOGICAL REFERENCE FOOTAGE">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { src: `${MEDIA}/ch1-introduction/biological-insect-gait-1.mp4`, label: "Millipede metachronal wave in motion" },
                      { src: `${MEDIA}/ch1-introduction/biological-insect-gait-2.mp4`, label: "Myriapoda gait and terrain traversal" },
                      { src: `${MEDIA}/ch1-introduction/biological-insect-gait-3.mp4`, label: "Millipede locomotion — close-up" },
                      { src: `${MEDIA}/ch1-introduction/biological-insect-gait-4.mp4`, label: "Centipede gait comparison" },
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
            </div>
          </section>
        </FadeIn>

        {/* ================================================================ */}
        {/*  CHAPTER 2: KINEMATIC MODEL                                      */}
        {/* ================================================================ */}
        <FadeIn>
          <section id="ch2" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
              <span className="text-indigo-500 dark:text-indigo-400">2.</span> Kinematic Model
            </h2>
            <div className="h-1 w-16 bg-indigo-500 dark:bg-indigo-400 rounded mb-8" />

            <div className="prose-custom mb-8">
              <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
                2.1 Literature Review
              </h3>
              <p>
                The kinematic model is based on three simplifying assumptions from Sathirapongsasuti et al.:
                the number of leg segments is one, every leg shares a common motion pattern, and the tip
                of each leg traces a <strong>circle of reference</strong>. When walking on a surface, this circle
                is trimmed to a segment, creating a cycloid trajectory split into two distinct phases.
              </p>
            </div>

            <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3">
              2.1.1 Kinematics of Leg Motion
            </h4>
            <div className="prose-custom mb-8">
              <p>
                In the <strong>transfer phase</strong>, the leg lifts off the ground and swings forward along
                a circular arc. In the <strong>propulsive phase</strong>, the leg contacts the ground and pushes
                the body forward along a straight line. The position equations describe x(t) and y(t) for
                each phase, parameterized by the duty cycle D = t<sub>transfer</sub> / t<sub>propulsive</sub>.
              </p>
              <p>
                Garcia validated this model by tracking live millipede footage in After Effects, overlaying
                the theoretical cycloid trajectory onto the tracked leg positions. The fit confirmed the
                circle-of-reference model is representative of real millipede motion.
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

            <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3 mt-8">
              2.1.2 Qualitative Understanding of Metachronal Gait
            </h4>
            <div className="prose-custom">
              <p>
                The metachronal wave can be modulated for different purposes. Higher duty cycles increase
                the number of legs on the ground at any time, generating more thrust &mdash; Garcia noted this
                is the mode used during burrowing. Lower duty cycles reduce ground contact time per leg,
                increasing stride frequency and speed. This modulation is achieved purely by varying the
                duty cycle parameter, making it straightforward to implement in a robotic system with
                a single control variable per leg pair.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* ================================================================ */}
        {/*  CHAPTER 3: DESIGN                                               */}
        {/* ================================================================ */}
        <FadeIn>
          <section id="ch3" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
              <span className="text-indigo-500 dark:text-indigo-400">3.</span> Design
            </h2>
            <div className="h-1 w-16 bg-indigo-500 dark:bg-indigo-400 rounded mb-8" />

            <div className="prose-custom mb-8">
              <p>
                The primary design challenge was creating a leg actuator with three goals: <strong>one degree
                of freedom</strong>, fewer than three individual parts, and a foot path producing the half-circle
                trajectory defined by the kinematic model. Designs were evaluated with a scoring rubric:
                5 points if fewer than 3 parts (minus 1 per extra), 5 points if trajectory matches (0 otherwise),
                minus any fault deductions.
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

            {/* Supplementary PoC footage */}
            <FadeIn>
              <GlassCard label="SUPPLEMENTARY — SOURCE BUILDS & FINAL DESIGN">
                <div className="prose-custom !mb-4">
                  <p className="!text-sm">
                    Existing omnipede robot implementations from the literature that informed Walker&apos;s design,
                    plus the Wan &amp; Song cam mechanism selected as Walker&apos;s final leg actuator.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { src: `${MEDIA}/ch3-design/supplementary-poc-1.mp4`, label: "Supplementary — Garcia cam-based design" },
                    { src: `${MEDIA}/ch3-design/supplementary-poc-2.mp4`, label: "Supplementary — Geared bar mechanism" },
                    { src: `${MEDIA}/ch3-design/supplementary-poc-3.mp4`, label: "Supplementary — Wan & Song cam (final design)" },
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

            {/* 3.1.1 Geared Bar Mechanism */}
            <div id="ch3-geared-bar" className="scroll-mt-20 mt-12 mb-12">
              <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
                3.1.1 Geared Bar Mechanism
              </h3>
              <div className="prose-custom mb-4">
                <p>
                  Based on Long et al.&apos;s OmniPede, this design uses a <strong>two-gear, single-motor</strong> arrangement
                  similar to a 4-bar linkage. While simple in concept (only 2 gears), trajectory analysis revealed
                  significant deviation from the desired half-circle path. Furthermore, 3D printing gears with
                  sufficient teeth resolution proved too difficult at the available print precision.
                </p>
              </div>

              {/* Score table */}
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 overflow-hidden mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                      <th className="text-left px-4 py-2 font-mono font-bold text-gray-600 dark:text-gray-300">Criterion</th>
                      <th className="text-center px-4 py-2 font-mono font-bold text-gray-600 dark:text-gray-300">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-black/5 dark:border-white/5">
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Parts (3 parts, target &lt;3)</td>
                      <td className="px-4 py-2 text-center font-mono text-gray-600 dark:text-gray-400">4/5</td>
                    </tr>
                    <tr className="border-b border-black/5 dark:border-white/5">
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Trajectory match</td>
                      <td className="px-4 py-2 text-center font-mono text-red-400">0/5</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Faults (gear printing difficulty)</td>
                      <td className="px-4 py-2 text-center font-mono text-red-400">-1</td>
                    </tr>
                    <tr className="border-t border-black/10 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                      <td className="px-4 py-2 font-bold text-gray-900 dark:text-white">Total</td>
                      <td className="px-4 py-2 text-center font-mono font-bold text-gray-900 dark:text-white">3/10</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <FigureGrid cols={3}>
                <Figure
                  src={ALL_FIGURES[12].src}
                  alt={ALL_FIGURES[12].alt}
                  caption={ALL_FIGURES[12].caption}
                  figNum={ALL_FIGURES[12].figNum}
                  onClick={() => openLightbox(12)}
                />
                <Figure
                  src={ALL_FIGURES[13].src}
                  alt={ALL_FIGURES[13].alt}
                  caption={ALL_FIGURES[13].caption}
                  figNum={ALL_FIGURES[13].figNum}
                  onClick={() => openLightbox(13)}
                />
                <Figure
                  src={ALL_FIGURES[14].src}
                  alt={ALL_FIGURES[14].alt}
                  caption={ALL_FIGURES[14].caption}
                  figNum={ALL_FIGURES[14].figNum}
                  onClick={() => openLightbox(14)}
                />
              </FigureGrid>
            </div>

            {/* 3.1.2 Cam Designs */}
            <div id="ch3-cam" className="scroll-mt-20 mb-12">
              <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
                3.1.2 Cam Designs
              </h3>

              {/* 3.1.2.1 Custom Sliding Cam */}
              <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3">
                3.1.2.1 Custom Sliding Cam
              </h4>
              <div className="prose-custom mb-4">
                <p>
                  An original design that translates the cam shape downward by the leg length, directly encoding
                  the desired trajectory into the cam profile. While this achieved the correct half-circle foot path,
                  the mechanism suffered from <strong>excessive friction points</strong> and required too many individual parts
                  (4 parts vs. the target of fewer than 3).
                </p>
              </div>

              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 overflow-hidden mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                      <th className="text-left px-4 py-2 font-mono font-bold text-gray-600 dark:text-gray-300">Criterion</th>
                      <th className="text-center px-4 py-2 font-mono font-bold text-gray-600 dark:text-gray-300">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-black/5 dark:border-white/5">
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Parts (4 parts, target &lt;3)</td>
                      <td className="px-4 py-2 text-center font-mono text-gray-600 dark:text-gray-400">3/5</td>
                    </tr>
                    <tr className="border-b border-black/5 dark:border-white/5">
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Trajectory match</td>
                      <td className="px-4 py-2 text-center font-mono text-emerald-500">5/5</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Faults (friction, complexity)</td>
                      <td className="px-4 py-2 text-center font-mono text-red-400">-2</td>
                    </tr>
                    <tr className="border-t border-black/10 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                      <td className="px-4 py-2 font-bold text-gray-900 dark:text-white">Total</td>
                      <td className="px-4 py-2 text-center font-mono font-bold text-gray-900 dark:text-white">6/10</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <FigureGrid cols={3}>
                <Figure
                  src={ALL_FIGURES[15].src}
                  alt={ALL_FIGURES[15].alt}
                  caption={ALL_FIGURES[15].caption}
                  figNum={ALL_FIGURES[15].figNum}
                  onClick={() => openLightbox(15)}
                />
                <Figure
                  src={ALL_FIGURES[16].src}
                  alt={ALL_FIGURES[16].alt}
                  caption={ALL_FIGURES[16].caption}
                  figNum={ALL_FIGURES[16].figNum}
                  onClick={() => openLightbox(16)}
                />
                <Figure
                  src={ALL_FIGURES[17].src}
                  alt={ALL_FIGURES[17].alt}
                  caption={ALL_FIGURES[17].caption}
                  figNum={ALL_FIGURES[17].figNum}
                  onClick={() => openLightbox(17)}
                />
              </FigureGrid>

              {/* 3.1.2.2 Fixed Bearing Cam (Wan & Song) */}
              <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3 mt-8">
                3.1.2.2 Fixed Bearing Cam (Wan &amp; Song) &mdash; Winner
              </h4>
              <div className="prose-custom mb-4">
                <p>
                  This design from Wan &amp; Song (2004) uses a <strong>rotating link with bearings</strong> at a fixed
                  distance and a sliding joint with leg attachment. The cam profile is derived analytically from the
                  function S&#8321; = f(&theta;) = (L + d)/2 &minus; H/sin(&theta;), where L is leg length, d is
                  bearing distance, and H is axle height. An angular span of <strong>60&deg;</strong> maximizes the axle
                  height and bearing width, with H = 0.43L and d = 0.4L. The final profile uses <strong>Makima
                  polynomial spline</strong> interpolation for smooth transitions between the propulsive and transfer phases.
                </p>
              </div>

              <div className="rounded-xl border border-indigo-300/60 dark:border-indigo-400/30 bg-indigo-50/30 dark:bg-indigo-500/5 overflow-hidden mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-indigo-200/60 dark:border-indigo-400/20 bg-indigo-50/50 dark:bg-indigo-500/10">
                      <th className="text-left px-4 py-2 font-mono font-bold text-gray-600 dark:text-gray-300">Criterion</th>
                      <th className="text-center px-4 py-2 font-mono font-bold text-gray-600 dark:text-gray-300">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-indigo-100/60 dark:border-indigo-400/10">
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Parts (3 parts, target &lt;3)</td>
                      <td className="px-4 py-2 text-center font-mono text-gray-600 dark:text-gray-400">4/5</td>
                    </tr>
                    <tr className="border-b border-indigo-100/60 dark:border-indigo-400/10">
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Trajectory match</td>
                      <td className="px-4 py-2 text-center font-mono text-emerald-500">5/5</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Faults (minor print tolerance)</td>
                      <td className="px-4 py-2 text-center font-mono text-red-400">0</td>
                    </tr>
                    <tr className="border-t border-indigo-200/60 dark:border-indigo-400/20 bg-indigo-50/50 dark:bg-indigo-500/10">
                      <td className="px-4 py-2 font-bold text-gray-900 dark:text-white">Total</td>
                      <td className="px-4 py-2 text-center font-mono font-bold text-indigo-600 dark:text-indigo-400">9/10</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <FigureGrid>
                <Figure
                  src={ALL_FIGURES[18].src}
                  alt={ALL_FIGURES[18].alt}
                  caption={ALL_FIGURES[18].caption}
                  figNum={ALL_FIGURES[18].figNum}
                  onClick={() => openLightbox(18)}
                />
                <Figure
                  src={ALL_FIGURES[19].src}
                  alt={ALL_FIGURES[19].alt}
                  caption={ALL_FIGURES[19].caption}
                  figNum={ALL_FIGURES[19].figNum}
                  onClick={() => openLightbox(19)}
                />
              </FigureGrid>

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

              {/* Cam profile iteration */}
              <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3 mt-8">
                Cam Profile Development
              </h4>
              <div className="prose-custom mb-4">
                <p>
                  The cam profile went through multiple iterations: initial derivation from kinematic equations,
                  refined angular span optimization, and finally Makima spline smoothing. The resulting profile
                  produces a trajectory validated against the ideal half-circle path.
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
            </div>

            {/* 3.2 Conclusion */}
            <div className="prose-custom">
              <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
                3.2 Conclusion
              </h3>
              <p>
                The design evolution progressed from a simple geared bar mechanism (3/10) through an original
                sliding cam (6/10) to the final Wan &amp; Song fixed bearing cam (9/10). The winning design
                achieves the desired half-circle trajectory with minimal parts, using an analytically derived cam
                profile that can be reliably 3D printed.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* ================================================================ */}
        {/*  CHAPTER 4: SIMULATION                                           */}
        {/* ================================================================ */}
        <FadeIn>
          <section id="ch4" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
              <span className="text-indigo-500 dark:text-indigo-400">4.</span> Simulation
            </h2>
            <div className="h-1 w-16 bg-indigo-500 dark:bg-indigo-400 rounded mb-8" />

            {/* 4.1 Kinematic Equation Analysis */}
            <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
              4.1 Kinematic Equation Analysis
            </h3>
            <div className="prose-custom mb-6">
              <p>
                Before running full dynamics simulations, a kinematic analysis was performed to narrow viable
                gait configurations. The goal was to <strong>maximize ground contact time</strong> &mdash; the fraction
                of the gait cycle where at least one leg per side touches the ground. Centipede-like motion
                (180&deg; phase offset between left and right legs) was found to significantly reduce
                no-contact time compared to millipede-like motion.
              </p>
            </div>

            {/* Table 4.1 — Ground Contact Time */}
            <FadeIn>
              <GlassCard label="TABLE 4.1 — GROUND CONTACT TIME ANALYSIS" caption="Time (in seconds) with no ground contact over a 10-second simulation. Lower is better. Centipede configurations with 3+ leg pairs achieve zero no-contact time.">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-black/10 dark:border-white/10">
                        <th className="text-left px-3 py-2 font-mono font-bold text-gray-600 dark:text-gray-300">Leg Pairs</th>
                        <th className="text-center px-3 py-2 font-mono font-bold text-gray-600 dark:text-gray-300">Phase Diff</th>
                        <th className="text-center px-3 py-2 font-mono font-bold text-amber-600 dark:text-amber-400">Millipede</th>
                        <th className="text-center px-3 py-2 font-mono font-bold text-sky-600 dark:text-sky-400">Centipede</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { legs: "2", phase: "60\u00B0", mill: "3.33s", centi: "0.00s" },
                        { legs: "2", phase: "90\u00B0", mill: "5.00s", centi: "1.67s" },
                        { legs: "3", phase: "60\u00B0", mill: "1.67s", centi: "0.00s" },
                        { legs: "3", phase: "90\u00B0", mill: "3.33s", centi: "0.00s" },
                        { legs: "4", phase: "60\u00B0", mill: "0.00s", centi: "0.00s" },
                        { legs: "4", phase: "90\u00B0", mill: "1.67s", centi: "0.00s" },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-black/5 dark:border-white/5">
                          <td className="px-3 py-2 font-mono text-gray-600 dark:text-gray-400">{row.legs}</td>
                          <td className="px-3 py-2 text-center font-mono text-gray-600 dark:text-gray-400">{row.phase}</td>
                          <td className="px-3 py-2 text-center font-mono text-gray-600 dark:text-gray-400">{row.mill}</td>
                          <td className={`px-3 py-2 text-center font-mono ${row.centi === "0.00s" ? "text-emerald-500 font-bold" : "text-gray-600 dark:text-gray-400"}`}>{row.centi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </FadeIn>

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

            {/* 4.2 Simscape Multibody Simulations */}
            <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4 mt-8">
              4.2 Simscape Multibody Simulations
            </h3>

            <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3">
              4.2.1 Iterations
            </h4>
            <div className="prose-custom mb-6">
              <p>
                The simulation went through <strong>three generations</strong> of increasing fidelity.
                Gen 1 was a rough proof of concept validating basic forward motion. Gen 2 attempted to use
                the custom sliding cam but proved too complex to simulate reliably. Gen 3 adopted the
                Wan &amp; Song cam design, enabling full dynamics analysis across multiple leg counts and
                gait configurations.
              </p>
            </div>

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

            <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3">
              4.2.2 Final Environment
            </h4>
            <div className="prose-custom mb-6">
              <p>
                The final Simscape environment consists of two reusable components: a <strong>body segment
                component</strong> (rigid body with mass properties) and a <strong>leg segment component</strong> (cam-driven
                joint with revolute and slider constraints). These components are parameterized and
                chained together to form configurations with varying leg counts and phase offsets.
              </p>
            </div>

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

            {/* Simscape simulation recordings */}
            <FadeIn>
              <GlassCard label="SIMSCAPE SIMULATION RECORDINGS">
                <div className="prose-custom !mb-4">
                  <p className="!text-sm">
                    From early proof-of-concept through final gait comparisons &mdash;
                    each generation increased simulation fidelity.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { src: `${MEDIA}/ch4-simulation/simscape/gen1-simulation/gen1-millipede-model.mp4`, label: "Gen 1 — Early proof of concept" },
                    { src: `${MEDIA}/ch4-simulation/simscape/gen2-simulation/gen2-model-v3.mp4`, label: "Gen 2 — Custom cam attempt" },
                    { src: `${MEDIA}/ch4-simulation/simscape/sim4/sim4-leg-test-harness.mp4`, label: "Gen 3 — Single leg test harness" },
                    { src: `${MEDIA}/ch4-simulation/simscape/sim4/sim4-6legs-rigid-body.mp4`, label: "Gen 3 — 6-leg rigid body" },
                    { src: `${MEDIA}/ch4-simulation/simscape/leg-comparisons/6-legs/centipede-like/centi-6legs-60deg-iso.mp4`, label: "Centipede-like, 6 legs, 60° offset" },
                    { src: `${MEDIA}/ch4-simulation/simscape/leg-comparisons/8-legs/centipede-like/centi-8legs-90deg-iso.mp4`, label: "Centipede-like, 8 legs, 90° offset" },
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

            {/* 4.3 Results */}
            <div id="ch4-results" className="scroll-mt-20 mt-12">
              <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
                4.3 Results
              </h3>
              <div className="prose-custom mb-6">
                <p>
                  Center of gravity (CoG) measurements across 10-second simulations revealed that the
                  <strong> centipede 8-leg configuration</strong> was the most stable overall. Centipede gaits exhibited
                  extreme <strong>vertical instability</strong> (large CoG oscillations in Y) but excellent <strong>horizontal
                  stability</strong> (smooth, consistent forward progress). Millipede configurations moved slower
                  with greater velocity variability.
                </p>
              </div>

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
                    { config: "Centipede, 8 legs", stability: "Most stable overall", highlight: true },
                    { config: "Centipede, 6 legs", stability: "Excellent horizontal stability", highlight: false },
                    { config: "Millipede, 8 legs", stability: "Good vertical stability", highlight: false },
                    { config: "Millipede, 6 legs", stability: "High velocity variability", highlight: false },
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
                  This creates greater stability with fewer legs, lowering the cost of the final robot.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ================================================================ */}
        {/*  CHAPTER 5: FINAL MODEL & CONCLUSIONS                            */}
        {/* ================================================================ */}
        <FadeIn>
          <section id="ch5" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
              <span className="text-indigo-500 dark:text-indigo-400">5.</span> Final Model &amp; Conclusions
            </h2>
            <div className="h-1 w-16 bg-indigo-500 dark:bg-indigo-400 rounded mb-8" />

            {/* 5.1 Print Faults and Fixes */}
            <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
              5.1 Print Faults &amp; Fixes
            </h3>
            <div className="prose-custom mb-6">
              <p>
                The cam mechanism was 3D printed using a <strong>Raised 3D Pro2</strong> printer at 0.5mm precision
                with ideaMaker as the slicer. The first print iteration revealed three faults:
                an <strong>unstable shaft connection</strong> (too narrow at the base), <strong>no mounting brackets</strong> for
                motor attachment, and <strong>sharp contour edges</strong> causing print head jerk. The second iteration
                addressed all three by widening the shaft base, adding bracket geometry, rounding sharp edges,
                and reducing infill to lower print time.
              </p>
            </div>

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

            {/* 5.2 Testing */}
            <div id="ch5-testing" className="scroll-mt-20 mt-12">
              <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
                5.2 Testing
              </h3>

              <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3">
                5.2.1 Home-Brew vs. Ideal
              </h4>
              <div className="prose-custom mb-6">
                <p>
                  Due to COVID-19 pandemic restrictions, no lab equipment was available. All testing
                  was performed at home using consumer hardware and <strong>Adobe After Effects</strong> as the
                  primary measurement tool &mdash; a technique borrowed from Garcia&apos;s biological analysis work.
                </p>
              </div>

              <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3">
                5.2.2 Testing Trajectory
              </h4>
              <div className="prose-custom mb-6">
                <p>
                  An Arduino-based test harness drove the cam mechanism with a DC motor. A potentiometer
                  measured angular position, and a voltage divider circuit controlled motor speed for
                  consistent test conditions.
                </p>
              </div>

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

              <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3 mt-8">
                5.2.3 After Effects Analysis
              </h4>
              <div className="prose-custom mb-6">
                <p>
                  Slow-motion video of the cam mechanism was tracked in After Effects to extract
                  the foot tip trajectory. The tracked data confirmed the designed <strong>60&deg; propulsive
                  ground contact span</strong>. Normalized position data was overlaid on the ideal trajectory,
                  yielding a <strong>maximum error of 4.6mm</strong> &mdash; well within acceptable tolerances for the
                  target application.
                </p>
              </div>

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
                  { label: "Max Trajectory Error", value: "4.6mm", unit: "" },
                  { label: "Ground Contact Span", value: "60\u00B0", unit: "" },
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

              {/* 5.2.4 Failed Tests */}
              <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3">
                5.2.4 Failed Tests
              </h4>
              <div className="prose-custom mb-6">
                <p>
                  Two additional measurement approaches were attempted and both failed.
                  The <strong>potentiometer</strong> produced extremely noisy angular position data; even after applying
                  80Hz and 15Hz low-pass filters, the signal remained too noisy for precise trajectory
                  reconstruction. A rough angular velocity estimate of ~395&deg;/s was the only usable data point.
                  The <strong>IMU (MPU9250)</strong> suffered from integration drift, making linear position data
                  completely unusable for trajectory validation.
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

              {/* 5.2.5 Conclusion on Testing */}
              <div className="prose-custom mt-6 mb-6">
                <p>
                  Despite the sensor failures, the After Effects trajectory analysis provided sufficient
                  validation. The simulation was confirmed, and the device functions within a negligible
                  margin of its intended design.
                </p>
              </div>

              <FadeIn>
                <Figure
                  src={ALL_FIGURES[58].src}
                  alt={ALL_FIGURES[58].alt}
                  caption={ALL_FIGURES[58].caption}
                  figNum={ALL_FIGURES[58].figNum}
                  onClick={() => openLightbox(58)}
                  className="mb-8"
                />
              </FadeIn>

              {/* Hardware test footage */}
              <FadeIn>
                <GlassCard label="HARDWARE TEST FOOTAGE">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { src: `${MEDIA}/ch5-hardware/supplementary-3.mp4`, label: "Cam mechanism in operation" },
                      { src: `${MEDIA}/ch5-hardware/supplementary-4.avi`, label: "Leg trajectory test (1)" },
                      { src: `${MEDIA}/ch5-hardware/supplementary-5.avi`, label: "Leg trajectory test (2)" },
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
            </div>

            {/* 5.3 Conclusion & Future Work */}
            <div id="ch5-conclusion" className="scroll-mt-20 mt-12">
              <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
                5.3 Conclusion &amp; Future Work
              </h3>
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
                  during the COVID-19 pandemic, demonstrating that meaningful robotics research can be
                  conducted with accessible tools.
                </p>
                <p>
                  Future work includes: full-body Walker assembly with multiple cam-driven segments,
                  expanded terrain simulation with obstacle geometries, force analysis with
                  experimentally-verified friction parameters, and exploring this cam actuator as a general
                  replacement for bulky multi-motor locomotion systems beyond millipede-inspired designs.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ================================================================ */}
        {/*  REFERENCES                                                      */}
        {/* ================================================================ */}
        <FadeIn>
          <section id="references" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
              References
            </h2>
            <div className="space-y-3">
              {[
                "Garcia, A. J. C. (2018). Millipede-Inspired Locomotion for Rumen Monitoring through Remotely Operated Vehicle. PhD thesis, Virginia Tech.",
                "Wan, X. & Song, S.-M. (2004). A cam-controlled, single actuator-driven leg mechanism for legged vehicles. ASME IMECE.",
                "Manton, S. M. (1954). The evolution of arthropodan locomotory mechanisms. Part 4: The Diplopoda.",
                "Kano, T. et al. (2017). Decentralized control mechanism underlying interlimb coordination of millipedes. Bioinspiration & Biomimetics.",
                "Long, G. et al. (2002). The kinematic design of the OmniPede. IEEE ICRA.",
                "Sathirapongsasuti, J. et al. (2004). Walking with a millipede. Intel ISF.",
                "Garcia, A., Priya, S., & Marek, P. (2015). Understanding the locomotion and dynamic controls for millipedes. ASME SMASIS.",
                "Crow, A. (2005). Cam controlled walking robot.",
                "Koh, D. et al. (2010). Centipede robot for uneven terrain exploration. IEEE RAS & EMBS.",
                "Anderson, B. et al. (1995). Axial kinematics and muscle activity during terrestrial locomotion of the centipede.",
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
