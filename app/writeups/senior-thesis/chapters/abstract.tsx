"use client";

import { FadeIn } from "../components/ui";

export default function Abstract() {
  return (
    <FadeIn>
      <section id="abstract" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
          Abstract
        </h2>
        <div className="prose-custom">
          <p>
            Within the field of robotics, there is a demand for robots capable of atypical terrain
            traversal. Atypical environments like stairs, rocky trails, and off-road locations
            consist of chaotic, non-flat terrain that ordinary wheeled robots struggle to cross.
            Companies like Boston Dynamics have developed humanoid and animal-like robots
            capable of traversing such terrain; however, these robot designs are expensive and
            complicated.
          </p>
          <p>
            Using biological inspiration from millipedes and centipedes, this
            paper develops a cost-effective and easily reproducible design to solve the
            problem of traversal through diverse terrain. The development included research into the biology
            of millipedes and centipedes, a review of existing literature on insect-inspired leg
            actuators, implementation of an existing cam actuator by Wan and Song, and
            development of a simulation environment tested by hardware implementation &mdash; all completed
            at home in novel, affordable ways due to the COVID-19 Pandemic.
          </p>
        </div>
      </section>
    </FadeIn>
  );
}
