import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Krisantha Sarma | Full Stack Engineer",
  description:
    "Full Stack Engineer architecting enterprise-scale applications for global manufacturing operations. Expert in C#, ASP.NET Core, and Blazor.",
  keywords: [
    "Full Stack Engineer",
    "C#",
    ".NET",
    "Blazor",
    "ASP.NET Core",
    "React",
    "TypeScript",
    "Software Developer",
    "Web Development",
    "Enterprise Applications",
    "SAP Integration",
  ],
  authors: [{ name: "Krisantha Sarma" }],
  creator: "Krisantha Sarma",
  publisher: "Krisantha Sarma",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://krisantha-sarma.dev",
    siteName: "Krisantha Sarma Portfolio",
    title: "Krisantha Sarma | Full Stack Engineer",
    description:
      "Full Stack Engineer architecting enterprise-scale applications. Expert in C#, ASP.NET Core, and Blazor.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Krisantha Sarma - Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krisantha Sarma | Full Stack Engineer",
    description:
      "Full Stack Engineer architecting enterprise-scale applications. Expert in C#, ASP.NET Core, and Blazor.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased font-sans">
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
