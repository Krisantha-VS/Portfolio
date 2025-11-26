import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Experience } from "@/components/sections/experience";
import { Achievements } from "@/components/sections/achievements";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { FloatingActionButton } from "@/components/floating-action-button";
import { ScrollToTop } from "@/components/scroll-to-top";
import { StructuredData } from "@/components/structured-data";

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        <Stats />
        <About />
        <Services />
        <Process />
        <Experience />
        <Achievements />
        <Projects />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
        <FloatingActionButton />
        <ScrollToTop />
      </main>
    </>
  );
}
