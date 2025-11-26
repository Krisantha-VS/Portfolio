"use client";

import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Achievements } from "@/components/sections/achievements";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { StructuredData } from "@/components/structured-data";

export default function Home() {
  return (
    <main className="min-h-screen">
      <StructuredData />
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Achievements />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
