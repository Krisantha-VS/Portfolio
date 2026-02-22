"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { skills, softSkills, languages, bio } from "@/data/portfolio";
import {
  Code2,
  Database,
  Palette,
  Wrench,
  Briefcase,
  Users,
  Languages as LanguagesIcon,
  Server,
} from "lucide-react";

const skillCategories = [
  {
    title: "Frameworks",
    icon: Code2,
    items: skills.frameworks,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Languages",
    icon: Code2,
    items: skills.languages,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Databases",
    icon: Database,
    items: skills.databases,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Frontend & Style",
    icon: Palette,
    items: skills.frontend,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Libraries",
    icon: Server,
    items: skills.libraries,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Development Tools",
    icon: Wrench,
    items: skills.devTools,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Design Tools",
    icon: Palette,
    items: skills.design,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Office & Collaboration",
    icon: Briefcase,
    items: skills.office,
    color: "from-indigo-500 to-blue-500",
  },
];

export function About() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="about" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Full-stack engineer with enterprise .NET experience and a background
            in freelance web development
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card>
            <CardContent className="p-8 sm:p-10">
              <div className="space-y-5">
                {bio.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base sm:text-lg leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technical Skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-lg">
                          {category.title}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item, itemIndex) => (
                          <motion.span
                            key={itemIndex}
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 text-xs sm:text-sm bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Soft Skills & Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Soft Skills</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {softSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-accent hover:bg-accent/70 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex-shrink-0" />
                      <span className="text-sm">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500">
                    <LanguagesIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Languages</h3>
                </div>
                <div className="space-y-6">
                  {languages.map((lang, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {lang.level}
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width:
                              lang.level === "Native"
                                ? "100%"
                                : lang.level === "Fluent"
                                  ? "88%"
                                  : "65%",
                          }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.1 + 0.2,
                            duration: 0.6,
                          }}
                          className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
