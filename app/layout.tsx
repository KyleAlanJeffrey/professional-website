import { AppProvider } from "@/components/providers/app-provider";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kylejeffrey.com"),
  title: {
    default: "Kyle Jeffrey | Robotics Software Engineer Portfolio",
    template: "%s | Kyle Jeffrey",
  },
  description:
    "Kyle Jeffrey is a robotics software engineer building autonomy, AI systems, and full-stack web products. Explore projects, publications, and engineering work.",
  keywords: [
    "Kyle Jeffrey",
    "robotics software engineer",
    "autonomy engineer",
    "AI software engineer",
    "full stack developer portfolio",
    "robotics portfolio",
    "software projects",
    "engineering publications",
  ],
  authors: [{ name: "Kyle Jeffrey", url: "https://kylejeffrey.com" }],
  creator: "Kyle Jeffrey",
  category: "technology",

  openGraph: {
    type: "website",
    url: "https://kylejeffrey.com",
    siteName: "Kyle Jeffrey",
    title: "Kyle Jeffrey | Robotics Software Engineer Portfolio",
    description: "Robotics, autonomy, and full-stack software projects by Kyle Jeffrey.",
    images: [
      {
        url: "/me-hero.webp",
        width: 1200,
        height: 1200,
        alt: "Kyle Jeffrey — code, design, and writing",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kyle Jeffrey | Robotics Software Engineer Portfolio",
    description: "Robotics, autonomy, and full-stack software projects by Kyle Jeffrey.",
    images: ["/me-hero.webp"],
    creator: "@KyleJef84225678",
  },

  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [],
    other: [],
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  referrer: "origin-when-cross-origin",

  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },

  verification: {
    // Fill these once you set them up:
    // google: "xxxxx",
    // me: ["mailto:you@domain.com", "https://your-mastodon.example/@you"]
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = "G-G52TGZCL9E";
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://kylejeffrey.com/#website",
        url: "https://kylejeffrey.com",
        name: "Kyle Jeffrey",
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": "https://kylejeffrey.com/#person",
        name: "Kyle Jeffrey",
        url: "https://kylejeffrey.com",
        email: "mailto:kyle.alan.jeffrey@gmail.com",
        jobTitle: "Robotics Software Engineer",
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          addressCountry: "US",
        },
        sameAs: [
          "https://github.com/KyleAlanJeffrey",
          "https://www.linkedin.com/in/kyle-jeffrey-1651b5189/",
          "https://x.com/KyleJef84225678",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://kylejeffrey.com/#service",
        name: "Kyle Jeffrey Engineering",
        url: "https://kylejeffrey.com",
        areaServed: "US",
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          addressCountry: "US",
        },
        founder: {
          "@id": "https://kylejeffrey.com/#person",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.github.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.shields.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(() => {
  try {
    const t = localStorage.getItem("theme");
    if (t === "light") return;
    document.documentElement.classList.add("dark");
    if (!t) localStorage.setItem("theme", "dark");
  } catch (_) {}
})();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      </head>
      <body>
        <AppProvider>
        {children}
        </AppProvider>
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "598d535d83d9428dbc1a9b4b3f6dc273"}'
          strategy="lazyOnload"
        />
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
            <Script
              id="google-analytics"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        ) : null}
        {fbPixelId ? (
          <Script
            id="facebook-pixel"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${fbPixelId}');
fbq('track', 'PageView');
              `,
            }}
          />
        ) : null}
      </body>
    </html>
  );
}
