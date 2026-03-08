import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MeshGradient } from "@/components/mesh-gradient";
import { ThemeProvider } from "@/components/theme-provider";

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <MeshGradient />
      <div className="min-h-screen">
        {/* Mini top bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center px-4 border-b border-border bg-background/80 backdrop-blur-sm">
          <Link
            href="/explore"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Live Work
          </Link>
        </div>
        <div className="pt-12">{children}</div>
      </div>
    </ThemeProvider>
  );
}
