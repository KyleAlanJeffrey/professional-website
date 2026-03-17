"use client";

import { ALL_FIGURES } from "../components/figures";
import { FadeIn, Figure, FigureGrid, GlassCard } from "../components/ui";

export default function Chapter2({ openLightbox }: { openLightbox: (i: number) => void }) {
  return (
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
          <Figure src={ALL_FIGURES[6].src} alt={ALL_FIGURES[6].alt} caption={ALL_FIGURES[6].caption} figNum={ALL_FIGURES[6].figNum} onClick={() => openLightbox(6)} />
          <Figure src={ALL_FIGURES[9].src} alt={ALL_FIGURES[9].alt} caption={ALL_FIGURES[9].caption} figNum={ALL_FIGURES[9].figNum} onClick={() => openLightbox(9)} />
        </FigureGrid>

        <FigureGrid cols={3}>
          <Figure src={ALL_FIGURES[7].src} alt={ALL_FIGURES[7].alt} caption={ALL_FIGURES[7].caption} figNum={ALL_FIGURES[7].figNum} onClick={() => openLightbox(7)} />
          <Figure src={ALL_FIGURES[8].src} alt={ALL_FIGURES[8].alt} caption={ALL_FIGURES[8].caption} figNum={ALL_FIGURES[8].figNum} onClick={() => openLightbox(8)} />
          <Figure src={ALL_FIGURES[10].src} alt={ALL_FIGURES[10].alt} caption={ALL_FIGURES[10].caption} figNum={ALL_FIGURES[10].figNum} onClick={() => openLightbox(10)} />
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
  );
}
