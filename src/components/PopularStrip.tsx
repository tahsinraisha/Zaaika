"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useCart } from "@/store/cart";
import { MENU_ITEMS } from "@/lib/data";

const POPULAR = MENU_ITEMS.filter((m) => m.popular).slice(0, 5);

export default function PopularStrip() {
  const { addItem, getQty, openCart } = useCart();

  return (
    <section className="border-y border-warm-200 bg-white py-14">
      <div className="container-app">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-spice">
              Most loved
            </span>
            <h2 className="mt-1.5 font-display text-2xl font-semibold text-charcoal sm:text-3xl">
              Customer favourites
            </h2>
          </div>
          <a href="#menu" className="btn-ghost text-sm">
            View all
          </a>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5">
          {POPULAR.map((item, i) => {
            const qty = getQty(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group flex w-44 shrink-0 flex-col overflow-hidden rounded-2xl border border-warm-100 bg-cream transition-shadow hover:shadow-md lg:w-auto"
              >
                <div className="relative aspect-square overflow-hidden bg-warm-100">
                  <Image
                    src={`${item.image}?auto=format&fit=crop&w=400&q=80`}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, 176px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.spice > 0 && (
                    <span className="absolute right-2 top-2 flex items-center gap-0.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[0.6rem] font-bold text-chili">
                      {Array.from({ length: item.spice }).map((_, j) => (
                        <Flame key={j} size={8} className="fill-chili text-chili" />
                      ))}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-3">
                  <p className="line-clamp-1 text-xs font-semibold text-charcoal">
                    {item.name}
                  </p>
                  <p className="mt-0.5 font-mono text-xs font-bold text-spice">
                    £{item.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => {
                      if (qty > 0) { openCart(); } else { addItem(item); }
                    }}
                    className={`mt-2 rounded-lg py-1.5 text-xs font-semibold transition-colors ${
                      qty > 0
                        ? "bg-spice text-white"
                        : "bg-spice-faint text-spice hover:bg-spice hover:text-white"
                    }`}
                  >
                    {qty > 0 ? `In order (${qty})` : "Add"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
