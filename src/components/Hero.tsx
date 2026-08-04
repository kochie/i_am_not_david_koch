import Image, { type StaticImageData } from "next/image";

type HeroProps = {
  davidSrc: StaticImageData;
  meSrc: StaticImageData;
};

export function Hero({ davidSrc, meSrc }: HeroProps) {
  return (
    <div className="flex flex-col items-center gap-8 px-4 pt-10 md:pt-24">
      <h1 className="text-center font-display text-4xl font-bold md:text-6xl">
        I am{" "}
        <span className="italic text-accent-600 dark:text-accent-400">
          _not_
        </span>{" "}
        David Koch.
      </h1>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="relative aspect-square w-64 overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 transition-transform duration-300 hover:scale-105 dark:ring-white/10">
          <Image
            src={davidSrc}
            alt="image of david koch from sunrise"
            title="Not this guy"
            fill
            sizes="256px"
            className="object-cover"
            priority
          />
        </div>
        <span className="z-10 rounded-full bg-accent-500 px-4 py-1 font-display text-sm font-bold uppercase tracking-wide text-white shadow-md md:-mx-6">
          vs
        </span>
        <div className="relative aspect-square w-64 overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 transition-transform duration-300 hover:scale-105 dark:ring-white/10">
          <Image
            src={meSrc}
            alt="image of me robert koch"
            fill
            sizes="256px"
            className="object-cover"
            priority
          />
        </div>
      </div>
      <p className="max-w-xl text-center text-lg text-slate-600 dark:text-slate-300">
        Look at this beautiful egg shaped man, now look at me.
      </p>
    </div>
  );
}
