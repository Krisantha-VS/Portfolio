"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { apps, categories, statusConfig, type AppCategory } from "@/data/apps";
import { AppCard } from "./app-card";
import { FeaturedApp } from "./featured-app";
import { cn } from "@/lib/utils";

export function ExploreClient() {
  const [activeCategory, setActiveCategory] = useState<AppCategory | "all">("all");

  const featured = apps.find(a => a.featured);
  const filtered  = apps
    .filter(a => !a.featured)
    .filter(a => activeCategory === "all" || a.category === activeCategory);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to portfolio
        </Link>
      </motion.div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
          Platform · {apps.filter(a => a.status === "live" || a.status === "beta").length} live · {apps.filter(a => a.status === "coming-soon").length} in progress
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Built for <span className="gradient-text">real use</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real applications solving real problems — not toy demos. Each one is live, fully functional, and open to explore. AuthSaas powers the auth for everything else on this page.
        </p>
      </motion.div>

      {/* Featured */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Featured
          </p>
          <FeaturedApp app={featured} />
        </motion.div>
      )}

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
              activeCategory === cat.key
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
            )}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* App grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((app, i) => (
            <motion.div
              key={app.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <AppCard app={app} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground py-16"
        >
          Nothing here yet — check back soon.
        </motion.p>
      )}

      {/* Status legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-16 pt-8 border-t border-border"
      >
        {Object.entries(statusConfig).map(([key, val]) => (
          <span key={key} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className={cn("px-2 py-0.5 rounded-full text-xs border", val.classes)}>
              {val.label}
            </span>
          </span>
        ))}
        <span className="text-sm text-muted-foreground">— app status</span>
      </motion.div>
    </div>
  );
}
