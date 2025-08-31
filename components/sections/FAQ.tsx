"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

const faqs = [
  {
    question: "What is WarmWeb?",
    answer: "WarmWeb is a decentralized static site hosting platform built on Filecoin's Warm Storage infrastructure. It enables developers to host websites with fast access, verifiable storage, and cryptographic integrity proofs.",
  },
  {
    question: "Is Filecoin Warm Storage different from cold storage?",
    answer: "Yes, Warm Storage provides faster access times compared to cold archive storage. It's optimized for websites and applications that need quick retrieval while maintaining the security and decentralization benefits of Filecoin.",
  },
  {
    question: "How do I upload a static site?",
    answer: "Simply drag and drop your dist/ folder or built static files into the upload interface. WarmWeb supports all common web formats including HTML, CSS, JavaScript, images, and other static assets.",
  },
  {
    question: "How is data integrity verified (PDP)?",
    answer: "WarmWeb uses Filecoin's Proof of Data Possession (PDP) to ensure your files remain intact and uncorrupted. These cryptographic proofs provide verifiable evidence that your data is stored correctly on the network.",
  },
  {
    question: "How fast is retrieval?",
    answer: "Warm Storage provides CDN-like performance with global availability. Most content loads within seconds, making it suitable for production websites and applications that require fast user experiences.",
  },
  {
    question: "How do payments work?",
    answer: "WarmWeb uses a pay-as-you-go model with transparent, on-chain payments. You only pay for the storage and bandwidth you actually use, with all receipts recorded on the blockchain for full transparency.",
  },
  {
    question: "Can I migrate from IPFS or other hosts?",
    answer: "Absolutely! WarmWeb is designed to be migration-friendly. You can easily move existing static sites from IPFS, traditional web hosts, or other decentralized platforms with minimal configuration changes.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about WarmWeb and Filecoin Warm Storage hosting.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-2 border-transparent hover:border-primary/20 transition-colors"
                >
                  <AccordionTrigger
                    value={`item-${index}`}
                    className="text-left text-lg font-semibold hover:text-primary transition-colors"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent value={`item-${index}`} className="text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}