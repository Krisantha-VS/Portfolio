"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen, ArrowRight } from "lucide-react";
import { type AppData, statusConfig } from "@/data/apps";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FeaturedApp({ app }: { app: AppData }) {
  const status = statusConfig[app.status];

  return (
    <div className="glass rounded-2xl overflow-hidden border border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

        {/* Left — content */}
        <div className="p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Status + category */}
            <div className="flex items-center gap-3 mb-6">
              <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", status.classes)}>
                {status.label}
              </span>
              <span className="text-xs text-muted-foreground capitalize">{app.category}</span>
            </div>

            {/* Name */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{app.icon}</span>
              <h2 className="text-2xl font-bold">{app.name}</h2>
            </div>
            <p className="text-primary font-medium mb-3">{app.tagline}</p>
            <p className="text-muted-foreground leading-relaxed">{app.description}</p>

            {app.benefit && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mt-3 mb-6">
                <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
                <p className="text-sm text-emerald-300/90 leading-relaxed">{app.benefit}</p>
              </div>
            )}

            {!app.benefit && <div className="mb-6" />}

            {/* Features */}
            <ul className="grid grid-cols-2 gap-2 mb-8">
              {app.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            {app.demoUrl && (
              <Button variant="gradient" asChild>
                <a href={app.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Launch App
                </a>
              </Button>
            )}
            {app.docsUrl && (
              <Button variant="outline" asChild>
                <a href={app.docsUrl} target="_blank" rel="noopener noreferrer">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Docs
                </a>
              </Button>
            )}
            {app.sourceUrl && (
              <Button variant="ghost" asChild>
                <a href={app.sourceUrl} target="_blank" rel="noopener noreferrer">
                  Source
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Right — visual */}
        <div className={cn(
          "hidden lg:flex items-center justify-center p-10 bg-gradient-to-br opacity-80",
          app.gradient
        )}>
          <div className="text-center">
            <motion.span
              className="text-8xl block mb-6 drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {app.icon}
            </motion.span>
            {/* Tech stack pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {app.tech.map(t => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
