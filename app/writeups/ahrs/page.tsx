"use client";

import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MEDIA = "/writeups/ahrs/media";

export default function AHRSWriteupPage() {
  const [mounted, setMounted] = useState(false);

  useState(() => {
    setMounted(true);
  });

  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0b0b] relative overflow-hidden">
      {/* Background decorations */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-20 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-sky-200/30 via-emerald-200/10 to-transparent blur-3xl dark:from-sky-500/10 dark:via-emerald-500/5" />
        <div className="absolute top-1/3 -right-48 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-amber-200/20 via-sky-200/10 to-transparent blur-3xl dark:from-amber-500/5 dark:via-sky-500/5" />
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
          <span className="text-xs text-sky-500 dark:text-sky-400 tracking-[0.3em] font-bold font-mono">
            AHRS
          </span>
        </div>
      </nav>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs text-sky-500 dark:text-sky-400 tracking-[0.3em] font-bold font-mono">
              UC SANTA CRUZ &middot; 2021
            </span>
            <div className="h-0.5 w-12 bg-sky-500 dark:bg-sky-400" />
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6"
            style={{ fontFamily: "monospace" }}
          >
            Attitude Estimation Using Complementary Feedback Filter
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mb-4">
            Using cheap sensors in fusion to solve the problem of attitude estimation &mdash;
            combining a gyroscope, accelerometer, and magnetometer into an Attitude Heading Reference System (AHRS).
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            B.S. Robotics Engineering &middot; Sensor Fusion &middot; Dept. of Electrical and Computer Engineering
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {["Sensor Fusion", "AHRS", "DCM", "IMU", "Complementary Filter", "MPU9250"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono font-bold tracking-wider rounded-full border border-sky-300/40 dark:border-sky-400/20 text-sky-600 dark:text-sky-400 bg-sky-50/50 dark:bg-sky-500/5"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="/writeups/ahrs/AHRS%20Writeup.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/20 dark:border-white/20 text-gray-700 dark:text-gray-300 text-sm font-mono font-bold tracking-wider hover:-translate-y-0.5 hover:shadow-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              DOWNLOAD PDF
            </a>
          </div>
        </header>

        {/* Abstract */}
        <section className="mb-16">
          <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
            Abstract
          </h2>
          <div className="prose-custom">
            <p>
              Estimation of rotation about the Earth is a common problem in aviation and other fields. The advent of the
              smartphone pushed the field of estimating orientation into the commercial realm, requiring cheaper solutions
              to a usually expensive problem. This paper deeply investigates using cheap sensors in fusion to solve the
              problem of attitude estimation.
            </p>
          </div>
        </section>

        {/* 1. Introduction */}
        <section className="mb-16">
          <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
            <span className="text-sky-500 dark:text-sky-400">1.</span> Introduction
          </h2>
          <div className="h-1 w-16 bg-sky-500 dark:bg-sky-400 rounded mb-8" />

          <div className="prose-custom mb-8">
            <p>
              An AHRS (Attitude Heading Reference System) is the combination of several sensors to measure the rotation
              of an object relative to a global coordinate frame. Consider an aircraft &mdash; it becomes necessary to
              describe its heading: is it pointing straight down? Is it level with the surface of the Earth? The
              &ldquo;attitude&rdquo; of an object describes its rotation in respect to some reference frame.
            </p>
          </div>

          <figure className="my-8">
            <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
              <img src={`${MEDIA}/0.png`} alt="AHRS Measurements" className="w-full h-auto" loading="lazy" />
            </div>
            <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              <span className="font-mono font-bold text-sky-500 dark:text-sky-400">Fig 1:</span> AHRS measurements &mdash; Roll (&phi;), Pitch (&theta;), Yaw (&psi;) relative to North/East/Down
            </figcaption>
          </figure>

          <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
            1.1 Referencing Earth
          </h3>
          <div className="prose-custom mb-8">
            <p>
              A <strong>magnetometer</strong>, <strong>accelerometer</strong>, and <strong>gyroscope</strong> sensor are
              used to create this system. The gyroscope is the primary sensor while the other two provide feedback. The
              accelerometer measures Earth&apos;s gravity and always has the information for &ldquo;down,&rdquo; and the
              magnetometer always points at North because of Earth&apos;s magnetic field.
            </p>
          </div>

          <figure className="my-8">
            <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
              <img src={`${MEDIA}/1.jpg`} alt="Fusion sensor diagram" className="w-full h-auto" loading="lazy" />
            </div>
            <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              <span className="font-mono font-bold text-sky-500 dark:text-sky-400">Fig 2:</span> Sensor fusion architecture &mdash; accelerometer, gyroscope, and magnetometer feed into complementary filters
            </figcaption>
          </figure>

          <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
            1.2 MPU9250 Sensor
          </h3>
          <div className="prose-custom mb-8">
            <p>
              The MPU9250 breakout board by SparkFun was used, combining a gyroscope, magnetometer, and accelerometer
              in a single package with simple communication protocols.
            </p>
          </div>

          <figure className="my-8 max-w-sm mx-auto">
            <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
              <img src={`${MEDIA}/2.jpg`} alt="MPU9250 board" className="w-full h-auto" loading="lazy" />
            </div>
            <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              <span className="font-mono font-bold text-sky-500 dark:text-sky-400">Fig 3:</span> MPU9250 breakout board by SparkFun
            </figcaption>
          </figure>
        </section>

        {/* 2. Storing the Rotation Angles */}
        <section className="mb-16">
          <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
            <span className="text-sky-500 dark:text-sky-400">2.</span> Storing the Rotation Angles
          </h2>
          <div className="h-1 w-16 bg-sky-500 dark:bg-sky-400 rounded mb-8" />

          <div className="prose-custom mb-8">
            <p>
              The rotation information is stored in a <strong>rotation matrix</strong>. Using linear algebra, this
              transformation matrix contains the relationship between the airplane&apos;s coordinate frame and the
              global coordinate frame:
            </p>
            <p className="font-mono text-center text-lg my-4">
              R = R<sub>yaw</sub> &middot; R<sub>pitch</sub> &middot; R<sub>roll</sub>
              <br />
              R : V&#8407;<sub>plane</sub> &rarr; V&#8407;<sub>global</sub>
            </p>
            <p>
              This is referred to as the <strong>Direct Cosine Matrix (DCM)</strong> &mdash; standard nomenclature in
              attitude estimation.
            </p>
          </div>

          <figure className="my-8 max-w-md mx-auto">
            <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
              <img src={`${MEDIA}/3.png`} alt="Pitch, roll, yaw axes" className="w-full h-auto" loading="lazy" />
            </div>
            <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              <span className="font-mono font-bold text-sky-500 dark:text-sky-400">Fig 4:</span> Body frame axes &mdash; pitch, roll, and yaw
            </figcaption>
          </figure>

          <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
            2.1 The DCM
          </h3>
          <div className="prose-custom">
            <p>
              The DCM is a 3&times;3 transformation matrix based on pitch (&phi;), roll (&theta;), and yaw (&psi;)
              provided by the sensors. It contains all important information about the body frame and inertial frame,
              and is the transformation between the two. The inertial frame is based on cardinal directions (North,
              East, South, West), while the body frame is the perspective of the sensors.
            </p>
            <p>
              The DCM connects spatial coordinates to angular ones. Matrix transformations are <strong>order
              dependent</strong> (ABC &ne; CBA). This implementation applies transformations in pitch, roll, yaw
              order &mdash; rotation around the x, y, then z axis.
            </p>
          </div>
        </section>

        {/* 3. Getting the Rotation Angles */}
        <section className="mb-16">
          <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
            <span className="text-sky-500 dark:text-sky-400">3.</span> Getting the Rotation Angles
          </h2>
          <div className="h-1 w-16 bg-sky-500 dark:bg-sky-400 rounded mb-8" />

          <div className="prose-custom mb-8">
            <p>
              Each sensor contributes different information to the attitude estimation:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                name: "Accelerometer",
                color: "emerald",
                points: [
                  "Measures acceleration in x, y, z",
                  "Always measures gravity",
                  "Gives pitch and roll information",
                  "No yaw information",
                ],
              },
              {
                name: "Gyroscope",
                color: "sky",
                points: [
                  "Tracks rate of change of rotation",
                  "Integrate to get angle",
                  "Primary sensor in fusion",
                  "Tracks from starting position",
                ],
              },
              {
                name: "Magnetometer",
                color: "amber",
                points: [
                  "Measures magnetic field",
                  "Always points to magnetic north",
                  "Gives yaw information",
                  "Affected by nearby magnets",
                ],
              },
            ].map((sensor) => (
              <div
                key={sensor.name}
                className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5"
              >
                <span className={`text-xs font-mono font-bold tracking-wider text-${sensor.color}-600 dark:text-${sensor.color}-400`}>
                  {sensor.name.toUpperCase()}
                </span>
                <ul className="mt-3 space-y-1.5">
                  {sensor.points.map((point) => (
                    <li key={point} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Integration of Constant Body-Fixed Rates */}
        <section className="mb-16">
          <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
            <span className="text-sky-500 dark:text-sky-400">4.</span> Integration of Body-Fixed Rates
          </h2>
          <div className="h-1 w-16 bg-sky-500 dark:bg-sky-400 rounded mb-8" />

          <div className="prose-custom mb-8">
            <p>
              Two techniques convert gyro velocity data (deg/s) into rotation position data (deg):
              <strong> (1) forward integration</strong> and <strong>(2) matrix exponential form</strong>.
              Forward integration in matrix form is:
            </p>
            <p className="font-mono text-center my-4">
              R<sup>+</sup> = R<sup>&minus;</sup> + [&omega;&#8407;&times;]R<sup>&minus;</sup>&Delta;t
            </p>
          </div>

          <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
            4.1 Forward Integration
          </h3>
          <div className="prose-custom mb-6">
            <p>
              Basic integration of gyro rotation rates using the skew symmetric &omega; matrix. With a simulated
              rotation rate of 1 deg/sec and polling rate of 1 Hz, the rotation appears stable for 45 degrees
              of rotation. However, the DCM <strong>doesn&apos;t maintain orthonormality</strong> over time &mdash;
              after nine revolutions, the x and y vectors are no longer unit vectors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            <figure>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
                <img src={`${MEDIA}/4.png`} alt="Simulated 45 degree rotation" className="w-full h-auto" loading="lazy" />
              </div>
              <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                <span className="font-mono font-bold text-sky-500 dark:text-sky-400">Fig 5:</span> Simulated 45&deg; rotation
              </figcaption>
            </figure>
            <figure>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
                <img src={`${MEDIA}/5.png`} alt="Drift after 9 revolutions" className="w-full h-auto" loading="lazy" />
              </div>
              <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                <span className="font-mono font-bold text-sky-500 dark:text-sky-400">Fig 6:</span> DCM drift &mdash; body frame vectors lose orthonormality after 9 revolutions
              </figcaption>
            </figure>
          </div>

          <h4 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mb-3">
            4.1.2 Experimental Forward Integration
          </h4>
          <div className="prose-custom mb-6">
            <p>
              Using real gyro data with previously determined biases and scale factor, the DCM drifts out of
              orthonormality after just <strong>6 rotations in 30 seconds</strong>. This demonstrates that simple
              forward integration creates huge drifting errors in a short period of time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            <figure>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
                <img src={`${MEDIA}/6.png`} alt="Experimental drift 3D" className="w-full h-auto" loading="lazy" />
              </div>
              <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                <span className="font-mono font-bold text-sky-500 dark:text-sky-400">Fig 7a:</span> Experimental drift after 6 rotations (3D view)
              </figcaption>
            </figure>
            <figure>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
                <img src={`${MEDIA}/7.png`} alt="Experimental drift norm" className="w-full h-auto" loading="lazy" />
              </div>
              <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                <span className="font-mono font-bold text-sky-500 dark:text-sky-400">Fig 7b:</span> Body frame vector norms diverge from 1.0 within 30 seconds
              </figcaption>
            </figure>
          </div>

          <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
            4.2 Rodrigues Rotation Matrix
          </h3>
          <div className="prose-custom">
            <p>
              The matrix exponential form maintains orthonormality of the DCM but still has errors relative to
              the gyro sensor in real space. The Rodrigues Exponential is:
            </p>
            <p className="font-mono text-center text-sm my-4">
              R<sub>exp</sub>(&omega;&Delta;t) = I + sinc(&omega;&Delta;t<sub>norm</sub>) &middot; cos(&omega;&Delta;t<sub>norm</sub>) &middot; &omega;&Delta;t + sinc(&omega;&Delta;t<sub>norm</sub>)&sup2;/2 &middot; (&omega;&Delta;t)&sup2;
            </p>
          </div>
        </section>

        {/* 5. Closed Loop Integration */}
        <section className="mb-16">
          <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
            <span className="text-sky-500 dark:text-sky-400">5.</span> Closed Loop Integration
          </h2>
          <div className="h-1 w-16 bg-sky-500 dark:bg-sky-400 rounded mb-8" />

          <div className="prose-custom mb-8">
            <p>
              The gyro sensor has no reference for the inertial frame &mdash; it only measures rotation from its starting
              position. The magnetometer and accelerometer provide absolute references: the accelerometer gives
              &ldquo;down&rdquo; (via gravity), and the magnetometer gives &ldquo;north&rdquo; (via Earth&apos;s magnetic field).
            </p>
            <p>
              The closed loop uses two corrections: an <strong>error correction</strong> (corrects absolute angle of rotation
              for pitch and roll) and a <strong>bias estimate</strong> (accounts for systematic gyro bias that would otherwise
              overpower the error correction as values converge).
            </p>
          </div>

          <h3 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
            5.1 Z-Axis Error Correction
          </h3>
          <div className="prose-custom mb-6">
            <p>
              The error correction is calculated as wmeas<sub>a</sub> = a&#8407;<sub>b</sub> &times; R&apos;a&#8407;<sub>i</sub>,
              measuring the difference between the DCM and the accelerometer (which should always point down).
              Before integration, the error is added: &omega;<sup>+</sup> = Kp<sub>a</sub> &middot; wmeas<sub>a</sub>.
            </p>
            <p>
              Without bias estimate, the pitch and roll converge toward the correct absolute rotations but cannot
              account for the bias error &mdash; as values get closer to correct, the error correction weakens and is
              overpowered by the bias. With the bias estimate B<sub>estimate</sub><sup>+</sup> = &minus;Ki<sub>a</sub> &middot; wmeas<sub>a</sub>,
              pitch and roll level out and hold absolute positions even with bias.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <figure>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
                <img src={`${MEDIA}/8.png`} alt="Closed loop without bias" className="w-full h-auto" loading="lazy" />
              </div>
              <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                <span className="font-mono font-bold text-sky-500 dark:text-sky-400">Fig 8:</span> Without bias correction
              </figcaption>
            </figure>
            <figure>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
                <img src={`${MEDIA}/9.png`} alt="With bias drift" className="w-full h-auto" loading="lazy" />
              </div>
              <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                <span className="font-mono font-bold text-sky-500 dark:text-sky-400">Fig 9:</span> With bias (uncorrected)
              </figcaption>
            </figure>
            <figure>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
                <img src={`${MEDIA}/10.png`} alt="With bias corrected" className="w-full h-auto" loading="lazy" />
              </div>
              <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                <span className="font-mono font-bold text-sky-500 dark:text-sky-400">Fig 10:</span> With bias estimate &mdash; stable
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 6. Feedback Using Only Accelerometer */}
        <section className="mb-16">
          <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
            <span className="text-sky-500 dark:text-sky-400">6.</span> Accelerometer Feedback Tuning
          </h2>
          <div className="h-1 w-16 bg-sky-500 dark:bg-sky-400 rounded mb-8" />

          <div className="prose-custom mb-8">
            <p>
              The techniques were implemented on a microcontroller and compared to a MATLAB simulation. The
              proportional gain K<sub>p</sub> was varied to determine the best noise-to-correction ratio. Higher
              K<sub>p</sub> values reduce the time to acquire the initial position from ~15 seconds down to ~1 second.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8">
            {[
              { src: "kp-0.1.png", label: "Kp = 0.1" },
              { src: "kp-0.5.png", label: "Kp = 0.5" },
              { src: "kp-1.png", label: "Kp = 1" },
              { src: "kp-5.png", label: "Kp = 5" },
              { src: "kp-10.png", label: "Kp = 10" },
              { src: "expected-closed-loop.jpg", label: "Expected (MATLAB)" },
            ].map((fig) => (
              <figure key={fig.label}>
                <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
                  <img src={`${MEDIA}/${fig.src}`} alt={fig.label} className="w-full h-auto" loading="lazy" />
                </div>
                <figcaption className="mt-2 text-xs font-mono text-gray-500 dark:text-gray-400 text-center">
                  {fig.label}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="prose-custom">
            <p>
              With K<sub>p</sub> = 10 and K<sub>i</sub> = 0.5, the sensor was placed upside down to test convergence
              to a 180&deg; rotation. The experimental responses were comparable to the MATLAB simulation, though
              the axes approached 180&deg; from the opposite side.
            </p>
          </div>

          <figure className="my-8">
            <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
              <img src={`${MEDIA}/17.png`} alt="Actual closed loop feedback" className="w-full h-auto" loading="lazy" />
            </div>
            <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              <span className="font-mono font-bold text-sky-500 dark:text-sky-400">Fig 17:</span> Experimental closed loop accelerometer feedback
            </figcaption>
          </figure>
        </section>

        {/* 7. Conclusion */}
        <section className="mb-16">
          <h2 className="text-3xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2">
            <span className="text-sky-500 dark:text-sky-400">7.</span> Conclusion
          </h2>
          <div className="h-1 w-16 bg-sky-500 dark:bg-sky-400 rounded mb-8" />

          <div className="prose-custom">
            <p>
              With calibration techniques and familiarization with DCM rotation matrices, attitude sensors are now
              well understood. There are several approaches to accomplish this, including using the <strong>TRIAD
              algorithm</strong> vs. the closed loop feedback system explored here. Attitude sensors can be accomplished
              in many ways &mdash; this is just one version of an implementation using complementary feedback filtering.
            </p>
          </div>
        </section>

        {/* References */}
        <section className="mb-16">
          <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
            References
          </h2>
          <div className="space-y-3">
            {[
              'Ladislav, B., Pavel, C. & Martin, D. (2014). "Navigation of robotic platform with using inertial measurement unit and Direct Cosine Matrix." Proceedings ELMAR-2014.',
              'Welch, G. & Bishop, G. "An Introduction to the Kalman Filter."',
              'de Marina, H. G. et al. (2012). "UAV Attitude Estimation Using Unscented Kalman Filter and TRIAD." IEEE Transactions on Industrial Electronics, vol. 59, no. 11, pp. 4465-4474.',
            ].map((ref, i) => (
              <div key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="text-xs font-mono font-bold text-sky-500 dark:text-sky-400 mt-0.5 shrink-0">
                  [{i + 1}]
                </span>
                <span className="leading-relaxed">{ref}</span>
              </div>
            ))}
          </div>
        </section>
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
        .prose-custom strong {
          color: rgb(17 24 39);
          font-weight: 700;
        }
        .dark .prose-custom strong {
          color: white;
        }
      `}</style>
    </main>
  );
}
