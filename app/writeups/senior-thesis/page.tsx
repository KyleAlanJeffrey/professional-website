"use client";

import { useInView } from "@/hooks/use-in-view";
import { ArrowLeft, Download, Github } from "lucide-react";
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

export default function SeniorThesisPage() {
  const [mounted, setMounted] = useState(false);

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
            href="/writeups"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            All Writeups
          </Link>
          <span className="text-xs text-indigo-500 dark:text-indigo-400 tracking-[0.3em] font-bold font-mono">
            SENIOR THESIS
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
                href="/Jeffrey_Kyle_Robotics_Thesis.pdf"
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
          <section className="mb-16">
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
          <section className="mb-16">
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
          <section className="mb-16">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <section className="mb-16">
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
          <section className="mb-16">
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

            {/* Design comparison */}
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
                },
                {
                  name: "Custom Sliding Cam",
                  source: "Original design",
                  parts: 4,
                  trajectory: true,
                  faults: -3,
                  score: "6/10",
                  desc: "My own intuitive design that translates the cam shape down by the leg length. Achieved the desired trajectory but suffered from excessive friction points and too many parts.",
                },
                {
                  name: "Fixed Bearing Cam",
                  source: "Wan & Song",
                  parts: 3,
                  trajectory: true,
                  faults: -1,
                  score: "9/10",
                  desc: "A rotating link with bearings at fixed distance and a sliding joint with leg attachment. The cam profile is derived from kinematic equations to produce the half-circle trajectory. Robust, simple, and printable.",
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
                  <div className="flex gap-4 mt-3">
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
                </div>
              ))}
            </div>

            <div className="prose-custom">
              <p>
                The cam shape is defined by the function S&#8321; = f(&theta;) = (L + d)/2 &minus; H/sin(&theta;),
                where L is leg length, d is bearing distance, and H is axle height. An angular span of
                60&deg; maximizes the axle height and bearing width, with H = 0.43L and d = 0.4L.
                The final cam profile uses Makima polynomial spline interpolation to create smooth transitions.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* --- Simulation --- */}
        <FadeIn>
          <section className="mb-16">
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
          <section className="mb-16">
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
              <p>
                Trajectory validation used <strong>After Effects motion tracking</strong> of slow-motion video,
                comparing tracked foot position against the ideal cam trajectory. The leg achieved the
                designed 60&deg; propulsive ground contact span.
              </p>
            </div>

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

            <div className="prose-custom">
              <p>
                Additional attempts to measure angular position with a potentiometer and linear position
                with an IMU both failed due to noise and integration drift &mdash; a consequence of
                the home laboratory constraints imposed by COVID-19. Despite this, the After Effects
                trajectory analysis confirmed the device functions within a negligible margin of its
                intended design.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* --- Conclusion --- */}
        <FadeIn>
          <section className="mb-16">
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
          </section>
        </FadeIn>

        {/* --- References --- */}
        <FadeIn>
          <section className="mb-16">
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
