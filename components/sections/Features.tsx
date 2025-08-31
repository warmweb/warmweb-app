"use client";

import { motion } from "framer-motion";
import { Server, Shield, Zap, Wallet, HandHeart, Link2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const features = [
  {
    icon: Server,
    title: "Warm Storage",
    description: "Fast access and durable storage for sites and assets.",
  },
  {
    icon: Shield,
    title: "Verifiable Storage (PDP)",
    description: "Cryptographic proofs ensure integrity end-to-end.",
  },
  {
    icon: Zap,
    title: "Synapse SDK Integration",
    description: "One SDK for storage + payments, fewer moving parts.",
  },
  {
    icon: Link2,
    title: "CDN-style Retrieval",
    description: "Serve content quickly with standardized endpoints.",
  },
  {
    icon: Wallet,
    title: "On-chain Payments",
    description: "Pay only for what you use with transparent receipts.",
  },
  {
    icon: HandHeart,
    title: "Beginner-Friendly",
    description: "Simple UI, clear docs, zero-to-deploy in minutes.",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="text-primary">WarmWeb</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Built on Filecoin's robust infrastructure with cutting-edge features for modern web hosting.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div key={feature.title} variants={item}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary/20">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {feature.description}
                    </p>
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