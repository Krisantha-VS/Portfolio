"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/portfolio";
import {
  Code2,
  Database,
  RefreshCw,
  Zap,
  Boxes,
  FileSearch,
  Users,
  Workflow,
  Check,
  Clock,
  Star,
  ArrowRight
} from "lucide-react";

const iconMap: Record<string, any> = {
  Code2,
  Database,
  RefreshCw,
  Zap,
  Boxes,
  FileSearch,
  Users,
  Workflow
};

export function Services() {
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

  const handleContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Services & <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Premium development services backed by enterprise experience and proven results
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>100% satisfaction guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>30-90 day warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>NDA & contracts available</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg">
                      <Star className="w-3 h-3 fill-white" />
                      Most Popular
                    </span>
                  </div>
                )}
                <Card className={`h-full transition-all duration-300 ${
                  service.popular
                    ? "border-primary shadow-lg shadow-primary/20 scale-105"
                    : "hover:shadow-xl hover:scale-105"
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${
                        index % 4 === 0 ? "from-purple-500 to-pink-500" :
                        index % 4 === 1 ? "from-blue-500 to-cyan-500" :
                        index % 4 === 2 ? "from-green-500 to-emerald-500" :
                        "from-orange-500 to-red-500"
                      } group-hover:shadow-lg transition-shadow`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Pricing */}
                    <div className="p-4 rounded-lg bg-accent space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold gradient-text">
                          {service.pricing.hourly}
                        </span>
                        <span className="text-sm text-muted-foreground">hourly</span>
                      </div>
                      <div className="text-sm font-medium">
                        {service.pricing.project}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{service.delivery}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h5 className="text-sm font-semibold mb-3">What's Included:</h5>
                      <ul className="space-y-2">
                        {service.features.slice(0, 5).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                        {service.features.length > 5 && (
                          <li className="text-xs text-muted-foreground pl-6">
                            +{service.features.length - 5} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Button
                      variant={service.popular ? "gradient" : "outline"}
                      className="w-full"
                      onClick={handleContact}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Custom Pricing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Card className="max-w-3xl mx-auto glass">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Need something custom?
              </h3>
              <p className="text-muted-foreground mb-6">
                Every project is unique. Let's discuss your specific requirements and create
                a tailored solution that fits your needs and budget.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="gradient" size="lg" onClick={handleContact}>
                  Request Custom Quote
                </Button>
                <Button variant="outline" size="lg" onClick={handleContact}>
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
