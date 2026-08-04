import Head from "next/head";
import Script from "next/script";
import { NextSeo } from "next-seo";

import David from "../assets/images/david.jpeg";
import DavidKoch from "../assets/images/davidkoch.jpeg";
import Me from "../assets/images/melb-marathon.jpeg";

import p1 from "../assets/images/1.png";
import p2 from "../assets/images/2.jpeg";
import p3 from "../assets/images/3.jpeg";
import p4 from "../assets/images/4.jpeg";
import p5 from "../assets/images/5.jpeg";

import josh1 from "../assets/images/josh1.jpeg";
import josh2 from "../assets/images/josh2.jpeg";

import { Tweet } from "react-tweet";

import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { TweetBlock } from "../components/TweetBlock";
import { EvidenceGrid } from "../components/EvidenceGrid";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Head>
        <title>I am Not David Koch</title>
      </Head>
      <NextSeo
        title="I am not David Koch"
        description="Seriously I am not on Sunrise."
        openGraph={{
          url: `https://${process.env.VERCEL_URL}`,
          title: "I am not David Koch",
          description: "Seriously I am not on Sunrise.",
          images: [
            {
              url: `https://${process.env.VERCEL_URL}/Sunrise.png`,
              width: 1200,
              height: 675,
              alt: "Sunrise Cover with my face over David Koch",
              type: "image/png",
            },
          ],
          site_name: "I am not David Koch",
        }}
        twitter={{
          handle: "@kochie",
          cardType: "summary_large_image",
        }}
      />

      <div className="flex flex-col items-center gap-16 pb-10">
        <Hero davidSrc={David} meSrc={Me} />

        <Section>
          {
            "Don't be fooled by how much we're #twinning we couldn't be more different. Well we're both white Australian males, but David is 38 years older than me."
          }
        </Section>

        <Section>
          {
            'As the chairman of the Port Adelaide Football Club David gets a lot of "fan" support. But sometimes in the heat of the moment his critics will mistake his twitter handle of '
          }
          <a
            className="font-medium text-accent-600 underline decoration-accent-400/60 underline-offset-2 transition-colors hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
            href="https://twitter.com/kochie_online"
          >
            @kochie_online
          </a>
          {" with mine "}
          <a
            className="font-medium text-accent-600 underline decoration-accent-400/60 underline-offset-2 transition-colors hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
            href="https://twitter.com/kochie"
          >
            @kochie
          </a>
          {"."}
        </Section>

        <TweetBlock>
          <Tweet id="1114324112011214849" />
        </TweetBlock>

        <TweetBlock>
          <Tweet id="1242652582482292737" />
        </TweetBlock>
        <TweetBlock>
          <Tweet id="1223362204310753280" />
        </TweetBlock>

        <TweetBlock>
          <Tweet id="1437154932616949762" />
        </TweetBlock>

        <Section>{"Oof Leigh, tell me how you really feel."}</Section>

        <TweetBlock>
          <Tweet id="1277777946397143040" />
        </TweetBlock>

        <Section>{"Michael really doesn't like me :("}</Section>

        <TweetBlock>
          <Tweet id="1558592495532982272" />
        </TweetBlock>
        <Section>
          {
            "Archie is upset a commercial TV show has no scientific data on it. May I suggest ABC News Archie?"
          }
        </Section>

        <Section>
          {
            "And it's not just his detractors, politicians get it wrong...\n all. the. time."
          }
        </Section>

        <TweetBlock>
          <Tweet id="1549503540821098496" />
        </TweetBlock>

        <TweetBlock>
          <Tweet id="1549861881632157696" />
        </TweetBlock>

        <Section>
          {
            "But don't feel bad if you can't tell us apart. His co-host couldn't either."
          }
        </Section>

        <TweetBlock>
          <Tweet id="431138757220110337" />
        </TweetBlock>

        <TweetBlock>
          <Tweet id="1729316763584856544" />
        </TweetBlock>

        <Section>{"I get in on the fun too."}</Section>
        <TweetBlock>
          <Tweet id="1729372641914699866" />
        </TweetBlock>

        <Section>
          {"But Alas, all good things must come to an end."}
        </Section>
        <TweetBlock>
          <Tweet id="1663074550115074049" />
        </TweetBlock>

        <Section>
          {"Or so I thought! I present my pièce de résistance!"}
        </Section>
        <TweetBlock>
          <Tweet id="529024175285878784" />
        </TweetBlock>

        <Section>
          {
            "If I was the Chairman of the Port Adelaide Football Club this would already be on their t-shirts."
          }
        </Section>
        <TweetBlock>
          <Tweet id="1782642492267237729" />
        </TweetBlock>

        <Section>{"Also some copy pasta"}</Section>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 md:flex-row md:flex-wrap md:justify-center">
          <TweetBlock>
            <Tweet id="1758110242863227017" />
          </TweetBlock>
          <TweetBlock>
            <Tweet id="1757255984945193032" />
          </TweetBlock>
          <TweetBlock>
            <Tweet id="1757228226290573620" />
          </TweetBlock>
          <TweetBlock>
            <Tweet id="1759323123852185847" />
          </TweetBlock>
          <TweetBlock>
            <Tweet id="1759466016709460028" />
          </TweetBlock>
          <TweetBlock>
            <Tweet id="1759762423400091767" />
          </TweetBlock>
        </div>

        <Section>{"I'm always happy to help the little guys"}</Section>
        <TweetBlock>
          <Tweet id="1788341779097657430" />
        </TweetBlock>

        <Section>
          {
            "Also to all the cowards out there who delete your mistake as soon as I tell you. I see you..."
          }
        </Section>
        <EvidenceGrid
          items={[
            { src: p1, alt: "screen grab of tweet1" },
            { src: p2, alt: "screen grab of tweet2" },
            { src: p3, alt: "screen grab of tweet3" },
            { src: p4, alt: "screen grab of tweet4" },
            { src: p5, alt: "screen grab of tweet5" },
          ]}
          columns="md:grid-cols-5"
          className="max-w-5xl"
        />

        <Section>{"Even you Josh."}</Section>
        <EvidenceGrid
          items={[
            { src: josh1, alt: "screen grab of tweet1 from josh" },
            { src: josh2, alt: "screen grab of tweet2 from josh" },
          ]}
          columns="md:grid-cols-2"
          startIndex={6}
          className="max-w-2xl"
        />

        <Section>
          {
            "But hey it could be worse, at least no one thinks I'm this David Koch."
          }
        </Section>
        <Footer davidKochBrosSrc={DavidKoch} />
      </div>
    </div>
  );
}
