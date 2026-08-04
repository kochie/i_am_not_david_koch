import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className = "" }: SectionProps) {
  return (
    <div
      className={`mx-auto max-w-2xl px-4 text-center text-lg leading-relaxed text-slate-700 md:text-left dark:text-slate-200 ${className}`}
    >
      {children}
    </div>
  );
}
