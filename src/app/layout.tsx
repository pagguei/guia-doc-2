import CookieConsentProvider from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Image from "next/image";
import HydrateClient from "./hydrate-client";
import Providers from "./providers";
import StyledComponentsRegistry from "./registry";

export const metadata: Metadata = {
  title: "Guia do Documento",
  description: "Assessoria informativa (não governamental) para emissão de passaporte.",
  icons: {
    icon: [
      { url: '/favicon.ico?v=1' },
      { url: '/favicon-32x32.png?v=1', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=1', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=1', sizes: '180x180' }],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Guia do Documento",
    title: "Guia do Documento — Assessoria documental",
    description: "Assessoria informativa (não governamental) para emissão de passaporte.",
    images: [
      {
        url: "/og.png",
        width: 736,
        height: 426,
        alt: "Guia do Documento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guia do Documento — Assessoria documental",
    description: "Assessoria informativa (não governamental) para emissão de passaporte.",
    images: ["/og.png"],
  },
  manifest: '/site.webmanifest',
};

const CRITICAL_CSS = `
/* esconde só o app, não o loader */
html.preload #app-root { visibility: hidden; }
html.hydrated #app-root { visibility: visible; }
html.hydrated #app-loader { display: none; }
`;



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="preload" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17777984952"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17777984952');
          `}
        </script>
      </head>
      <body>
        <div id="app-loader" aria-hidden="true">
          <div className="passport-loader">
            {/* Ícone de passaporte */}
            <Image src="/passport.svg" alt="Passaporte" width={120} height={120} />
            {/* Avião orbitando */}
            <div className="plane">
              <Image src="/plane.svg" alt="Avião" width={60} height={60} />
            </div>
          </div>
          <span className="loader-text">Carregando…</span>
        </div>


        <StyledComponentsRegistry>
          <Providers>
            <CookieConsentProvider>
              <div id="app-root">{children}</div>
            </CookieConsentProvider>
          </Providers>
        </StyledComponentsRegistry>

        <HydrateClient />
        <Analytics />
      </body>
    </html>
  );
}
