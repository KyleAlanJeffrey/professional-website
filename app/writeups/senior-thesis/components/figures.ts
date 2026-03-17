export const MEDIA = "/writeups/senior-thesis/media";

export type FigureData = {
  src: string;
  alt: string;
  caption?: string;
  figNum?: string;
};

// All figures for lightbox navigation
export const ALL_FIGURES: FigureData[] = [
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
