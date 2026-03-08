"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { projects, personalInfo } from "@/data/portfolio";
import { Github, Lock, Filter, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "All" | "Enterprise" | "Freelance" | "Open Source";

const categoryConfig: Record<
  Exclude<Category, "All">,
  { color: string; badge: string; dot: string }
> = {
  Enterprise: {
    color: "from-purple-500 to-violet-600",
    badge: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    dot: "bg-purple-400",
  },
  Freelance: {
    color: "from-amber-500 to-orange-500",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    dot: "bg-amber-400",
  },
  "Open Source": {
    color: "from-emerald-500 to-teal-500",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
};

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  useEffect(() => {
    const handler = (e: Event) => {
      const category = (e as CustomEvent).detail as Category;
      if (category) setSelectedCategory(category);
    };
    window.addEventListener("set-project-filter", handler);
    return () => window.removeEventListener("set-project-filter", handler);
  }, []);

  const counts = {
    All: projects.length,
    Enterprise: projects.filter((p) => p.category === "Enterprise").length,
    Freelance: projects.filter((p) => p.category === "Freelance").length,
    "Open Source": projects.filter((p) => p.category === "Open Source").length,
  };

  const categories: Category[] = ["All", "Enterprise", "Freelance", "Open Source"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
  };

  return (
    <section id="projects" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Work & <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Enterprise systems, freelance builds, and open source — a complete
            picture of what I ship
          </p>

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground mr-1" />
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                      : "bg-background/60 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground",
                    category === "Open Source" && !isActive && "border-emerald-500/40 text-emerald-400 animate-pulse hover:animate-none"
                  )}
                >
                  {category !== "All" && (
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full",
                        isActive
                          ? "bg-primary-foreground/70"
                          : categoryConfig[category as Exclude<Category, "All">].dot
                      )}
                    />
                  )}
                  {category}
                  <span
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {counts[category]}
                  </span>
                  {category === "Open Source" && !isActive && (
                    <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => {
              const config =
                categoryConfig[project.category as Exclude<Category, "All">];
              return (
                <motion.div
                  key={`${project.category}-${project.title}`}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden glass border-white/10 dark:border-white/5 hover:border-primary/30 transition-all duration-500 relative flex flex-col rounded-[2rem] shadow-2xl hover:shadow-primary/20">
                    {/* Hover gradient overlay (Enhanced) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <CardHeader className="relative z-10 pb-4 pt-8 px-8">
                      {/* Category badge + period */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full border",
                            config.badge
                          )}
                        >
                          <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", config.dot)} />
                          {project.category}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-0.5 rounded-md">
                          {project.period}
                        </span>
                      </div>

                      <CardTitle className="text-xl sm:text-2xl leading-tight font-black tracking-tighter group-hover:gradient-text transition-all duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed mt-2 text-muted-foreground/90 line-clamp-3">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10 flex flex-col gap-6 flex-1 px-8 pb-8 pt-2">
                      {/* Impact metric (Premium Box) */}
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors duration-500">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <p className="text-xs sm:text-sm font-extrabold text-primary leading-tight">
                          {project.impact}
                        </p>
                      </div>

                      {/* Technologies (Modern Tags) */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-[1px] flex-1 bg-border/50" />
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                            Tech Stack
                          </p>
                          <div className="h-[1px] flex-1 bg-border/50" />
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 text-[11px] font-bold bg-white/5 dark:bg-black/20 text-foreground/80 rounded-lg border border-white/10 dark:border-white/5 hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer: source indicator */}
                      <div className="mt-auto pt-6 border-t border-border/30">
                        {project.confidential ? (
                          <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground/70 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                              <Lock className="w-3.5 h-3.5" />
                              <span>Proprietary</span>
                            </div>
                            <span className="text-primary/60">Verified</span>
                          </div>
                        ) : project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-widest"
                          >
                            <Github className="w-4 h-4" />
                            View Source
                          </a>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Footer callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 dark:border-white/5">
            {/* Explore strip */}
            <div className="relative bg-gradient-to-r from-emerald-950/60 via-teal-950/40 to-emerald-950/60 border-b border-emerald-500/20 p-8 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
              <span className="relative inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                Live in production
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Want to see real apps running?</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                The Live Work section showcases production-grade applications with live demos, full source code, and real users.
              </p>
              <a
                href="/explore"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-emerald-500/25"
              >
                Live Work
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
            {/* GitHub strip */}
            <div className="bg-background/60 px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-xs text-muted-foreground">
                Enterprise projects are proprietary — NDAs in place, source not public.
              </p>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors shrink-0"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub repositories
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

