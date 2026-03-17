"use client";

import { ALL_FIGURES, MEDIA } from "../components/figures";
import { FadeIn, Figure, FigureGrid, GlassCard, VideoCard } from "../components/ui";

export default function Chapter1({ openLightbox }: { openLightbox: (i: number) => void }) {
  return (
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
            <p>
              These many-legged insects cross diverse habitats and present a simple, easy to emulate,
              and highly modular body structure. My research expands upon present analytical literature
              on the locomotive mechanisms of millipedes and centipedes as robotic inspiration.
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
              Several researchers have explored multi-legged robots inspired by myriapods. Key sources
              that informed this work include:
            </p>
            <ol className="list-decimal list-inside space-y-2 my-4">
              <li>
                <strong>&ldquo;Millipede-Inspired Locomotion for Rumen Monitoring through Remotely Operated Vehicle&rdquo;</strong> by Garcia [7]
              </li>
              <li>
                <strong>&ldquo;Centipede Robot for Uneven Terrain Exploration&rdquo;</strong> by Koh et al. [10]
              </li>
              <li>
                <strong>&ldquo;Decentralized control mechanism underlying interlimb coordination of millipedes&rdquo;</strong> by Kano et al. [9]
              </li>
              <li>
                <strong>&ldquo;The Kinematic Design of the OmniPede&rdquo;</strong> by Long et al. [11]
              </li>
            </ol>
            <p>
              Garcia provided an extensive analysis of millipede gait kinematics, validating the cycloid trajectory
              model through After Effects video tracking of live specimens. Koh et al. developed
              a centipede robot for uneven terrain exploration using multiple servos per segment.
              Kano et al. investigated decentralized control mechanisms underlying interlimb
              coordination. Long et al. designed the OmniPede using geared bar mechanisms
              for leg actuation. Each of these designs, however, required multiple actuators per segment,
              increasing cost and complexity.
            </p>
            <p>
              Garcia&apos;s personal correspondence was an excellent source of guidance, and his 2015
              dissertation was the primary source for millipede locomotion investigation. His After
              Effects-based analysis of live millipede footage demonstrated that leg tips trace a circular
              arc during the transfer phase, providing the kinematic foundation that Walker&apos;s design
              builds upon.
            </p>
          </div>
        </div>

        {/* 1.3 Characteristics of a Millipede */}
        <div id="ch1-characteristics" className="scroll-mt-20 mb-8">
          <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
            1.3 Characteristics of a Millipede
          </h3>
          <div className="prose-custom">
            <p>
              Throughout the paper, the Myriapoda is referred to when referencing the insect species.
              The term omnipede is a placeholder for all abstracted robots that imitate the Myriapoda.
            </p>
            <p>
              Myriapoda translates to &ldquo;many-legged ones&rdquo; and encompasses both millipedes
              (Diplopoda) and centipedes (Chilopoda). Foundational surveys by Manton, Hopkin et al.,
              Wilson, and Minelli provide the biological basis for understanding myriapod locomotion
              and anatomy.
            </p>
          </div>

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
            <p>
              With many segments across a single leg, the trajectory of each leg occurs across all
              three positional axes. In other words, a single motor-controlled actuator cannot precisely
              emulate the trajectory. Notwithstanding, the trajectory can be mostly represented with
              simple kinematic equations.
            </p>
          </div>

          <FigureGrid cols={3}>
            <Figure src={ALL_FIGURES[1].src} alt={ALL_FIGURES[1].alt} caption={ALL_FIGURES[1].caption} figNum={ALL_FIGURES[1].figNum} onClick={() => openLightbox(1)} />
            <Figure src={ALL_FIGURES[2].src} alt={ALL_FIGURES[2].alt} caption={ALL_FIGURES[2].caption} figNum={ALL_FIGURES[2].figNum} onClick={() => openLightbox(2)} />
            <Figure src={ALL_FIGURES[4].src} alt={ALL_FIGURES[4].alt} caption={ALL_FIGURES[4].caption} figNum={ALL_FIGURES[4].figNum} onClick={() => openLightbox(4)} />
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
            <p>
              Manton recognized gait shift in backstroke/forward-stroke analysis. Garcia found that the
              duty cycle is the same across all legs and that the millipede does little to change angular
              velocity. The 6:4 ratio represents the time legs spend in forward stroke to backstroke.
              The phase difference between neighboring legs is also affected by duty cycle shift.
            </p>
          </div>

          <FigureGrid>
            <Figure src={ALL_FIGURES[3].src} alt={ALL_FIGURES[3].alt} caption={ALL_FIGURES[3].caption} figNum={ALL_FIGURES[3].figNum} onClick={() => openLightbox(3)} />
            <Figure src={ALL_FIGURES[5].src} alt={ALL_FIGURES[5].alt} caption={ALL_FIGURES[5].caption} figNum={ALL_FIGURES[5].figNum} onClick={() => openLightbox(5)} />
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
            <p>
              The entirety of its gait modulation is due to the characteristics of the metachronal wave
              propagating through its legs. Considering that the millipede maintains a rigid body structure
              throughout its gait and can maneuver across varied environments, it presents a system with
              great potential for robotic emulation.
            </p>
          </div>

          <FigureGrid>
            <Figure src={ALL_FIGURES[0].src} alt={ALL_FIGURES[0].alt} caption={ALL_FIGURES[0].caption} figNum={ALL_FIGURES[0].figNum} onClick={() => openLightbox(0)} />
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
                  <VideoCard key={video.label} src={video.src} label={video.label} />
                ))}
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </section>
    </FadeIn>
  );
}
