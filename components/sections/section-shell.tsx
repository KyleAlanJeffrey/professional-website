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
  return (
    <section id={id} className={`${className} ${highlighted ? highlightClassName : ""}`}>
      {decorations}
      {children}
    </section>
  );
}
