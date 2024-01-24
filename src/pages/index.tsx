import Head from "next/head";
import Image from "next/image";
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

import { Tweet, TweetInReplyTo } from "react-tweet";

export default function Home() {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 dark:text-white text-center md:text-left">
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

      <div className="md:flex md:flex-col md:justify-center gap-6 md:mx-auto items-center">
        <div className="md:mt-40 text-5xl text-center p-5">
          I am <span className="italic font-bold mx-2">_not_</span> David Koch.
        </div>
        <div className="my-20">
          <Image src={David} alt="image of david koch from sunrise" />
        </div>
        <div className="flex justify-center">
          Look at this beautiful egg shaped man, now look at me.
        </div>
        <div className="md:w-96">
          <Image src={Me} alt="image of me robert koch" />
        </div>
        <div className="flex justify-center md:w-[600px] ">
          {
            "Don't be fooled by how much we're #twinning we couldn't be more different. Well we're both white Australian males, but David is 38 years older than me."
          }
        </div>
        <div className="md:w-[600px]">
          {
            'As the chairman of the Port Adelaide Football Club David gets a lot of "fan" support. But sometimes in the heat of the moment his critics will mistake his twitter handle of '
          }
          <a className="underline" href="https://twitter.com/kochie_online">
            @kochie_online
          </a>
          {" with mine "}
          <a className="underline" href="https://twitter.com/kochie">
            @kochie
          </a>
          {"."}
        </div>
        <div className="">
          {/* <MichaelLynch /> */}
          <Tweet id="1114324112011214849" />
        </div>

        {/* <Spotty /> */}
        <Tweet id="1242652582482292737" />
        <Tweet id="1223362204310753280" />

        <Tweet id="1437154932616949762" />

        <div className="flex justify-center md:w-[600px] mx-auto mt-10 mb-20">
          {"Oof Leigh, tell me how you really feel."}
        </div>

        <Tweet id="1277777946397143040" />

        <div className="flex justify-center md:w-[600px] md:mx-auto mx-3 mt-10 mb-20">
          {"Michael really doesn't like me :("}
        </div>

        <Tweet id="1558592495532982272" />
        <div className="flex justify-center md:w-[600px] md:mx-auto mx-3 mt-10 mb-20 text-center">
          {
            "Archie is upset a commercial TV show has no scientific data on it. May I suggest ABC News Archie?"
          }
        </div>

        <div className="flex justify-center md:w-[600px] md:mx-auto mx-3 mt-10 mb-20">
          {
            "And it's not just his detractors, politicians get it wrong...\n all. the. time."
          }
        </div>

        <Tweet id="1549503540821098496" />

        <Tweet id="1549861881632157696" />

        <div className="flex justify-center md:w-[600px] mx-auto">
          {
            "But don't feel bad if you can't tell us apart. His co-host couldn't either."
          }
        </div>

        <Tweet id="431138757220110337" />

        <Tweet id="1729316763584856544" />

        <div className="flex justify-center md:w-[600px] mx-auto">
          {"I get in on the fun too."}
        </div>
        <Tweet id="1729372641914699866" />

        <span> But Alas, all good things must come to an end.</span>
        <Tweet id="1663074550115074049" />

        <span>Or so I thought! I present my pièce de résistance!</span>
        <Tweet id="529024175285878784" />

        <div className="flex justify-center">
          {
            "Also to all the cowards out there who delete your mistake as soon as I tell you. I see you..."
          }
        </div>
        <div className="md:mx-20 mx-3 my-20 gap-4 grid md:grid-cols-5 grid-cols-1">
          <Image src={p1} alt="screen grab of tweet1" />
          <Image src={p2} alt="screen grab of tweet2" />
          <Image src={p3} alt="screen grab of tweet3" />
          <Image src={p4} alt="screen grab of tweet4" />
          <Image src={p5} alt="screen grab of tweet5" />
        </div>
        <div className="flex justify-center">Even you Josh.</div>
        <div className="md:mx-auto mx-3 my-20 gap-4 grid md:grid-cols-2 grid-cols-1 md:w-[700px]">
          <Image src={josh1} alt="screen grab of tweet1 from josh" />
          <Image src={josh2} alt="screen grab of tweet2 from josh" />
        </div>

        <div className="flex justify-center">
          {
            "But hey it could be worse, at least no one thinks I'm this David Koch."
          }
        </div>
        <div className="mb-40">
          <Image
            src={DavidKoch}
            alt="image of David Koch from Koch Brothers."
          />
        </div>
      </div>
    </div>
  );
}


