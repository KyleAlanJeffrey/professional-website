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
          <p>
            Before producing an omnipede robot, this chapter surveys the existing literature on
            millipede motion and derives a system of kinematic equations for modeling the movement
            of the Walker robot. The kinematic model describes the motion of omnipedes to be mimicked
            by Walker, independent of inertial considerations. Reviewing the academic literature did
            not reveal any system of dynamics equations for modeling these metachronal wave-based
            insects, so Chapter 4 considers the dynamics of motion using a 3D simulation developed
            in Matlab.
          </p>
        </div>

        <div className="prose-custom mb-8">
          <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
            2.1 Literature Review
          </h3>
          <p>
            Despite the simplicity of leg motion, the kinematics of the metachronal wave proves to
            be rather complex. The Myriapoda constantly shifts its metachronal gait to traverse
            diverse geography. Kano et al. developed a complicated multi-motor, multi-sensor robot
            but his approach focused on actuation through feedback rather than kinematic description.
            Creating a complex robot is beyond the scope of Walker. Since there exists no
            uncomplicated kinematic model for metachronal rhythm, the analysis is reduced to a
            primarily qualitative description.
          </p>
          <p>
            The kinematic model is based on three simplifying assumptions from Sathirapongsasuti et al.:
            the number of leg segments is one, every leg shares a common motion pattern, and the tip
            of each leg traces a <strong>circle of reference</strong>. When walking on a surface, this circle
            is trimmed to a segment, creating a cycloid trajectory split into two distinct phases.
          </p>
          <p>
            As described in Section 1.3.1, the legs of a millipede can be modeled on a two-dimensional
            plane and assumed to maintain the same trajectory. Other studies explored this reductive
            model and garnered working locomotive robotic systems. This simplified kinematic system
            is shown to be effective by Koh et al., Garcia, and Long et al.
          </p>
        </div>

        <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3">
          2.1.1 Kinematics of Leg Motion
        </h4>
        <div className="prose-custom mb-8">
          <p>
            The model rests on three simplifying assumptions from Sathirapongsasuti et al.:
          </p>
          <ol className="list-decimal list-inside space-y-1 mb-4 text-gray-700 dark:text-gray-300">
            <li>The number of millipede leg segments is one</li>
            <li>Every leg shares a common motion pattern</li>
            <li>The tip of each leg traces out a circle (circle of reference)</li>
          </ol>
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
          <p>
            This model for the leg trajectory is standard in bio-inspired robot design and is often
            used in robotics to describe any poly-pedal system. The half-circle trajectory of the
            foot traces out a cycloid when moving forward.
          </p>
          <p>
            The time phase between adjacent legs is &tau;<sub>t</sub> = d / V<sub>wave</sub>. The
            relationship between transfer and propulsive periods determines most characteristics
            once the reference circle radius is set.
          </p>
        </div>

        <GlassCard
          label="EQUATIONS OF MOTION"
          caption="Core kinematic equations derived from the circle-of-reference model. R is the reference circle radius, &theta; is the arc angle, and t_T / t_p are the transfer and propulsive period durations."
        >
          <div className="space-y-3">
            {[
              { lhs: "V_wave", rhs: "\u03B8R / t_T" },
              { lhs: "V_millipede", rhs: "2R\u00B7sin(\u03B8/2) / t_p" },
              { lhs: "T", rhs: "t_T + t_p" },
              { lhs: "H", rhs: "R \u2212 R\u00B7cos(\u03B8/2)" },
              { lhs: "\u03C9", rhs: "\u03B8 / (2R\u00B7sin(\u03B8/2) \u00B7 T \u00B7 V_millipede)" },
              { lhs: "D", rhs: "t_t / t_p  (duty cycle)" },
            ].map((eq) => (
              <div key={eq.lhs} className="flex items-center gap-3 font-mono text-sm text-gray-800 dark:text-gray-200">
                <span className="w-28 text-right font-bold text-indigo-600 dark:text-indigo-400">{eq.lhs}</span>
                <span className="text-gray-400">=</span>
                <span>{eq.rhs}</span>
              </div>
            ))}
          </div>
        </GlassCard>

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
            Garcia et al. showed that the metachronal gait specific to millipedes makes them highly
            capable of burrowing. Kano et al. also studied metachronal wave characteristics, focusing
            on bio-sensory feedback systems.
          </p>
          <p>
            The metachronal wave can be modulated for different purposes. Higher duty cycles increase
            the number of legs on the ground at any time, generating more thrust &mdash; Garcia noted this
            is the mode used during burrowing. Lower duty cycles reduce ground contact time per leg,
            increasing stride frequency and speed. The lower duty cycle gait creates greater velocities
            for the millipede, in contrast to the higher duty cycle gait that produces greater thrust
            and lower speed. This modulation is achieved purely by varying the
            duty cycle parameter, making it straightforward to implement in a robotic system with
            a single control variable per leg pair.
          </p>
        </div>
      </section>
    </FadeIn>
  );
}
