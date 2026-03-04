"use client";

import { useInView } from "@/hooks/use-in-view";
import { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  className: string;
  highlighted?: boolean;
  highlightClassName?: string;
  decorations?: ReactNode;
  children: ReactNode;
};

export default function SectionShell({
  id,
  className,
  highlighted = false,
  highlightClassName = "",
  decorations,
  children,
}: SectionShellProps) {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      id={id}
      className={`${className} ${highlighted ? highlightClassName : ""} transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {decorations}
      {children}
    </section>
  );
}
