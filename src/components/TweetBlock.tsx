import type { ReactNode } from "react";

type TweetBlockProps = {
  children: ReactNode;
};

export function TweetBlock({ children }: TweetBlockProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[550px] transition-transform duration-300 hover:scale-[1.02]">
        {children}
      </div>
    </div>
  );
}
