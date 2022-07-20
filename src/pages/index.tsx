import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { NextSeo } from "next-seo";

import David from "../assets/images/david.jpg";
import DavidKoch from "../assets/images/david-koch.jpg";
import Me from "../assets/images/melb-marathon.jpg";

import p1 from "../assets/images/1.png";
import p2 from "../assets/images/2.jpeg";
import p3 from "../assets/images/3.jpeg";
import p4 from "../assets/images/4.jpeg";
import p5 from "../assets/images/5.jpeg";

import josh1 from "../assets/images/josh1.jpg";
import josh2 from "../assets/images/josh2.jpg";

export default function Home() {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 dark:text-white">
      <Head>
        <title>I am _Not_ David Koch</title>
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

      <div className="flex flex-col justify-center">
        <div className="flex justify-center mt-40 text-5xl">
          I am <span className="italic font-bold">_not_</span> David Koch.
        </div>
        <div className="mx-auto my-20">
          <Image src={David} />
        </div>
        <div className="flex justify-center">
          Look at this beautiful egg shaped man, now look at me.
        </div>
        <div className="mx-auto my-20 w-96">
          <Image src={Me} />
        </div>
        <div className="flex justify-center w-[600px] mx-auto">
          Don't be fooled by how much we're #twinning we couldn't be more
          different. Well we're both white Australian males, but David is 38
          years older than me.
        </div>
        <div className="flex justify-center w-[600px] mx-auto">
          As the chairman of the Port Adelaide Football Club David gets a lot of
          "fan" support.
        </div>
        <div className="mx-auto my-20">
          <MichaelLynch />
        </div>
        <div className="mx-auto mb-20">
          <Spotty />
        </div>
        <div className="mx-auto">
          <Leigh />
        </div>
        <div className="flex justify-center w-[600px] mx-auto mt-10 mb-20">
          Oof Leigh, tell me how you really feel.
        </div>

        <div className="mx-auto">
          <Michael />
        </div>
        <div className="flex justify-center w-[600px] mx-auto mt-10 mb-20">
          Michael really doesn't like me :(
        </div>

        <div className="mx-auto my-20">
          <Jim />
        </div>

        <div className="flex justify-center w-[600px] mx-auto">
          But don't feel bad if you can't tell us apart. His co-host couldn't
          either.
        </div>
        <div className="mx-auto my-20 w-[500px]">
          <Sam />
        </div>

        <div className="flex justify-center">
          Also to all the cowards out there who delete your mistake as soon as I
          tell you. I see you...
        </div>
        <div className="mx-20 my-20 gap-4 grid grid-cols-5">
          <Image src={p1} />
          <Image src={p2} />
          <Image src={p3} />
          <Image src={p4} />
          <Image src={p5} />
        </div>
        <div className="flex justify-center">Even you Josh.</div>
        <div className="mx-auto my-20 gap-4 grid grid-cols-2 w-[700px]">
          <Image src={josh1} />
          <Image src={josh2} />
        </div>

        <div className="flex justify-center">
          But hey it could be worse, at least no one thinks I'm this David Koch.
        </div>
        <div className="mx-auto my-20">
          <Image src={DavidKoch} />
        </div>
      </div>
      <Script
        strategy="beforeInteractive"
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      />
    </div>
  );
}

const Jim = () => (
  <>
    <blockquote className="twitter-tweet">
      <p lang="en" dir="ltr">
        Looking forward to joining{" "}
        <a href="https://twitter.com/kochie?ref_src=twsrc%5Etfw">@kochie</a> and
        on{" "}
        <a href="https://twitter.com/sunriseon7?ref_src=twsrc%5Etfw">
          @sunriseon7
        </a>{" "}
        this morning{" "}
        <a href="https://twitter.com/hashtag/auspol?src=hash&amp;ref_src=twsrc%5Etfw">
          #auspol
        </a>{" "}
        <a href="https://twitter.com/hashtag/ausecon?src=hash&amp;ref_src=twsrc%5Etfw">
          #ausecon
        </a>
      </p>
      &mdash; Jim Chalmers MP (@JEChalmers){" "}
      <a href="https://twitter.com/JEChalmers/status/1549503540821098496?ref_src=twsrc%5Etfw">
        July 19, 2022
      </a>
    </blockquote>{" "}
  </>
);

