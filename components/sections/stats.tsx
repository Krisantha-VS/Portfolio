"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { stats } from "@/data/portfolio";
import { Calendar, CheckCircle2, Users, GitCommit, Users2, TrendingUp } from "lucide-react";

const iconMap: Record<string, any> = {
  Calendar,
  CheckCircle2,
  Users,
  GitCommit,
  Users2,
  TrendingUp
};

export function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const extractNumber = (value: string): number => {
    const match = value.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const extractSuffix = (value: string): string => {
    return value.replace(/\d+/, "");
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Impact by <span className="gradient-text">Numbers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real projects
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            const number = extractNumber(stat.value);
            const suffix = extractSuffix(stat.value);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-2 gradient-text">
                  {inView && (
                    <>
                      <CountUp end={number} duration={2.5} />
                      {suffix}
                    </>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
