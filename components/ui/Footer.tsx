"use client";

import { motion } from "framer-motion";
import { Github, Twitter, MessageCircle } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how" },
    { name: "FAQ", href: "#faq" },
    { name: "Pricing", href: "#pricing" },
  ],
  Developers: [
    { name: "Documentation", href: "#docs" },
    { name: "API Reference", href: "#api" },
    { name: "GitHub", href: "https://github.com/warmweb" },
    { name: "Status", href: "#status" },
  ],
  Company: [
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Privacy", href: "#privacy" },
    { name: "Terms", href: "#terms" },
  ],
};

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/warmweb" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/warmweb" },
  { name: "Discord", icon: MessageCircle, href: "https://discord.gg/warmweb" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
              WarmWeb
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Decentralized static site hosting on Filecoin Warm Storage. Fast, verifiable, and easy to use.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (categoryIndex + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-muted-foreground text-sm">
            © {currentYear} WarmWeb. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">
            Powered by{" "}
            <span className="text-primary font-medium">Filecoin</span> and{" "}
            <span className="text-primary font-medium">Synapse SDK</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
