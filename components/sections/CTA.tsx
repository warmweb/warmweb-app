"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]" />
              
              <CardContent className="relative p-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-bold">
                      Ready to try <span className="text-primary">WarmWeb</span>?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      Be among the first to experience decentralized static site hosting on Filecoin. 
                      Join our early access program and get notified when we launch.
                    </p>
                  </div>

                  {!isSubmitted ? (
                    <motion.form
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="max-w-md mx-auto space-y-4"
                    >
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting || !email}
                          className="px-8 whitespace-nowrap"
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="mr-2"
                              >
                                <ArrowRight className="h-4 w-4" />
                              </motion.div>
                              Joining...
                            </>
                          ) : (
                            <>
                              Request Access
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        No spam, just updates on WarmWeb development and early access.
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="space-y-4"
                    >
                      <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
                          You&apos;re on the list! 🎉
                        </h3>
                        <p className="text-green-700 dark:text-green-300">
                          We&apos;ll notify you as soon as WarmWeb is ready for early access.
                        </p>
                      </div>
                      <Button variant="outline" onClick={scrollToTop} className="mt-6">
                        Back to Top
                      </Button>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="pt-8 border-t border-border/50"
                  >
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        ✨ Early access pricing
                      </span>
                      <span className="flex items-center gap-2">
                        📚 Priority support
                      </span>
                      <span className="flex items-center gap-2">
                        🚀 Beta features
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}