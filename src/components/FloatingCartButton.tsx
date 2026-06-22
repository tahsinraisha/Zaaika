"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";

export default function FloatingCartButton() {
  const { totalItems, totalPrice, openCart } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 sm:hidden"
        >
          <button
            onClick={openCart}
            className="flex items-center gap-3 rounded-2xl bg-charcoal px-5 py-3.5 shadow-2xl active:scale-95"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-spice text-white">
              <ShoppingBag size={14} />
            </span>
            <span className="text-sm font-semibold text-white">
              {totalItems} item{totalItems !== 1 ? "s" : ""} · £{totalPrice.toFixed(2)}
            </span>
            <span className="text-sm font-semibold text-spice">View →</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
