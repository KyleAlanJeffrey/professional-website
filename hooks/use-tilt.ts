"use client";

import { RefObject, useEffect } from "react";

type TiltOptions = {
  maxDeg?: number;
  scale?: number;
  perspective?: number;
  liftPx?: number; // replaces Tailwind hover:-translate-y-X
};

export function useTilt<T extends HTMLElement>(
  ref: RefObject<T>,
  options: TiltOptions = {}
) {
  const { maxDeg = 8, scale = 1.015, perspective = 800, liftPx = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const nx = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2;
      const ny = ((e.clientY - rect.top)   / rect.height - 0.5) * 2;
      const rotX = -ny * maxDeg;
      const rotY =  nx * maxDeg;
      el!.style.transition = "";
      el!.style.transform = `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${-liftPx}px) scale(${scale})`;
    }

    function onLeave() {
      el!.style.transition = "transform 0.4s ease";
      el!.style.transform  = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`;
      const cleanup = () => {
        if (el) { el.style.transition = ""; el.style.transform = ""; }
        el?.removeEventListener("transitionend", cleanup);
      };
      el!.addEventListener("transitionend", cleanup);
    }

    function onEnter() { el!.style.transition = ""; }

    el.addEventListener("mousemove",  onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);

    return () => {
      el.removeEventListener("mousemove",  onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
      el.style.transform      = "";
      el.style.transformStyle = "";
      el.style.willChange     = "";
    };
  }, [maxDeg, scale, perspective, liftPx]);
}
