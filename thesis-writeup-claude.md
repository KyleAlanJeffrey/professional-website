# Senior Thesis Writeup - Claude Tracking Notes

## Thesis Structure (Table of Contents)
1. Introduction (Problem Statement, Existing Work, Characteristics of Millipede, Why Millipedes)
2. Kinematic Model (Literature Review, Leg Motion Kinematics, Metachronal Gait)
3. Design (Geared Bar Mechanism, Custom Cam, Fixed Bearing Cam - Wan & Song)
4. Simulation (Kinematic Analysis, Simscape Multibody, Results)
5. Final Model & Conclusions (Print Faults, Testing, After Effects Analysis, Failed Tests, Conclusion)

## Key Media Mapping (Chapter -> Key Images)

### ch1-introduction - Introduction
- millipede-vs-centipede-gait.png - Fig 1.1: millipede vs centipede gait + metachronal wave
- manton-leg-anatomy.png / manton-leg-anatomy-detail.png - Fig 1.2: Manton leg structure
- high-vs-low-gear-gait.png - Fig 1.3: high gear vs low gear gait
- millipede-stroke-cycle.png / duty-cycle-differences.png - Fig 1.4/1.5: duty cycle differences
- gait-illustration.png - general gait illustration
- leg-structure.png - leg structure overview

### ch2-kinematics - Kinematic Model
- circle-of-reference.png - Fig 2.1: circle of reference
- after-effects-tracking.png / trajectory-overlay-validation.png - Fig 2.2: After Effects tracking validation
- leg-trajectory-phases.png - Fig 2.3: leg trajectory
- propulsive-force-diagram.png - Fig 2.4: force diagram

### ch3-design - Design
- existing-leg-designs-survey.png - Fig 3.1: existing leg designs in literature
- gear-kinematics/ - geared bar mechanism figures
  - geared-bar-mechanism.png - main mechanism diagram
  - trajectory-deviation-analysis.png - trajectory deviation from desired path
  - trajectory-analysis-1.png through trajectory-analysis-4.png - step-by-step analysis
  - trajectory-analysis-1-2.png, trajectory-analysis-3-4.png - combined views
- leg-animations/ - animation/stills of all 3 designs
  - geared-bar-parts.png, gear-mechanism-still.png, gear-mechanism-frame-1 through 4.png - geared bar mechanism
  - sliding-cam-design.png, sliding-cam-parts.png, sliding-cam-motion.png - custom sliding cam
  - custom-cam-animation.gif - custom cam animated
  - fixed-bearing-cam-parts.png, cam-motion-profile.png - Wan & Song cam parts/motion
  - wan-song-cam-side.gif, wan-song-cam-iso.gif - Wan & Song cam animated
- wan-song-original-design.png - Fig 3.9: original Wan & Song (2004) design
- cam-design/ - cam shape analysis
  - cam-profile.png - base cam profile
  - cam-profile-iteration-1.png, cam-profile-iteration-2.png, cam-profile-iteration-3.png - profile iterations
  - final-cam-profile.png - final cam profile with Makima spline
  - cam-shape-with-trajectory.png, cam-shape-with-trajectory-2.png - cam shape overlaid with trajectory
  - cam-dimensions.png - critical dimensions (H = 0.43L, d = 0.4L)
  - cam-specifications.png - final specs and tolerances
  - trajectory-validation.png - cam output vs desired half-circle
  - fusion360-model.png, fusion360-assembly.png - Fusion 360 CAD
  - final-design-render.png - final design render

### ch4-simulation - Simulation
- single-leg-cycloid.png / single-leg-cycloid-2.png - Fig 4.1: single cycloid trajectory
- multi-leg-position-analysis.png - Fig 4.2: multi-leg position analysis
- three-simulation-generations.png - Fig 4.3: three generations of simulation
- body-segment-component.jpg - Fig 4.4: body segment component
- simscape-full-environment.png / simulation-environment.jpg - Fig 4.5: full environment
- leg-segment-component.jpg - Fig 4.6: leg segment component
- simscape-3d-visualization.png / leg-motion-still.png / leg-motion-still-2.png - Fig 4.7: simulation snapshot
- center-of-gravity-results.png - Fig 4.8: center of gravity results
- velocity-comparison.png - Fig 4.9: velocity data
- leg-offset-comparison.png - Fig 4.10: leg phase offset comparison
- 6-leg-configuration.png, 8-leg-configuration.png, 8-leg-60deg-offset-snapshot.png - leg config snapshots

### ch5-hardware - Final Model
- 3d-printed-cam.png - Fig 5.1: 3D printed cam mechanism
- slicer-preview.png - Fig 5.2: slicer preview
- rotary-arm-redesign.png - Fig 5.3: rotary arm redesign
- cam-redesign.png - Fig 5.4: cam profile redesign
- test-environment.png / test-environment-detail.png - Fig 5.5: test environment setup
- ground-contact-span.png / ground-contact-span-detail.png - Fig 5.6: 60deg ground contact span
- normalized-ae-tracking.png - Fig 5.7: normalized AE tracking
- trajectory-measured-vs-designed.png / trajectory-radius-comparison.png - Fig 5.8: trajectory comparison
- trajectory-error-analysis.png - Fig 5.9: error analysis (max 4.6mm)
- potentiometer-raw-data.png - Fig 5.10: raw potentiometer data
- potentiometer-80hz-lpf.png - Fig 5.11: 80Hz low-pass filter
- potentiometer-15hz-lpf.png - Fig 5.12: 15Hz low-pass filter
- imu-linear-position-drift.png - Fig 5.13: IMU data with integration drift
- sim-vs-experimental-trajectory.png - Fig 5.14: simulation vs experimental
- assembled-front-view.jpg, assembled-side-view.jpg, assembled-detail-view.jpg - photos of physical build
- cam-positions.png, motion-tracking.png, trajectory.png - additional analysis
- test-screenshot-1 through 4.png - additional test screenshots

### videos/
- reference-poc-1.mp4, reference-poc-2.mp4 - reference source proof-of-concept footage
- biological-insect-gait-1.mp4, biological-insect-gait-2.mp4 - real insect gait footage
- demo-final.mp4 - final cam mechanism demonstration
- custom-cam-animation.gif, wan-song-cam-side.gif, wan-song-cam-iso.gif - cam mechanism animations
- supplementary-1 through 3.mp4, supplementary-4 through 5.avi - supplementary videos
- simscape/ - simulation recordings by generation (gen1, gen2, sim1-sim6, leg-comparisons)
