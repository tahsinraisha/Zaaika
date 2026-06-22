"use client";

import { useRef, type RefObject } from "react";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/data";

interface CategoryTabsProps {
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

  return (
    <div
      ref={scrollRef}
      className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1"
      role="tablist"
      aria-label="Menu categories"
    >
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.id)}
            className="relative flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors"
            style={{ color: isActive ? "#fff" : "#78706a" }}
          >
            {isActive && (
              <motion.span
                layoutId="cat-pill"
                className="absolute inset-0 rounded-full bg-spice"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            <span className="relative z-10">{cat.emoji}</span>
            <span className="relative z-10">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