const Sam = () => (
  <blockquote className="twitter-tweet">
    <p lang="en" dir="ltr">
      “<a href="https://twitter.com/T2hays?ref_src=twsrc%5Etfw">@T2hays</a>:{" "}
      <a href="https://twitter.com/sam_armytage?ref_src=twsrc%5Etfw">
        @sam_armytage
      </a>{" "}
      Tell <a href="https://twitter.com/kochie?ref_src=twsrc%5Etfw">@kochie</a>
      <br /> &#39;Go the Crows&#39;”
      <br />
      <br />
      Tell him yourself{" "}
      <a href="https://twitter.com/kochie_online?ref_src=twsrc%5Etfw">
        @kochie_online
      </a>
    </p>
    &mdash; Samantha Armytage (@sam_armytage){" "}
    <a href="https://twitter.com/sam_armytage/status/431138757220110337?ref_src=twsrc%5Etfw">
      February 5, 2014
    </a>
  </blockquote>
);

const MichaelLynch = () => (
  <>
    <blockquote className="twitter-tweet">
      <p lang="en" dir="ltr">
        I assume{" "}
        <a href="https://twitter.com/kochie_online?ref_src=twsrc%5Etfw">
          @kochie_online
        </a>{" "}
        and <a href="https://twitter.com/PAFC?ref_src=twsrc%5Etfw">@PAFC</a> you
        are merely trolling the rest of the world. If not, your delusional
        levels of solipsism are breathtaking.{" "}
        <a href="https://twitter.com/kochie?ref_src=twsrc%5Etfw">@kochie</a> you
        have made a living as a financial journalist. If this is a measure of
        your research, God help your readers and viewers!!
      </p>
      &mdash; Michael Lynch (@MickLynch_Age){" "}
      <a href="https://twitter.com/MickLynch_Age/status/1114324112011214849?ref_src=twsrc%5Etfw">
        April 6, 2019
      </a>
    </blockquote>
  </>
);

const Spotty = () => (
  <blockquote className="twitter-tweet">
    <p lang="en" dir="ltr">
      Seriously{" "}
      <a href="https://twitter.com/kochie?ref_src=twsrc%5Etfw">@kochie</a>, as a{" "}
      <a href="https://twitter.com/PAFC?ref_src=twsrc%5Etfw">@pafc</a> member
      who is prepared to allow the club to keep my $500, these millionaire
      footballers are crying poor and only prepared to take an effective pay cut
      of 8%. Tell your players to step in line or shut up
    </p>
    &mdash; Spotty (@spottythompson){" "}
    <a href="https://twitter.com/spottythompson/status/1242652582482292737?ref_src=twsrc%5Etfw">
      March 25, 2020
    </a>
  </blockquote>
);

const Leigh = () => (
  <blockquote className="twitter-tweet">
    <p lang="en" dir="ltr">
      Morning{" "}
      <a href="https://twitter.com/kochie?ref_src=twsrc%5Etfw">@kochie</a> you
      wanker <a href="https://t.co/qNxZaHLBQl">pic.twitter.com/qNxZaHLBQl</a>
    </p>
    &mdash; Leigh (@Leigh65399719){" "}
    <a href="https://twitter.com/Leigh65399719/status/1437154932616949762?ref_src=twsrc%5Etfw">
      September 12, 2021
    </a>
  </blockquote>
);

const Michael = () => (
  <blockquote className="twitter-tweet">
    <p lang="en" dir="ltr">
      Kochie is everything that I hate about Australia. I a leaving once the
      winter is over. Queensland winters are to die for. Have blanked out the 7
      on my TV remote
    </p>
    &mdash; 💧Michael Q Todd ⛳ IOTA FAN l GOLFER l DREAMER (@michaelqtodd){" "}
    <a href="https://twitter.com/michaelqtodd/status/1277777946397143040?ref_src=twsrc%5Etfw">
      June 30, 2020
    </a>
  </blockquote>
);
