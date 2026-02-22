import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MeshGradient } from "@/components/mesh-gradient";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krisantha-sarma.dev"),
  title: "Krisantha Sarma | Full Stack Engineer — C#, .NET 8, Blazor",
  description:
    "Full Stack Engineer with 8+ years experience. Specialist in C#, .NET 8, Blazor, and SAP integration. Delivered 15+ mission-critical enterprise applications for global manufacturing. Open to remote work.",
  keywords: [
    "Full Stack Engineer",
    "C#",
    ".NET 8",
    "Blazor",
    "ASP.NET Core",
    "SAP Integration",
    "Enterprise Applications",
    "Blazor Server",
    "Blazor Hybrid",
    ".NET MAUI",
    "SQL Server",
    "Entity Framework Core",
    "SignalR",
    "MudBlazor",
    "React",
    "TypeScript",
    "Remote Developer",
    "Software Engineer Sri Lanka",
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
    siteName: "Krisantha Sarma — Full Stack Engineer",
    title: "Krisantha Sarma | Full Stack Engineer — C#, .NET 8, Blazor",
    description:
      "Full Stack Engineer with 8+ years experience. Specialist in C#, .NET 8, Blazor, and SAP integration. 15+ enterprise applications delivered. Open to remote work.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Krisantha Sarma - Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krisantha Sarma | Full Stack Engineer — C#, .NET 8, Blazor",
    description:
      "Full Stack Engineer with 8+ years experience. Specialist in C#, .NET 8, Blazor, and SAP integration. 15+ enterprise applications delivered. Open to remote work.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.svg', type: 'image/svg+xml' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen antialiased ${inter.variable} font-sans`}>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <MeshGradient />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
