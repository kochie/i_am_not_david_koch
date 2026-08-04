import type { ReactNode } from "react";

type TweetBlockProps = {
  children: ReactNode;
};

export function TweetBlock({ children }: TweetBlockProps) {
  return (
    <div className="flex justify-center transition-transform duration-300 hover:scale-[1.02]">
      {children}
    </div>
  );
}
