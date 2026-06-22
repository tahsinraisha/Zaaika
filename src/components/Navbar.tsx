"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, UtensilsCrossed, Menu, X } from "lucide-react";
import { useCart } from "@/store/cart";

const NAV_LINKS = [
  { label: "Menu",     href: "#menu" },
  { label: "Starters", href: "#starters" },
  { label: "Biryani",  href: "#biryani" },
  { label: "About",    href: "#about" },
];

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevCount, setPrevCount] = useState(0);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trigger bounce animation when cart count increases
  useEffect(() => {
    if (totalItems > prevCount) {
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 600);
      return () => clearTimeout(t);
    }
    setPrevCount(totalItems);
  }, [totalItems, prevCount]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-warm-100"
          : "bg-transparent"
      }`}
    >
      <div className="container-app flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-spice text-white">
            <UtensilsCrossed size={16} strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-semibold text-charcoal">
            Zaaika
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-spice"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Cart button */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={openCart}
            animate={bounce ? { scale: [1, 1.22, 0.9, 1.08, 1] } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            aria-label={`Open cart — ${totalItems} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-warm-200 bg-white text-charcoal transition-colors hover:border-spice hover:text-spice"
          >
            <ShoppingBag size={18} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-spice font-mono text-[0.6rem] font-bold text-white"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile hamburger */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-warm-200 bg-white text-charcoal md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o: boolean) => !o)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-warm-100 bg-white md:hidden"
          >
            <div className="container-app flex flex-col py-4 gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal-soft transition-colors hover:bg-spice-faint hover:text-spice"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => { openCart(); setMobileOpen(false); }}
                className="btn-spice mt-2 w-full justify-center"
              >
                <ShoppingBag size={16} />
                View Order ({totalItems})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
