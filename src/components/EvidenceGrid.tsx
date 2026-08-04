import Image, { type StaticImageData } from "next/image";

export type EvidenceItem = {
  src: StaticImageData;
  alt: string;
};

type EvidenceGridProps = {
  items: EvidenceItem[];
  columns?: string;
  startIndex?: number;
  className?: string;
};

export function EvidenceGrid({
  items,
  columns = "md:grid-cols-5",
  startIndex = 1,
  className = "",
}: EvidenceGridProps) {
  return (
    <div
      className={`mx-auto grid grid-cols-1 gap-4 px-4 ${columns} ${className}`}
    >
      {items.map((item, i) => (
        <figure
          key={item.alt}
          className="relative overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-700 dark:ring-white/10"
        >
          <Image src={item.src} alt={item.alt} className="h-auto w-full" />
          <figcaption className="absolute left-2 top-2 rounded-full bg-accent-500 px-2 py-0.5 font-display text-xs font-bold uppercase tracking-wide text-white shadow">
            Exhibit {startIndex + i}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
