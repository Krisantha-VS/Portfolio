"use client";

import { useState } from "react";
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
      transition: { duration: 0.45, ease: "easeOut" },
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
                      : "bg-background/60 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
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
                  whileHover={{ y: -6 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 relative flex flex-col">
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <CardHeader className="relative z-10 pb-3">
                      {/* Category badge + period */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border",
                            config.badge
                          )}
                        >
                          <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
                          {project.category}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {project.period}
                        </span>
                      </div>

                      <CardTitle className="text-lg sm:text-xl leading-snug">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed mt-1">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10 flex flex-col gap-4 flex-1">
                      {/* Impact metric */}
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-xs sm:text-sm font-medium text-primary leading-snug">
                          {project.impact}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                          Stack
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2.5 py-1 text-xs bg-secondary text-secondary-foreground rounded-md border border-border/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.highlights.map((highlight, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-xs bg-primary/8 text-primary/80 rounded-full border border-primary/15"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* Footer: source indicator */}
                      <div className="mt-auto pt-3 border-t border-border/50">
                        {project.confidential ? (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Source confidential — proprietary system</span>
                          </div>
                        ) : project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline underline-offset-4 transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            View on GitHub
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
          className="mt-16 text-center"
        >
          <Card className="max-w-3xl mx-auto glass">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-3">
                Enterprise projects are listed without source links
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base mb-6">
                All VarioSystems applications are proprietary internal systems.
                NDAs are in place and source code is not publicly available.
                Open source work and freelance builds are linked directly above.
              </p>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4 font-medium text-sm"
              >
                <Github className="w-4 h-4" />
                View public repositories on GitHub
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

