"use client";

import { FadeIn } from "../components/ui";

const REFS = [
  "Anderson, B., Shultz, J. & Jayne, B. (1995). Axial kinematics and muscle activity during terrestrial locomotion of the centipede scolopendra heros. Journal of Experimental Biology, 198(5):1185-1195.",
  "Conte, S.D. & De Boor, C. (2017). Elementary Numerical Analysis: An Algorithmic Approach. Classics in Applied Mathematics, SIAM.",
  "Crow, A. (2005). Cam controlled walking robot.",
  "De Boor, C. A practical guide to splines, volume 27.",
  "Garcia, A., Priya, S. & Marek, P. (2015). Understanding the locomotion and dynamic controls for millipedes: Part 1-kinematic analysis. ASME SMASIS.",
  "Garcia, A., Krummel, G. & Priya, S. (2020). Fundamental understanding of millipede morphology and locomotion dynamics. Bioinspiration & Biomimetics, 16(2):026003.",
  "Garcia, A. J. C. (2018). Millipede-Inspired Locomotion for Rumen Monitoring through Remotely Operated Vehicle. PhD thesis, Virginia Tech.",
  "Hopkin, S.P. & Read, H.J. (1992). The biology of millipedes.",
  "Kano, T. et al. (2017). Decentralized control mechanism underlying interlimb coordination of millipedes. Bioinspiration & Biomimetics, 12(3):036007.",
  "Koh, D., Yang, J. & Kim, S. (2010). Centipede robot for uneven terrain exploration: Design and experiment of the flexible biomimetic robot mechanism. IEEE RAS & EMBS.",
  "Long, G., Anderson, J. & Borenstein, J. (2002). The kinematic design of the OmniPede: a new approach to obstacle traversion. IEEE ICRA.",
  "Manton, S. M. (1954). The evolution of arthropodan locomotory mechanisms. Part 4: The structure, habits and evolution of the Diplopoda. Journal of the Linnean Society of London, Zoology, 42(286):299-368.",
  "Manton, S. M. (1972). The evolution of arthropodan locomotory mechanisms: Part 10. Zoological Journal of the Linnean Society, 51(3-4):203-400.",
  "Minelli, A. (2011). The Myriapoda. Brill.",
  "Minelli, A. (2015). Treatise on Zoology - Anatomy, Taxonomy, Biology. The Myriapoda, Volume 2. Brill.",
  "Parker, G. & Mills, J. (1998). Metachronal wave gait generation for hexapod robots.",
  "Raibert, M. H. (1986). Legged robots that balance. MIT Press.",
  "Sathirapongsasuti, J., Punnanithi, N. & Wimonkittiwat, P. (2004). Walking with a millipede. Intel ISF.",
  "Wan, X. & Song, S.-M. (2004). A cam-controlled, single actuator-driven leg mechanism for legged vehicles. ASME IMECE.",
  "Wilson, H. M. (2002). Muscular anatomy of the millipede Phyllogonostreptus nigrolabiatus (Diplopoda: Spirostreptida). Journal of Morphology, 251(3):256-275.",
];

export default function References() {
  return (
    <FadeIn>
      <section id="references" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-6">
          Bibliography
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
