import Image, { type StaticImageData } from "next/image";

type FooterProps = {
  davidKochBrosSrc: StaticImageData;
};

export function Footer({ davidKochBrosSrc }: FooterProps) {
  return (
    <footer className="flex justify-center px-4 pb-24">
      <div className="w-64 overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 transition-transform duration-300 hover:scale-105 dark:ring-white/10">
        <Image
          src={davidKochBrosSrc}
          alt="image of David Koch from Koch Brothers."
          title="Also not this guy"
          className="h-auto w-full"
        />
      </div>
    </footer>
  );
}
