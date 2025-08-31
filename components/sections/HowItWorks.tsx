"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Database, Share, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    icon: Upload,
    title: "Zip & Upload",
    description: "Drop your dist/ or static files.",
    details: "Simply drag and drop your built static site files, or select them from your file system. We support all common web formats.",
  },
  {
    icon: Database,
    title: "WarmStore",
    description: "Contract receives + verifies (PDP) and stores.",
    details: "Your files are processed through Filecoin's Warm Storage with Proof of Data Possession (PDP) verification ensuring integrity.",
  },
  {
    icon: Share,
    title: "Share",
    description: "Get a content URL/ID for instant retrieval.",
    details: "Receive a permanent, decentralized URL for your site with fast CDN-style access and verifiable storage receipts.",
  },
];

const codeSnippet = `import { SynapseClient } from "@synapse/sdk";

const client = new SynapseClient({ 
  apiKey: process.env.NEXT_PUBLIC_SYNAPS_KEY 
});

export async function uploadToWarmStorage(file: File) {
  // TODO: Wire to FilecoinWarmStorageService
  const job = await client.jobs.create({
    type: "warm-storage",
    metadata: { filename: file.name, size: file.size },
  });
  // Upload flow (placeholder)
  return job; // { id, status, receipt }
}`;

export function HowItWorksSection() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="how" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Three simple steps to get your static site hosted on Filecoin's decentralized infrastructure.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
                  )}
                  
                  <Card className="relative z-10 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 relative">
                        <IconComponent className="h-8 w-8 text-primary" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.details}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="bg-slate-900 dark:bg-slate-950 border-primary/20">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4 border-b border-primary/20">
                  <h3 className="text-lg font-semibold text-slate-100">
                    Future Synapse SDK Integration
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="text-slate-300 hover:text-slate-100 hover:bg-slate-800"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <pre className="p-6 text-sm text-slate-300 overflow-x-auto">
                  <code>{codeSnippet}</code>
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}