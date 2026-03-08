import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://askin-workspace.vercel.app";

export const metadata: Metadata = {
  title: "Aşkın Fear — Full-Stack Developer | Melbourne, Australia",
  description:
    "Full-stack developer based in Melbourne, Australia. Specialising in React, Next.js, Node.js, TypeScript, PostgreSQL, and cloud infrastructure. Building production SaaS platforms from front-end to deployment.",

  keywords: [
    "Full Stack Developer Australia",
    "Full Stack Developer Melbourne",
    "Frontend Developer Melbourne",
    "React Developer Australia",
    "Next.js Developer",
    "Node.js Developer Australia",
    "TypeScript Developer",
    "PostgreSQL Developer",
    "JavaScript Developer Melbourne",
    "SaaS Developer Australia",
    "Hire Full Stack Developer Australia",
    "Askin Fear",
    "Workforce Management SaaS",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Express",
    "Firebase",
    "AWS",
    "Stripe",
    "REST API",
    "Tailwind CSS",
    "Vercel",
  ],

  authors: [{ name: "Aşkın Fear", url: SITE_URL }],
  creator: "Aşkın Fear",

  metadataBase: new URL(SITE_URL),

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Aşkın Fear — Full-Stack Developer | Melbourne, Australia",
    description:
      "Full-stack developer based in Melbourne, Australia. Building production SaaS platforms with React, Next.js, Node.js, TypeScript, and PostgreSQL — end-to-end, start to ship.",
    siteName: "Aşkın Fear — Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aşkın Fear – Full-Stack Developer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aşkın Fear — Full-Stack Developer | Melbourne, Australia",
    description:
      "Full-stack developer in Melbourne. React, Next.js, Node.js, TypeScript, PostgreSQL. Building production SaaS — end-to-end.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
