"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin, Phone, ArrowDown } from "lucide-react";
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text leading-tight"
            >
              {personalInfo.name}
            </motion.h1>

            {/* Typing title */}
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-foreground min-h-[2.5rem]"
            >
              <TypeAnimation
                sequence={[
                  "Full Stack Engineer",
                  2000,
                  "Enterprise .NET Developer",
                  2000,
                  "SAP Integration Specialist",
                  2000,
                  "Blazor & C# Engineer",
                  2000,
                  ".NET 8 Architect",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground mb-3 max-w-xl mx-auto lg:mx-0"
            >
              {personalInfo.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-muted-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {personalInfo.description}
            </motion.p>

            {/* Highlights */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="glass px-4 py-3 rounded-lg"
                >
                  <p className="text-xs sm:text-sm font-medium text-primary">
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
                onClick={handleContact}
                className="w-full sm:w-auto"
              >
                Get In Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
                asChild
              >
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn Profile
                </a>
              </Button>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex-shrink-0 flex items-center justify-center"
          >
            {/* Outer glow ring */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 opacity-30 blur-xl animate-pulse" />

              {/* Gradient border ring */}
              <div className="relative p-[3px] rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 shadow-2xl">
                {/* Inner padding + photo */}
                <div className="rounded-full overflow-hidden bg-background p-[3px]">
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden">
                    <Image
                      src="/profile.jpg"
                      alt="Krisantha Sarma — Full Stack Engineer"
                      fill
                      sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Floating badge — years experience */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.4, type: "spring" }}
                className="absolute -bottom-2 -left-4 glass px-3 py-2 rounded-xl border border-primary/20 shadow-lg"
              >
                <p className="text-xs font-semibold text-primary">8+ Years</p>
                <p className="text-xs text-muted-foreground">Experience</p>
              </motion.div>

              {/* Floating badge — enterprise apps */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.4, type: "spring" }}
                className="absolute -top-2 -right-4 glass px-3 py-2 rounded-xl border border-primary/20 shadow-lg"
              >
                <p className="text-xs font-semibold text-primary">15+ Apps</p>
                <p className="text-xs text-muted-foreground">Delivered</p>
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
