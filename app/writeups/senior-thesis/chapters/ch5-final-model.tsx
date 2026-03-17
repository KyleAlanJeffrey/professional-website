"use client";

import { ALL_FIGURES, MEDIA } from "../components/figures";
import { FadeIn, Figure, FigureGrid, GlassCard, VideoCard } from "../components/ui";

export default function Chapter5({ openLightbox }: { openLightbox: (i: number) => void }) {
  return (
    <FadeIn>
      <section id="ch5" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
          <span className="text-indigo-500 dark:text-indigo-400">5.</span> Final Model &amp; Conclusions
        </h2>
        <div className="h-1 w-16 bg-indigo-500 dark:bg-indigo-400 rounded mb-8" />

        {/* Chapter intro */}
        <div className="prose-custom mb-6">
          <p>
            Two design iterations were printed and attached to an Antrader Dual Shaft 3-6V Motor for testing.
          </p>
        </div>

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
          <p>
            To reduce print time, the interiors of the shapes contained several cardboard-like edges,
            in place of a complete infill, which negligibly affected stability.
          </p>
        </div>

        <FadeIn>
          <FigureGrid>
            <Figure src={ALL_FIGURES[42].src} alt={ALL_FIGURES[42].alt} caption={ALL_FIGURES[42].caption} figNum={ALL_FIGURES[42].figNum} onClick={() => openLightbox(42)} />
            <Figure src={ALL_FIGURES[43].src} alt={ALL_FIGURES[43].alt} caption={ALL_FIGURES[43].caption} figNum={ALL_FIGURES[43].figNum} onClick={() => openLightbox(43)} />
          </FigureGrid>
        </FadeIn>

        <FadeIn>
          <FigureGrid>
            <Figure src={ALL_FIGURES[44].src} alt={ALL_FIGURES[44].alt} caption={ALL_FIGURES[44].caption} figNum={ALL_FIGURES[44].figNum} onClick={() => openLightbox(44)} />
            <Figure src={ALL_FIGURES[45].src} alt={ALL_FIGURES[45].alt} caption={ALL_FIGURES[45].caption} figNum={ALL_FIGURES[45].figNum} onClick={() => openLightbox(45)} />
          </FigureGrid>
        </FadeIn>

        {/* 5.1.1 Conclusion on Print */}
        <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3 mt-8">
          5.1.1 Conclusion on Print
        </h4>
        <div className="prose-custom mb-6">
          <p>
            Other manufacturing processes could avoid the issues that printing created. Crow manufactured
            a similar device using metal, which might be more promising for build stability. Another approach
            would use multiple materials &mdash; 3D plastic for the cam, metal for the rotary arm and legs.
            Widening the base of the rotary arm shaft created a more stable connection. Rounding the contours
            improved print quality consistency. The only remaining design consideration is frictional contact
            between the leg ends and ground &mdash; cursory testing showed improvement with glued rubber pieces.
          </p>
        </div>

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
                  <img src={ALL_FIGURES[fi].src} alt={ALL_FIGURES[fi].alt} className="w-full h-auto" loading="lazy" />
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
            <p>
              Ideally, the relative angular position would be sensed with a quadrature encoder attached
              to the back arm of the motor. Kano&apos;s test environment mounted a motor above a conveyor
              belt capable of measuring thrust potential.
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
            <p>
              The test system is comprised of an Arduino Uno, a 10-spin potentiometer for angular
              position detection, and a potentiometer in a voltage divider circuit to control the
              speed of the DC motor.
            </p>
            <p>
              The trajectory was measured using After Effects motion tracking of slow-motion video.
              This motion data does not include any time data, as an iPhone 8s with custom slow-mo
              software captured the video. This issue hinders capturing angular velocity.
            </p>
          </div>

          <FadeIn>
            <FigureGrid>
              <Figure src={ALL_FIGURES[46].src} alt={ALL_FIGURES[46].alt} caption={ALL_FIGURES[46].caption} figNum={ALL_FIGURES[46].figNum} onClick={() => openLightbox(46)} />
              <Figure src={ALL_FIGURES[47].src} alt={ALL_FIGURES[47].alt} caption={ALL_FIGURES[47].caption} figNum={ALL_FIGURES[47].figNum} onClick={() => openLightbox(47)} />
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
            <p>
              After Effects motion-tracked a green dot on a piece of paper attached to the foot
              of the cam for one rotation.
            </p>
            <p>
              Analysis ignored velocity as tracking data returns position based on frame data,
              not time data, because of the custom iPhone slow-motion capture.
            </p>
            <p>
              Angle is determined with trigonometry: &theta; = arcsin(y_pos/x_pos).
            </p>
            <p>
              The home laboratory provides pixel data; the trajectory is normalized to the known
              leg length of 120mm.
            </p>
            <p>
              The maximum error of 4.6mm occurs between 70 to 120 degrees at the bottom of the
              foot trajectory. Minor improvements would include a better mounting surface and larger
              pegs &mdash; the pegs used were shorter than the cam width and tended to skew.
            </p>
          </div>

          <FadeIn>
            <FigureGrid>
              <Figure src={ALL_FIGURES[48].src} alt={ALL_FIGURES[48].alt} caption={ALL_FIGURES[48].caption} figNum={ALL_FIGURES[48].figNum} onClick={() => openLightbox(48)} />
              <Figure src={ALL_FIGURES[49].src} alt={ALL_FIGURES[49].alt} caption={ALL_FIGURES[49].caption} figNum={ALL_FIGURES[49].figNum} onClick={() => openLightbox(49)} />
            </FigureGrid>
          </FadeIn>

          <FadeIn>
            <FigureGrid cols={3}>
              <Figure src={ALL_FIGURES[50].src} alt={ALL_FIGURES[50].alt} caption={ALL_FIGURES[50].caption} figNum={ALL_FIGURES[50].figNum} onClick={() => openLightbox(50)} />
              <Figure src={ALL_FIGURES[51].src} alt={ALL_FIGURES[51].alt} caption={ALL_FIGURES[51].caption} figNum={ALL_FIGURES[51].figNum} onClick={() => openLightbox(51)} />
              <Figure src={ALL_FIGURES[52].src} alt={ALL_FIGURES[52].alt} caption={ALL_FIGURES[52].caption} figNum={ALL_FIGURES[52].figNum} onClick={() => openLightbox(52)} />
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

          <h5 className="text-lg font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3">
            5.2.4.1 Potentiometer
          </h5>
          <div className="prose-custom mb-6">
            <p>
              The <strong>potentiometer</strong> produced extremely noisy angular position data; even after applying
              80Hz and 15Hz low-pass filters, the signal remained too noisy for precise trajectory
              reconstruction.
            </p>
            <p>
              An attempt was made to reduce high frequency noise with an RC low pass filter as well
              as a running average.
            </p>
            <p>
              The 15Hz cutoff filter shows near linearity at turns below approximately 500 degrees.
              From a line of best fit, the approximate angular velocity is -395.325&deg;/second.
            </p>
          </div>

          <h5 className="text-lg font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3">
            5.2.4.2 IMU
          </h5>
          <div className="prose-custom mb-6">
            <p>
              The <strong>IMU (MPU9250)</strong> suffered from integration drift, making linear position data
              completely unusable for trajectory validation.
            </p>
            <p>
              An IMU was attached to a piece of long construction paper held below the mounted,
              rotating leg. When in contact, the leg pushed the paper like a conveyor belt.
            </p>
            <p>
              Using the accelerometer on the MPU9250 with the highest polling rate, integrated
              accelerometer data found the paper&apos;s position on a single axis
              (X_pos = &int;&int;&xdot;). However, integration of inaccurate data creates huge errors.
            </p>
            <p>
              The sensor was held on a level surface and slowly dragged forward and backward.
              Accurate data should return position to zero at origin, but inaccuracy prevents this.
            </p>
          </div>

          <FadeIn>
            <FigureGrid cols={3}>
              <Figure src={ALL_FIGURES[53].src} alt={ALL_FIGURES[53].alt} caption={ALL_FIGURES[53].caption} figNum={ALL_FIGURES[53].figNum} onClick={() => openLightbox(53)} />
              <Figure src={ALL_FIGURES[54].src} alt={ALL_FIGURES[54].alt} caption={ALL_FIGURES[54].caption} figNum={ALL_FIGURES[54].figNum} onClick={() => openLightbox(54)} />
              <Figure src={ALL_FIGURES[55].src} alt={ALL_FIGURES[55].alt} caption={ALL_FIGURES[55].caption} figNum={ALL_FIGURES[55].figNum} onClick={() => openLightbox(55)} />
            </FigureGrid>
          </FadeIn>

          <FadeIn>
            <FigureGrid>
              <Figure src={ALL_FIGURES[56].src} alt={ALL_FIGURES[56].alt} caption={ALL_FIGURES[56].caption} figNum={ALL_FIGURES[56].figNum} onClick={() => openLightbox(56)} />
              <Figure src={ALL_FIGURES[57].src} alt={ALL_FIGURES[57].alt} caption={ALL_FIGURES[57].caption} figNum={ALL_FIGURES[57].figNum} onClick={() => openLightbox(57)} />
            </FigureGrid>
          </FadeIn>

          {/* 5.2.5 Simulation vs Actual */}
          <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3 mt-8">
            5.2.5 Simulation vs. Actual
          </h4>
          <div className="prose-custom mb-6">
            <p>
              Despite the sensor failures, the After Effects trajectory analysis provided sufficient
              validation. The simulation was confirmed, and the device functions within a negligible
              margin of its intended design.
            </p>
            <p>
              Fig 5.14 shows a cursory observation of angular position vs time. The frame rate of
              the camera might be variable, so this data should not be considered with complete
              confidence. The simulation data is linear while the actual device drifts from linearity.
              Testing captured these data sets while the mechanism was suspended in the air, restricting
              any ground contact.
            </p>
          </div>

          <FadeIn>
            <Figure src={ALL_FIGURES[58].src} alt={ALL_FIGURES[58].alt} caption={ALL_FIGURES[58].caption} figNum={ALL_FIGURES[58].figNum} onClick={() => openLightbox(58)} className="mb-8" />
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
                  <VideoCard key={video.label} src={video.src} label={video.label} />
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
              In the observation of millipede vs. centipede locomotion through a literature review,
              studies like Manton, Garcia et al., and Kano et al. investigated the thrust potential
              of the former and the speed of the latter.
            </p>
            <p>
              The simulation proved that centipede-like locomotion with 60&deg; phase offset provides
              optimal stability, while the 3D-printed cam mechanism achieved the designed half-circle
              foot trajectory with only 4.6mm maximum error. The entire project was completed at home
              during the COVID-19 pandemic, demonstrating that meaningful robotics research can be
              conducted with accessible tools.
            </p>
            <p>
              Crow&apos;s design lacked the double-sided leg of the source paper, as well as any simulation.
              In the future, this actuator could replace bulky multi-motored locomotive systems not
              limited to just millipede motion.
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
  );
}
