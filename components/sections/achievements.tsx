"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Shield, Zap, Target, Trophy, Star } from "lucide-react";

const achievements = [
  {
    icon: Award,
    title: "Enterprise Expert",
    description: "15+ mission-critical applications deployed",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "ISO Certified",
    description: "5S, Lean Manufacturing, ISO Standards",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Performance Pro",
    description: "35% average performance improvement",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Target,
    title: "SAP Integration Master",
    description: "$50K+ annual cost savings delivered",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Trophy,
    title: "Code Quality Champion",
    description: "45% code reduction through optimization",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Star,
    title: "Scale Specialist",
    description: "500+ concurrent users supported",
    color: "from-pink-500 to-rose-500",
  },
];

export function Achievements() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Achievements & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognized excellence in enterprise development and continuous improvement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                      {/* Glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${achievement.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />

                      {/* Icon container */}
                      <div className={`relative w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
