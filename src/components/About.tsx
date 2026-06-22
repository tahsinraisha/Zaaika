"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Clock, MapPin, Truck } from "lucide-react";

const STATS = [
  { icon: Award,  value: "4.9★",     label: "Google rating" },
  { icon: Clock,  value: "30–45",    label: "Min delivery" },
  { icon: Truck,  value: "Free",     label: "Over £30" },
  { icon: MapPin, value: "12+",      label: "Years serving" },
];

const PROMISES = [
  { emoji: "🌿", title: "Fresh daily",      body: "Every dish is made from scratch each morning. No frozen shortcuts, ever." },
  { emoji: "🌶️", title: "Spice your way",  body: "Tell us your heat preference — mild to very hot — and we'll cook to match." },
  { emoji: "🚀", title: "Quick dispatch",   body: "Most orders are out of the kitchen within 20 minutes of being placed." },
  { emoji: "✅", title: "Easy allergens",   body: "Every item is clearly labelled. Reach us directly for complex requirements." },
];

export default function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="container-app">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-warm-200 bg-warm-200 sm:grid-cols-4"
        >
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 bg-white px-6 py-7 text-center">
              <Icon size={20} className="text-spice" />
              <p className="font-mono text-2xl font-bold text-charcoal">{value}</p>
              <p className="text-xs text-muted">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Story grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1559528896-c5310744cce8?auto=format&fit=crop&w=900&q=80"
                alt="Zaaika chicken biryani, freshly cooked"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -right-4 max-w-[180px] rounded-2xl border border-warm-200 bg-white p-4 shadow-lg sm:-right-8"
            >
              <p className="font-display text-2xl font-semibold text-spice">£30+</p>
              <p className="mt-0.5 text-xs text-muted">free delivery, every order</p>
              <div className="mt-3 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-xs text-spice">★</span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-spice">
              Our story
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
              Cooking from the heart since 2012
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Zaaika was founded by the Mehta family with a single kitchen, twelve
              recipes, and a firm belief that great Indian food should be available
              to everyone — not just for special occasions.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              More than a decade on, our menu has grown, but the approach has not:
              whole spices, fresh aromatics, and dishes cooked the way our grandmothers
              taught us.
            </p>

            {/* Promise cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PROMISES.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl border border-warm-100 bg-cream p-4"
                >
                  <span className="text-xl">{p.emoji}</span>
                  <p className="mt-2 text-sm font-semibold text-charcoal">{p.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
