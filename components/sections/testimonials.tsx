"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { outcomes } from "@/data/portfolio";

export function Testimonials() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Delivered <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Measurable outcomes from production systems in global manufacturing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 h-full flex flex-col">
                  {/* Metric */}
                  <div className="text-5xl sm:text-6xl font-bold gradient-text mb-2 leading-none">
                    {outcome.metric}
                  </div>

                  {/* Label */}
                  <div className="text-lg font-semibold mb-4 text-foreground">
                    {outcome.label}
                  </div>

                  {/* Divider */}
                  <div className="w-12 h-0.5 bg-primary/30 mb-4 group-hover:w-full transition-all duration-500" />

                  {/* Detail */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {outcome.detail}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
