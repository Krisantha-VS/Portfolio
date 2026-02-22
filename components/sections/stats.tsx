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

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            const number = extractNumber(stat.value);
            const suffix = extractSuffix(stat.value);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass p-6 rounded-[2rem] border border-white/10 dark:border-white/5 flex flex-col items-center justify-between text-center group transition-all duration-500 shadow-xl hover:shadow-primary/10"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <Icon className="w-7 h-7" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-4xl sm:text-5xl font-black mb-1 tracking-tighter text-foreground group-hover:gradient-text transition-all duration-500">
                    {inView ? (
                      <>
                        <CountUp end={number} duration={3} />
                        {suffix}
                      </>
                    ) : (
                      "0"
                    )}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 group-hover:text-primary transition-colors duration-500">
                    {stat.label}
                  </div>
                </div>

                {/* Subtle indicator line */}
                <div className="w-12 h-1 bg-primary/20 rounded-full mt-6 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
