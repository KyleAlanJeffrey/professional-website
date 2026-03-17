"use client";

import { FadeIn } from "../components/ui";

const REFS = [
  "Garcia, A. J. C. (2018). Millipede-Inspired Locomotion for Rumen Monitoring through Remotely Operated Vehicle. PhD thesis, Virginia Tech.",
  "Wan, X. & Song, S.-M. (2004). A cam-controlled, single actuator-driven leg mechanism for legged vehicles. ASME IMECE.",
  "Manton, S. M. (1954). The evolution of arthropodan locomotory mechanisms. Part 4: The Diplopoda.",
  "Kano, T. et al. (2017). Decentralized control mechanism underlying interlimb coordination of millipedes. Bioinspiration & Biomimetics.",
  "Long, G. et al. (2002). The kinematic design of the OmniPede. IEEE ICRA.",
  "Sathirapongsasuti, J. et al. (2004). Walking with a millipede. Intel ISF.",
  "Garcia, A., Priya, S., & Marek, P. (2015). Understanding the locomotion and dynamic controls for millipedes. ASME SMASIS.",
  "Crow, A. (2005). Cam controlled walking robot.",
  "Koh, D. et al. (2010). Centipede robot for uneven terrain exploration. IEEE RAS & EMBS.",
  "Anderson, B. et al. (1995). Axial kinematics and muscle activity during terrestrial locomotion of the centipede.",
];

export default function References() {
  return (
    <FadeIn>
      <section id="references" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
          References
        </h2>
        <div className="space-y-3">
          {REFS.map((ref, i) => (
            <div key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-xs font-mono font-bold text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0">
                [{i + 1}]
              </span>
              <span className="leading-relaxed">{ref}</span>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
