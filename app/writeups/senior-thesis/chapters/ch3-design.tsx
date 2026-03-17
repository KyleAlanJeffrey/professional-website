"use client";

import { ALL_FIGURES, MEDIA } from "../components/figures";
import { FadeIn, Figure, FigureGrid, GlassCard, VideoCard, ModelCard } from "../components/ui";

export default function Chapter3({ openLightbox }: { openLightbox: (i: number) => void }) {
  return (
    <FadeIn>
      <section id="ch3" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
          <span className="text-indigo-500 dark:text-indigo-400">3.</span> Design
        </h2>
        <div className="h-1 w-16 bg-indigo-500 dark:bg-indigo-400 rounded mb-8" />

        <div className="prose-custom mb-8">
          <p>
            The broad design goal of Walker is to create a straightforward simplified omnipede robot. Due to
            the limitations driven by the <strong>COVID-19 pandemic</strong>, research avoided development beyond
            leg mechanisms. This chapter is dedicated entirely to researching leg mechanisms as a basis for
            the Walker robot build and simulation.
          </p>
          <p>
            To create a simple millipede-like robot, a novel and reproducible leg is necessary. Existing leg
            actuators in the academic literature were analyzed, improved upon, and 3D modeled in Fusion 360
            for manufacturing analysis. The design goals were: a single actuated leg with <strong>one degree
            of freedom</strong>, minimized individual parts to fewer than three, and a foot path creating
            the half-circle trajectory described in the kinematic model.
          </p>
          <p>
            The scoring rubric compares the number of parts, whether the device creates the desired trajectory,
            and a non-rigorous fault score for additional issues. Parts score: 5 if fewer than 3 parts, minus 1
            per additional part. Trajectory score: flat 5 if the desired half-circle is met, 0 otherwise.
            The categories are summed and then the fault score is subtracted.
          </p>
        </div>

        {/* Existing designs survey */}
        <FadeIn>
          <Figure src={ALL_FIGURES[11].src} alt={ALL_FIGURES[11].alt} caption={ALL_FIGURES[11].caption} figNum={ALL_FIGURES[11].figNum} onClick={() => openLightbox(11)} className="mb-8" />
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
                <VideoCard key={video.label} src={video.src} label={video.label} />
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
              The first mechanism is derived from Long et al., with similarities to 4-link and 5-link drive
              mechanisms. The benefit of this construction is its simple <strong>two-gear, single-motor</strong> design.
              Assuming constant angular velocity &omega;, the angular position of the drive gear
              is &theta;(t) = &omega;t. Each gear has a peg distance d from the gear&apos;s radius, with the
              leg position P derived from the peg positions C&#8321; and C&#8322;.
            </p>
            <p>
              Trajectory analysis with leg length L = 5 revealed significant deviation from the desired
              half-circle path. A longer leg length results in a flatter curve during the propulsive state,
              but the shape still doesn&apos;t meet the desired trajectory. All parts were 3D printed,
              restricting contours smaller than 0.5mm &mdash; greatly reducing the number of teeth
              these gears can possess. For this reason, the fault score is &minus;2 points.
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
            <Figure src={ALL_FIGURES[12].src} alt={ALL_FIGURES[12].alt} caption={ALL_FIGURES[12].caption} figNum={ALL_FIGURES[12].figNum} onClick={() => openLightbox(12)} />
            <Figure src={ALL_FIGURES[13].src} alt={ALL_FIGURES[13].alt} caption={ALL_FIGURES[13].caption} figNum={ALL_FIGURES[13].figNum} onClick={() => openLightbox(13)} />
            <Figure src={ALL_FIGURES[14].src} alt={ALL_FIGURES[14].alt} caption={ALL_FIGURES[14].caption} figNum={ALL_FIGURES[14].figNum} onClick={() => openLightbox(14)} />
          </FigureGrid>
        </div>

        {/* 3.1.2 Cam Designs */}
        <div id="ch3-cam" className="scroll-mt-20 mb-12">
          <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
            3.1.2 Cam Designs
          </h3>
          <div className="prose-custom mb-4">
            <p>
              Garcia et al. derives a cam actuator based on the design suggested by Wan &amp; Song, which
              defines a cam shape that creates a half-circle trajectory. This cam design was also investigated
              by Crow in a mechanical engineering dissertation. Garcia&apos;s design modifies the Wan &amp; Song
              design in favor of a single rotating leg, while Crow follows the original actuator more closely.
              Due to the complexity of the cam shape, I first developed an original mechanism inspired by
              Garcia&apos;s design.
            </p>
          </div>

          {/* Custom Sliding Cam */}
          <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3">
            3.1.2.1 Custom Sliding Cam
          </h4>
          <div className="prose-custom mb-4">
            <p>
              This device was developed myself. The mechanism is an intuitive design that translates the
              trajectory path of the inner cam shape down by the length of the leg &mdash; the cam shape is
              the exact trajectory of the foot, translated by the leg length. The device can support a leg of
              any length and a cam of any shape, given low jerk (no curves too sharp), making it exceptionally
              intuitive to get the desired trajectory without much calculation.
            </p>
            <p>
              The pitfalls include <strong>excessive friction points</strong> &mdash; the sliding joint and the peg that
              fits into the cam shape are two major friction sources. Secondly, a large amount of torque is
              pressed on the pin slot if the interior cam shape is too narrow. These combined factors lead to a
              fault score of &minus;3. With 4 parts vs. the target of fewer than 3, other actuation devices
              were investigated.
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
            <Figure src={ALL_FIGURES[15].src} alt={ALL_FIGURES[15].alt} caption={ALL_FIGURES[15].caption} figNum={ALL_FIGURES[15].figNum} onClick={() => openLightbox(15)} />
            <Figure src={ALL_FIGURES[16].src} alt={ALL_FIGURES[16].alt} caption={ALL_FIGURES[16].caption} figNum={ALL_FIGURES[16].figNum} onClick={() => openLightbox(16)} />
            <Figure src={ALL_FIGURES[17].src} alt={ALL_FIGURES[17].alt} caption={ALL_FIGURES[17].caption} figNum={ALL_FIGURES[17].figNum} onClick={() => openLightbox(17)} />
          </FigureGrid>

          {/* Fixed Bearing Cam (Wan & Song) */}
          <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3 mt-8">
            3.1.2.2 Fixed Bearing Cam (Wan &amp; Song) &mdash; Winner
          </h4>
          <div className="prose-custom mb-4">
            <p>
              The third and final mechanism is the most closely related implementation of the cam design
              from Wan &amp; Song. The assembly includes a rotating link with bearings at a fixed distance
              and a sliding joint with leg attachment. The cam shape maintains a constant width d through
              rotation and is symmetrical about the Y axis &mdash; a single function f(&theta;) describing the
              shape from 0&deg; to 90&deg; defines the entire profile.
            </p>
            <p>
              The cam profile is derived from: since the upper half creates a straight-line trajectory at
              height &minus;H, we get R = &minus;H/sin(&theta;), and
              S&#8321; = f(&theta;) = (L + d)/2 &minus; H/sin(&theta;). The minimum theoretical angle
              &lambda; = arcsin(2H/(L+d)) defines where the function goes to negative infinity.
            </p>
            <p>
              Crow finds that choosing an angular span of <strong>60&deg;</strong> maximizes the axle
              height H, bearing width d, and span. Initial parameters were H = 0.43L, d = 0.195L, but
              the initial curve fittings produced shapes too sharp at &theta; = 90&deg;. To reduce this jerk motion,
              a wider diameter of d = 0.4L was determined through trial and error. Crow&apos;s axle height
              and bearing width values were a point of reference, but further iterative analysis on Matlab
              yielded the final values.
            </p>
            <p>
              To smoothly connect the upper and lower cam profile, polynomial spline interpolation is required.
              Wan &amp; Song suggests a sixth-order polynomial; Crow uses a fourth-order. The final design uses
              <strong>Makima polynomial spline</strong> interpolation for smooth transitions. Unlike the original proposed
              shape, the final design removes the exterior follower wall in favor of a single interior cam shape
              with a rotating armature. The mechanism&apos;s only fault is the torque forces near the vertical
              position, garnering a fault score of &minus;1.
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
            <Figure src={ALL_FIGURES[18].src} alt={ALL_FIGURES[18].alt} caption={ALL_FIGURES[18].caption} figNum={ALL_FIGURES[18].figNum} onClick={() => openLightbox(18)} />
            <Figure src={ALL_FIGURES[19].src} alt={ALL_FIGURES[19].alt} caption={ALL_FIGURES[19].caption} figNum={ALL_FIGURES[19].figNum} onClick={() => openLightbox(19)} />
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
              <Figure src={ALL_FIGURES[20].src} alt={ALL_FIGURES[20].alt} caption={ALL_FIGURES[20].caption} figNum={ALL_FIGURES[20].figNum} onClick={() => openLightbox(20)} />
              <Figure src={ALL_FIGURES[23].src} alt={ALL_FIGURES[23].alt} caption={ALL_FIGURES[23].caption} figNum={ALL_FIGURES[23].figNum} onClick={() => openLightbox(23)} />
            </div>
          </FadeIn>

          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <Figure src={ALL_FIGURES[25].src} alt={ALL_FIGURES[25].alt} caption={ALL_FIGURES[25].caption} figNum={ALL_FIGURES[25].figNum} onClick={() => openLightbox(25)} />
              <Figure src={ALL_FIGURES[27].src} alt={ALL_FIGURES[27].alt} caption={ALL_FIGURES[27].caption} figNum={ALL_FIGURES[27].figNum} onClick={() => openLightbox(27)} />
              <Figure src={ALL_FIGURES[30].src} alt={ALL_FIGURES[30].alt} caption={ALL_FIGURES[30].caption} figNum={ALL_FIGURES[30].figNum} onClick={() => openLightbox(30)} />
            </div>
          </FadeIn>

          <FadeIn>
            <FigureGrid>
              <Figure src={ALL_FIGURES[28].src} alt={ALL_FIGURES[28].alt} caption={ALL_FIGURES[28].caption} figNum={ALL_FIGURES[28].figNum} onClick={() => openLightbox(28)} />
              <Figure src={ALL_FIGURES[29].src} alt={ALL_FIGURES[29].alt} caption={ALL_FIGURES[29].caption} figNum={ALL_FIGURES[29].figNum} onClick={() => openLightbox(29)} />
            </FigureGrid>
          </FadeIn>
        </div>

        {/* 3.2 Conclusion */}
        <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4 mt-8">
          3.2 Conclusion
        </h3>
        <div className="prose-custom mb-6">
          <p>
            The design evolution progressed from Long&apos;s geared bar mechanism through an original
            sliding cam to the final Wan &amp; Song fixed bearing cam. The final 3D model is robust
            yet straightforward &mdash; the mechanism creates the desired half-circle foot trajectory, the
            number of separate parts is 3 (pegs are considered part of the leg), overall friction is decreased,
            and the parts are large enough that print resolution can be coarse (&gt; 0.5mm).
          </p>
        </div>

        {/* Final score matrix — Table 3.3 */}
        <GlassCard label="TABLE 3.3 — FINAL LEG ACTUATOR SCORE MATRIX">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="text-left px-4 py-2 font-mono font-bold text-gray-600 dark:text-gray-300">Design</th>
                  <th className="text-center px-4 py-2 font-mono font-bold text-gray-600 dark:text-gray-300">Parts</th>
                  <th className="text-center px-4 py-2 font-mono font-bold text-gray-600 dark:text-gray-300">Trajectory</th>
                  <th className="text-center px-4 py-2 font-mono font-bold text-gray-600 dark:text-gray-300">Faults</th>
                  <th className="text-center px-4 py-2 font-mono font-bold text-gray-600 dark:text-gray-300">Overall</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black/5 dark:border-white/5">
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Gear Mechanism (Long)</td>
                  <td className="px-4 py-2 text-center font-mono text-gray-600 dark:text-gray-400">3</td>
                  <td className="px-4 py-2 text-center font-mono text-red-400">No</td>
                  <td className="px-4 py-2 text-center font-mono text-red-400">&minus;2</td>
                  <td className="px-4 py-2 text-center font-mono text-gray-600 dark:text-gray-400">5/10</td>
                </tr>
                <tr className="border-b border-black/5 dark:border-white/5">
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Slide Cam (Original)</td>
                  <td className="px-4 py-2 text-center font-mono text-gray-600 dark:text-gray-400">4</td>
                  <td className="px-4 py-2 text-center font-mono text-emerald-500">Yes</td>
                  <td className="px-4 py-2 text-center font-mono text-red-400">&minus;3</td>
                  <td className="px-4 py-2 text-center font-mono text-gray-600 dark:text-gray-400">6/10</td>
                </tr>
                <tr className="border-b border-indigo-100/60 dark:border-indigo-400/10 bg-indigo-50/30 dark:bg-indigo-500/5">
                  <td className="px-4 py-2 font-bold text-gray-900 dark:text-white">Cam Mechanism (Wan &amp; Song)</td>
                  <td className="px-4 py-2 text-center font-mono text-gray-600 dark:text-gray-400">3</td>
                  <td className="px-4 py-2 text-center font-mono text-emerald-500">Yes</td>
                  <td className="px-4 py-2 text-center font-mono text-red-400">&minus;1</td>
                  <td className="px-4 py-2 text-center font-mono font-bold text-indigo-600 dark:text-indigo-400">9/10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>

        <ModelCard
          label="CAD MODELS — FINAL DESIGNS"
          models={[
            { src: `${MEDIA}/ch3-design/models/wan-song-cam-final.step`, name: "Wan & Song Cam — Final", format: "step" },
            { src: `${MEDIA}/ch3-design/models/full-assembly.step`, name: "Full Assembly", format: "step" },
          ]}
        />
      </section>
    </FadeIn>
  );
}
