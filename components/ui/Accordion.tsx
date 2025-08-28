"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  openItems: Set<string>;
  toggleItem: (value: string) => void;
  type?: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue>({
  openItems: new Set(),
  toggleItem: () => {},
  type: "single",
});

interface AccordionProps {
  type?: "single" | "multiple";
  children: React.ReactNode;
  className?: string;
}

const Accordion = ({ type = "single", children, className }: AccordionProps) => {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        const newSet = new Set(prev);
        if (type === "single") {
          // Single mode: close all, open only the clicked one
          if (newSet.has(value)) {
            newSet.clear();
          } else {
            newSet.clear();
            newSet.add(value);
          }
        } else {
          // Multiple mode: toggle the clicked item
          if (newSet.has(value)) {
            newSet.delete(value);
          } else {
            newSet.add(value);
          }
        }
        return newSet;
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionItem = ({ value, children, className }: AccordionItemProps) => {
  const { openItems } = React.useContext(AccordionContext);
  const isOpen = openItems.has(value);

  return (
    <div
      className={cn(
        "border rounded-lg bg-card overflow-hidden",
        isOpen && "shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

interface AccordionTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = ({ value, children, className }: AccordionTriggerProps) => {
  const { openItems, toggleItem } = React.useContext(AccordionContext);
  const isOpen = openItems.has(value);

  return (
    <button
      onClick={() => toggleItem(value)}
      className={cn(
        "flex w-full items-center justify-between p-6 text-left font-medium transition-all hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${value}`}
      id={`accordion-trigger-${value}`}
    >
      <span>{children}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="shrink-0"
      >
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      </motion.div>
    </button>
  );
};

interface AccordionContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionContent = ({ value, children, className }: AccordionContentProps) => {
  const { openItems } = React.useContext(AccordionContext);
  const isOpen = openItems.has(value);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
          id={`accordion-content-${value}`}
          aria-labelledby={`accordion-trigger-${value}`}
          role="region"
        >
          <div className={cn("px-6 pb-6 pt-0 text-muted-foreground", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };