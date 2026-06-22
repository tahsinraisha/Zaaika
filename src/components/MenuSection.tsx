"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search } from "lucide-react";
import CategoryTabs from "@/components/CategoryTabs";
import MenuCard from "@/components/MenuCard";
import type { MenuItem } from "@/types";
import { MENU_ITEMS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function MenuSection() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let list = category === "all" ? MENU_ITEMS : MENU_ITEMS.filter((m) => m.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [category, query]);

  // GSAP heading reveal on scroll
  useEffect(() => {
    if (!headingRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 82%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="bg-cream pb-24 pt-16">
      {/* Section heading */}
      <div ref={headingRef} className="container-app mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-spice">
          Our Menu
        </span>
        <h2 className="mt-3 font-display text-4xl font-semibold text-charcoal md:text-5xl">
          What would you like today?
        </h2>
        <p className="mt-3 max-w-lg text-base text-muted">
          Everything is made to order. Browse by category, search a dish, and
          build your meal at your own pace.
        </p>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 border-b border-warm-200 bg-cream/95 backdrop-blur-sm">
        <div className="container-app flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <CategoryTabs active={category} onChange={setCategory} />

          {/* Search */}
          <div className="relative w-full sm:w-52 shrink-0">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Search dishes…"
              className="input-field py-2 pl-9 text-sm"
              aria-label="Search menu"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container-app mt-8">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              key={category + query}
              layout
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filtered.map((item: MenuItem, i: number) => (
                <MenuCard key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 py-24 text-center"
            >
              <span className="text-4xl">🍽️</span>
              <p className="font-display text-xl font-semibold text-charcoal">
                Nothing matched "{query}"
              </p>
              <p className="text-sm text-muted">
                Try a different search or browse a category.
              </p>
              <button
                onClick={() => { setQuery(""); setCategory("all"); }}
                className="btn-ghost mt-2"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
