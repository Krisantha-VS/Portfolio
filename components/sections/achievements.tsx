"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Award, 
  TrendingUp, 
  Layers, 
  Code2, 
  Users 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const achievements = [
  {
    icon: Building2,
    title: "Enterprise Expert",
    description: "15+ mission-critical applications delivered",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    title: "ISO Certified",
    description: "5S, Lean Manufacturing, ISO standards trained",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Performance Pro",
    description: "35% performance improvements achieved",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Layers,
    title: "SAP Integration Master",
    description: "$50K+ annual savings via license optimization",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Code2,
    title: "Code Quality Champion",
    description: "45% code reduction through reusable components",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: Users,
    title: "Scale Specialist",
    description: "500+ concurrent users supported",
    color: "from-indigo-500 to-violet-500",
  },
];

export function Achievements() {
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
    <section id="achievements" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Achievements & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognized accomplishments and professional certifications
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 relative">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-4">
                      {/* Icon with glow effect */}
                      <div className={`relative p-3 rounded-xl bg-gradient-to-br ${achievement.color} shadow-lg`}>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-50 blur-sm animate-pulse" 
                          style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))` }}
                        />
                        <IconComponent className="w-6 h-6 text-white relative z-10" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1 group-hover:gradient-text transition-all">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
