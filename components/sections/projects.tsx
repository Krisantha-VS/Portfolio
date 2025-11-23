"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { projects } from "@/data/portfolio";
import { ExternalLink, Star } from "lucide-react";

export function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise solutions and full-stack applications that drive business value
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 relative">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Animated Border */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20" />
                </div>

                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <CardTitle className="text-xl sm:text-2xl group-hover:gradient-text transition-all">
                      {project.title}
                    </CardTitle>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 space-y-4">
                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 text-xs sm:text-sm bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                      Key Highlights
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight, highlightIndex) => (
                        <div
                          key={highlightIndex}
                          className="flex items-center gap-2 px-3 py-1 bg-accent rounded-full"
                        >
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs sm:text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-3xl mx-auto glass">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Want to see more?
              </h3>
              <p className="text-muted-foreground mb-6">
                I've worked on 15+ mission-critical applications supporting 500+ concurrent users.
                These are just a few highlights of my work in enterprise application development,
                SAP integration, and full-stack engineering.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://github.com/Krisantha-VS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  View on GitHub →
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
