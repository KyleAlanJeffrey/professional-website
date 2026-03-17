"use client";

import { ALL_FIGURES, MEDIA } from "../components/figures";
import { FadeIn, Figure, FigureGrid, GlassCard, VideoCard } from "../components/ui";

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
            The primary design challenge was creating a leg actuator with three goals: <strong>one degree
            of freedom</strong>, fewer than three individual parts, and a foot path producing the half-circle
            trajectory defined by the kinematic model. Designs were evaluated with a scoring rubric:
            5 points if fewer than 3 parts (minus 1 per extra), 5 points if trajectory matches (0 otherwise),
            minus any fault deductions.
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
              Based on Long et al.&apos;s OmniPede, this design uses a <strong>two-gear, single-motor</strong> arrangement
              similar to a 4-bar linkage. While simple in concept (only 2 gears), trajectory analysis revealed
              significant deviation from the desired half-circle path. Furthermore, 3D printing gears with
              sufficient teeth resolution proved too difficult at the available print precision.
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

          {/* Custom Sliding Cam */}
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
  );
}
