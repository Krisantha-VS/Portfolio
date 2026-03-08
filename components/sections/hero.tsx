"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin, Phone, ArrowDown, Download } from "lucide-react";
import { personalInfo, highlights } from "@/data/portfolio";
import Image from "next/image";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewLiveProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("set-project-filter", { detail: "Open Source" }));
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24"
    >
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 max-w-7xl mx-auto">

          {/* ── Left: Text Content ─────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Open to Remote Work
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 gradient-text tracking-tighter leading-[1.1]"
            >
              {personalInfo.name}
            </motion.h1>

            {/* Typing title */}
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-foreground/90 flex items-center justify-center lg:justify-start gap-2"
            >
              <span className="text-primary hidden sm:inline">I'm a</span>
              <TypeAnimation
                sequence={[
                  "Full Stack Engineer",
                  3000,
                  "Enterprise Architect",
                  3000,
                  "SAP Integration Expert",
                  3000,
                  "C# & .NET Specialist",
                  3000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="bg-primary/5 px-2 rounded-lg"
              />
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl font-medium text-foreground/80 mb-4 max-w-xl mx-auto lg:mx-0"
            >
              {personalInfo.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground/90 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              {personalInfo.description}
            </motion.p>

            {/* Highlights Grid (Bento Lite) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              {highlights.slice(0, 4).map((highlight, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass p-4 rounded-2xl border border-white/10 dark:border-white/5 flex flex-col gap-1 group transition-all duration-300"
                >
                  <div className="h-1.5 w-8 rounded-full bg-primary/30 group-hover:bg-primary transition-colors mb-1" />
                  <p className="text-sm font-bold text-foreground leading-snug">
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-7 text-sm text-muted-foreground"
            >
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">{personalInfo.email}</span>
              </a>
              <span className="hidden sm:inline text-border">·</span>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">{personalInfo.phone}</span>
              </a>
              <span className="hidden sm:inline text-border">·</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">{personalInfo.location}</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <Button
                size="lg"
                variant="gradient"
                className="w-full sm:w-auto"
                asChild
              >
                <a
                  href="/Krisantha_Sarma_CV.pdf"
                  download
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleContact}
                className="w-full sm:w-auto"
              >
                Get In Touch
              </Button>
            </motion.div>

            {/* Explore CTA */}
            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start mb-6">
              <a
                href="/explore"
                className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-200"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-sm font-medium text-emerald-400">Live Work</span>
                <svg className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <motion.a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── Right: Profile Photo ───────────────────────────────── */}
          {/* ── Right: Profile Photo ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex-shrink-0 flex items-center justify-center relative group lg:ml-auto px-10 pt-6 pb-8 sm:px-12 sm:pt-8 sm:pb-10"
          >
            {/* Outer glow */}
            <div className="absolute -inset-4 sm:-inset-8 rounded-[4rem] bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />

            {/* Squircle frame */}
            <div className="relative p-1 squircle bg-gradient-to-br from-white/20 via-white/5 to-transparent dark:from-white/10 dark:via-transparent dark:to-white/5 shadow-2xl backdrop-blur-sm">

              {/* Image */}
              <div className="squircle overflow-hidden bg-background p-1 relative profile-frame">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 squircle overflow-hidden bg-muted/30">
                  {/* Dark mode image */}
                  <Image
                    src="/profile.png"
                    alt="Krisantha Sarma — Full Stack Engineer"
                    fill
                    sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-in-out hidden dark:block"
                    priority
                  />
                  {/* Light mode image */}
                  <Image
                    src="/profile-old.jpg"
                    alt="Krisantha Sarma — Full Stack Engineer"
                    fill
                    sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-in-out block dark:hidden"
                    priority
                  />
                </div>
              </div>

              {/* Badge — years experience */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                className="absolute -bottom-2 -left-4 sm:-bottom-4 sm:-left-8 bg-white/85 dark:bg-gray-900/90 backdrop-blur-xl border border-white/40 dark:border-white/15 shadow-xl px-3 py-2 sm:px-5 sm:py-3 rounded-2xl z-20"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="font-bold text-base sm:text-lg">8+</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">Years</p>
                    <p className="text-xs sm:text-sm font-extrabold text-foreground leading-none">Experience</p>
                  </div>
                </div>
              </motion.div>

              {/* Badge — apps delivered */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
                className="absolute -top-2 -right-4 sm:-top-4 sm:-right-8 bg-white/85 dark:bg-gray-900/90 backdrop-blur-xl border border-white/40 dark:border-white/15 shadow-xl px-3 py-2 sm:px-5 sm:py-3 rounded-2xl z-20"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex flex-col text-right">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">Delivered</p>
                    <p className="text-xs sm:text-sm font-extrabold text-foreground leading-none">15+ Apps</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="font-bold text-sm sm:text-lg">⚡</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
