"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal">
      {/* Background image with parallax-like scale on load */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="https://images.unsplash.com/photo-1742599361498-79824d24e355?auto=format&fit=crop&w=2000&q=85"
          alt="Zaaika signature butter chicken, rich and aromatic"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="container-app relative z-10 flex min-h-[100svh] flex-col justify-end pb-24 pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 flex items-center gap-2"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-spice">
            <Star size={11} className="fill-white text-white" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-warm-300">
            Est. 2012 · Award-winning Indian cuisine
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="max-w-3xl font-display text-5xl font-semibold leading-[1.05] text-white text-balance sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Real flavour,
            <br />
            <span className="italic text-spice">ordered your way.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-md text-base leading-relaxed text-warm-300 md:text-lg"
        >
          Handcrafted curries, biryanis and tandoor dishes — made fresh
          every day, ready to collect or delivered to your door.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a href="#menu" className="btn-spice text-base px-7 py-3.5 shadow-lg">
            Browse Menu
          </a>
          <a href="#about" className="flex items-center gap-2 text-sm font-medium text-warm-300 transition-colors hover:text-white">
            Our story →
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/15 pt-8"
        >
          {[
            { val: "4.9★", label: "on Google" },
            { val: "30–45", label: "min delivery" },
            { val: "Free", label: "over £30" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-xl font-bold text-white">{stat.val}</p>
              <p className="mt-0.5 text-xs text-warm-300">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-label="Scroll to menu"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-warm-300 transition-colors hover:text-white"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-spice" />
        </motion.div>
      </motion.a>
    </section>
  );
}
