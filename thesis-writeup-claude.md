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
- gaits.png - general gait illustration

### ch2-kinematics - Kinematic Model
- circle-of-reference.png - Fig 2.1: circle of reference
- after-effects-tracking.png / trajectory-overlay-validation.png - Fig 2.2: After Effects tracking validation
- leg traj.PNG - leg trajectory
- propulsive-force-diagram.png - force diagram

### ch3-design - Design
- existing-leg-designs-survey.png - Fig 3.1: existing leg designs in literature
- gear-kinematics/ - geared bar mechanism figures
  - geared-bar-mechanism.png, trajectory-deviation-analysis.png, 1-4.png - trajectory analysis
- leg-animations/ - animation/stills of all 3 designs
  - gear*.png - geared bar mechanism
  - slide_cam*.png - custom sliding cam
  - cam*.gif, fixed-bearing-cam-parts.png, cam_motion.png - Wan & Song cam
- wan-song-original-design.png - Fig 3.9: original Wan & Song design
- cam-design/ - cam shape analysis
  - cam_shape1-3.png, final-cam-profile.png - cam profile iterations
  - cam-dimensions.png, cam-specifications.png - dimensions
  - trajectory-validation.png - trajectory validation
  - fusion360-model.png, fusion360-assembly.png - Fusion 360 model
  - design.png - final design

### ch4-simulation - Simulation
- three-simulation-generations.png - Fig 4.3: three generations of simulation
- single-leg-cycloid.png / single_leg_motion2.png - Fig 4.1: single cycloid
- multi-leg-position-analysis.png - Fig 4.2: multi-leg position analysis
- Body Seg sim environment.jpg - Fig 4.4: body segment component
- simscape-full-environment.png / sim environment.jpg - Fig 4.5: full environment
- leg component environemnt.jpg - Fig 4.6: leg segment component
- simscape-3d-visualization.png / leg_motion_still.png - Fig 4.7: simulation snapshot
- center-of-gravity-results.png - Fig 4.8: center of gravity results
- velocity-comparison.png - Fig 4.9: velocity data
- 6-leg-configuration.png, 8-leg-configuration.png, 8Legs_60deg_offset.png - leg config snapshots

### ch5-hardware - Final Model
- ccam print.png / print slice.PNG - Fig 5.1/5.2: 3D print
- rotary-arm-redesign.png - Fig 5.3: rotary arm redesign
- cam-redesign.png - Fig 5.4: cam redesign
- test build.png / test build2.png - Fig 5.5: test environment
- ground-contact-span.png / ground-contact-span-detail.png - Fig 5.6: 60deg ground contact span
- normalized-ae-tracking.png - Fig 5.7: normalized AE tracking
- trajectory-measured-vs-designed.png / cam_motion_comp radius.png - Fig 5.8: trajectory comparison
- trajectory-error-analysis.png - Fig 5.9: error analysis
- potentiometer-raw-data.png - Fig 5.10: raw potentiometer data
- angular_position LPF.png - Fig 5.11: 80Hz LPF
- angular_position LPF 15hz.png - Fig 5.12: 15Hz LPF
- IMU data.png - Fig 5.13: IMU data
- Angular Position After Effects Comparison.png - Fig 5.14: sim vs experimental
- IMG_0372-0374.jpg - photos of physical build
- Screenshots - additional test screenshots

### Videos (for potential embeds)
- videos/custom-cam-animation.gif, wan-song-cam-side.gif, wan-song-cam-iso.gif - cam mechanism animations
- videos/Movie1-5.mp4 - thesis demo videos
- videos/Simscape/ - simulation recordings by generation

## Page Structure Plan
- Full table of contents as a sidebar/nav
- All 5 chapters rendered as sections with images
- Image lightbox/modal for figures
- Score matrices as styled tables
- Kinematic equations rendered (could use unicode or images)
- Videos embedded where useful (gifs inline, mp4 as video elements)

## Style Notes
- Keep existing indigo accent color
- Glass card pattern for callouts
- Use FadeIn for scroll animations
- Monospace for labels/parameters
- URL-encode spaces in media paths with %20
