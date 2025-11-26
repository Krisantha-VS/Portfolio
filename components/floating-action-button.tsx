"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mail, Phone, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quickActions = [
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${personalInfo.email}`,
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Phone,
      label: "Call",
      href: `tel:${personalInfo.phone}`,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: personalInfo.social.linkedin,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Quick Actions */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute bottom-20 right-0 space-y-3"
              >
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.a
                      key={index}
                      href={action.href}
                      target={action.href.startsWith("http") ? "_blank" : undefined}
                      rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, x: -5 }}
                      className="flex items-center gap-3 group"
                    >
                      <span className="px-3 py-2 rounded-lg bg-background border border-border shadow-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {action.label}
                      </span>
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg",
                        `bg-gradient-to-r ${action.color}`
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Button
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "w-14 h-14 rounded-full shadow-2xl transition-all duration-300",
                isOpen
                  ? "bg-gradient-to-r from-red-500 to-pink-500"
                  : "bg-gradient-to-r from-purple-500 to-pink-500"
              )}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MessageCircle className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
