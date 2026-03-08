import type { Metadata } from "next";
import { ExploreClient } from "@/components/explore/explore-client";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Live Work | Krisantha Sarma",
  description:
    "Production-grade applications built and maintained by Krisantha Sarma. Live demos, full source code, and real users.",
};

export default function ExplorePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <ExploreClient />
      </main>
      <Footer />
    </>
  );
}
