"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Leaf, Minus, Plus, Star } from "lucide-react";
import type { MenuItem } from "@/types";
import { useCart } from "@/store/cart";

const SPICE_LABELS = ["Mild", "Medium", "Hot", "Very Hot"];

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export default function MenuCard({ item, index }: MenuCardProps) {
  const { addItem, removeItem, setQty, getQty, openCart } = useCart();
  const qty = getQty(item.id);
  const [imgLoaded, setImgLoaded] = useState(false);

  function handleAdd() {
    addItem(item);
  }

  function handleInc() {
    setQty(item.id, qty + 1);
  }

  function handleDec() {
    if (qty === 1) {
      removeItem(item.id);
    } else {
      setQty(item.id, qty - 1);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.07 }}
      className="card group flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-warm-100">
        <Image
          src={`${item.image}?auto=format&fit=crop&w=600&q=80`}
          alt={item.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-all duration-700 group-hover:scale-[1.06] ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
        />
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-warm-100" />
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {item.veg ? (
            <span className="flex items-center gap-1 rounded-full bg-veg-light px-2 py-0.5 text-[0.65rem] font-semibold text-veg">
              <Leaf size={9} /> Veg
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-chili-light px-2 py-0.5 text-[0.65rem] font-semibold text-chili">
              Non-Veg
            </span>
          )}
          {item.popular && (
            <span className="flex items-center gap-1 rounded-full bg-spice px-2 py-0.5 text-[0.65rem] font-bold text-white">
              <Star size={9} className="fill-white" /> Popular
            </span>
          )}
        </div>

        {item.spice > 0 && (
          <div className="absolute right-3 top-3 flex items-center gap-0.5 rounded-full bg-white/90 px-2 py-0.5 text-[0.62rem] font-medium text-chili">
            {Array.from({ length: item.spice }).map((_, i) => (
              <Flame key={i} size={9} className="fill-chili text-chili" />
            ))}
            <span className="ml-0.5">{SPICE_LABELS[item.spice]}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-snug text-charcoal">
            {item.name}
          </h3>
          <span className="shrink-0 font-mono text-sm font-bold text-spice">
            £{item.price.toFixed(2)}
          </span>
        </div>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
          {item.description}
        </p>

        {item.tags && item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-spice-faint px-2 py-0.5 text-[0.62rem] font-medium text-spice"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {qty === 0 ? (
              <motion.button
                key="add"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                onClick={handleAdd}
                className="btn-spice w-full justify-center"
              >
                Add to Order
              </motion.button>
            ) : (
              <motion.div
                key="stepper"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-between rounded-lg border-2 border-spice bg-spice-faint"
              >
                <button
                  onClick={handleDec}
                  aria-label="Remove one"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-spice transition-colors hover:bg-spice hover:text-white"
                >
                  <Minus size={16} />
                </button>

                <button
                  onClick={openCart}
                  className="flex-1 text-center font-mono text-sm font-bold text-spice"
                >
                  {qty} in order
                </button>

                <button
                  onClick={handleInc}
                  aria-label="Add one more"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-spice transition-colors hover:bg-spice hover:text-white"
                >
                  <Plus size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
