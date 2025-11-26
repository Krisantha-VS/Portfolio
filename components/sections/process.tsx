"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { workProcess } from "@/data/portfolio";
import { CheckCircle2, Clock, FileText } from "lucide-react";

export function Process() {
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
            How I <span className="gradient-text">Work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven process that delivers exceptional results every time
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-full" />

          <div className="space-y-12">
            {workProcess.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step Number */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 items-center justify-center z-10 shadow-xl shadow-purple-500/30">
                  <span className="text-2xl font-bold text-white">{process.step}</span>
                </div>

                {/* Content */}
                <div className="w-full md:w-[calc(50%-3rem)]">
                  <Card className="hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6 sm:p-8">
                      {/* Mobile step number */}
                      <div className="flex md:hidden items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                          <span className="text-xl font-bold text-white">{process.step}</span>
                        </div>
                        <h3 className="text-2xl font-bold">{process.title}</h3>
                      </div>

                      {/* Desktop title */}
                      <h3 className="hidden md:block text-2xl font-bold mb-4">{process.title}</h3>

                      <p className="text-muted-foreground mb-4">
                        {process.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-medium">Duration: {process.duration}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-4 h-4 text-primary" />
                          <h4 className="text-sm font-semibold">Deliverables:</h4>
                        </div>
                        <ul className="space-y-2">
                          {process.deliverables.map((deliverable, dIndex) => (
                            <li key={dIndex} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-[calc(50%-3rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
