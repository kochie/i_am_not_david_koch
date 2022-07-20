import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          strategy="beforeInteractive"
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        />
      </body>
    </Html>
  );
}
