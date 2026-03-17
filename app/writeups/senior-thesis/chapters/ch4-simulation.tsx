"use client";

import { ALL_FIGURES, MEDIA } from "../components/figures";
import { FadeIn, Figure, FigureGrid, GlassCard, VideoCard, ModelCard } from "../components/ui";

export default function Chapter4({ openLightbox }: { openLightbox: (i: number) => void }) {
  return (
    <FadeIn>
      <section id="ch4" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
          <span className="text-indigo-500 dark:text-indigo-400">4.</span> Simulation
        </h2>
        <div className="h-1 w-16 bg-indigo-500 dark:bg-indigo-400 rounded mb-8" />

        {/* Chapter intro */}
        <div className="prose-custom mb-6">
          <p>
            This chapter strays from simply mimicking millipede motion and focuses on maximizing the
            stability of the robot design based upon the developed cam actuator. My analysis recognizes
            the thrust benefits of millipede motion but focuses on stability rather than speed or
            thrust potential.
          </p>
        </div>

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
          <p>
            The cam actuator is two-sided, meaning each leg device draws out two cycloids 180&deg; out
            of phase with each other.
          </p>
          <p>
            The Simscape environment takes upwards of fifteen minutes per simulation to compile and run.
          </p>
        </div>

        {/* Table 4.1 */}
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
                    { legs: "2", phase: "0\u00B0", mill: "3.14s", centi: "1.56s" },
                    { legs: "2", phase: "30\u00B0", mill: "2.10s", centi: "0.00s" },
                    { legs: "2", phase: "60\u00B0", mill: "1.05s", centi: "0.00s" },
                    { legs: "2", phase: "90\u00B0", mill: "1.56s", centi: "1.56s" },
                    { legs: "3", phase: "0\u00B0", mill: "3.14s", centi: "1.56s" },
                    { legs: "3", phase: "30\u00B0", mill: "1.05s", centi: "0.00s" },
                    { legs: "3", phase: "60\u00B0", mill: "0.00s", centi: "0.00s" },
                    { legs: "3", phase: "90\u00B0", mill: "1.56s", centi: "1.56s" },
                    { legs: "4", phase: "0\u00B0", mill: "3.14s", centi: "1.56s" },
                    { legs: "4", phase: "30\u00B0", mill: "0.52s", centi: "0.00s" },
                    { legs: "4", phase: "60\u00B0", mill: "0.00s", centi: "0.00s" },
                    { legs: "4", phase: "90\u00B0", mill: "1.56s", centi: "1.56s" },
                    { legs: "5", phase: "0\u00B0", mill: "3.14s", centi: "1.56s" },
                    { legs: "5", phase: "30\u00B0", mill: "0.00s", centi: "0.00s" },
                    { legs: "5", phase: "60\u00B0", mill: "0.00s", centi: "0.00s" },
                    { legs: "5", phase: "90\u00B0", mill: "1.56s", centi: "1.56s" },
                    { legs: "6", phase: "0\u00B0", mill: "3.14s", centi: "1.56s" },
                    { legs: "6", phase: "30\u00B0", mill: "0.00s", centi: "0.00s" },
                    { legs: "6", phase: "60\u00B0", mill: "0.00s", centi: "0.00s" },
                    { legs: "6", phase: "90\u00B0", mill: "1.56s", centi: "1.56s" },
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
            <Figure src={ALL_FIGURES[31].src} alt={ALL_FIGURES[31].alt} caption={ALL_FIGURES[31].caption} figNum={ALL_FIGURES[31].figNum} onClick={() => openLightbox(31)} />
            <Figure src={ALL_FIGURES[32].src} alt={ALL_FIGURES[32].alt} caption={ALL_FIGURES[32].caption} figNum={ALL_FIGURES[32].figNum} onClick={() => openLightbox(32)} />
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
          <p>
            The development process with Simscape involved uploading the Fusion 360 bodies to Onshape.com
            and creating joint assemblies uploaded to Matlab.
          </p>
          <p>
            The second generation removed the rotating component and simulated motion without that
            contact point, resulting in an inaccurate simulation.
          </p>
        </div>

        <FadeIn>
          <Figure src={ALL_FIGURES[33].src} alt={ALL_FIGURES[33].alt} caption={ALL_FIGURES[33].caption} figNum={ALL_FIGURES[33].figNum} onClick={() => openLightbox(33)} className="mb-8" />
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
          <p>
            The rotation of the leg is controlled by angular position values. The gait switcher adds
            a simple user interface for changing left and right leg ninety degrees out-of-phase.
          </p>
          <p>
            A revolute joint and slider control the rotating arm constrained by a cam shape. A foot
            is attached to either side of the leg with four contact points for measuring ground contact.
          </p>
          <p>
            Though features like exact body shape and center of gravity are not included, they are
            trivial to add in future work.
          </p>
        </div>

        <FadeIn>
          <FigureGrid cols={3}>
            <Figure src={ALL_FIGURES[34].src} alt={ALL_FIGURES[34].alt} caption={ALL_FIGURES[34].caption} figNum={ALL_FIGURES[34].figNum} onClick={() => openLightbox(34)} />
            <Figure src={ALL_FIGURES[35].src} alt={ALL_FIGURES[35].alt} caption={ALL_FIGURES[35].caption} figNum={ALL_FIGURES[35].figNum} onClick={() => openLightbox(35)} />
            <Figure src={ALL_FIGURES[36].src} alt={ALL_FIGURES[36].alt} caption={ALL_FIGURES[36].caption} figNum={ALL_FIGURES[36].figNum} onClick={() => openLightbox(36)} />
          </FigureGrid>
        </FadeIn>

        <FadeIn>
          <Figure src={ALL_FIGURES[37].src} alt={ALL_FIGURES[37].alt} caption={ALL_FIGURES[37].caption} figNum={ALL_FIGURES[37].figNum} onClick={() => openLightbox(37)} className="mb-8" />
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
                <VideoCard key={video.label} src={video.src} label={video.label} />
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
              <Figure src={ALL_FIGURES[38].src} alt={ALL_FIGURES[38].alt} caption={ALL_FIGURES[38].caption} figNum={ALL_FIGURES[38].figNum} onClick={() => openLightbox(38)} />
              <Figure src={ALL_FIGURES[39].src} alt={ALL_FIGURES[39].alt} caption={ALL_FIGURES[39].caption} figNum={ALL_FIGURES[39].figNum} onClick={() => openLightbox(39)} />
            </FigureGrid>
          </FadeIn>

          <FadeIn>
            <FigureGrid>
              <Figure src={ALL_FIGURES[40].src} alt={ALL_FIGURES[40].alt} caption={ALL_FIGURES[40].caption} figNum={ALL_FIGURES[40].figNum} onClick={() => openLightbox(40)} />
              <Figure src={ALL_FIGURES[41].src} alt={ALL_FIGURES[41].alt} caption={ALL_FIGURES[41].caption} figNum={ALL_FIGURES[41].figNum} onClick={() => openLightbox(41)} />
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

          {/* 4.3.1 Conclusion on Simulation */}
          <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3 mt-8">
            4.3.1 Conclusion on Simulation
          </h4>
          <div className="prose-custom mb-6">
            <p>
              The analysis between the kinematics and the Matlab simulation corroborate the conclusion
              that centipede locomotion with neighboring legs 60&deg; out of phase provides the most
              stable system. The simulation environment is capable of measuring torque on each leg
              actuation joint, the speed of the robot, and providing a test harness for different
              body shapes.
            </p>
          </div>
        </div>

        <ModelCard
          label="CAD MODEL — SIMULATION BODY"
          models={[
            { src: `${MEDIA}/ch4-simulation/models/body-segment-with-rotor.step`, name: "Body Segment + Rotor", format: "step" },
          ]}
        />
      </section>
    </FadeIn>
  );
}
