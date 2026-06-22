"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/store/cart";

import type { CartItem } from "@/types";

type Step = "cart" | "checkout" | "success";

export default function CartDrawer() {
  const { items, totalItems, totalPrice, open, closeCart, setQty, removeItem, clearCart } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [orderType, setOrderType] = useState<"delivery" | "collection">("delivery");
  const [submitting, setSubmitting] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Reset step when closed
  useEffect(() => {
    if (!open) setTimeout(() => setStep("cart"), 400);
  }, [open]);

  function handleClose() {
    closeCart();
  }

  function handleCheckout(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep("success");
      clearCart();
    }, 1200);
  }

  const deliveryFee = orderType === "delivery" && totalPrice < 30 ? 2.99 : 0;
  const grandTotal = totalPrice + deliveryFee;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 z-[80] bg-charcoal/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 36 }}
            className="fixed bottom-0 right-0 top-0 z-[90] flex w-full max-w-md flex-col bg-white shadow-2xl"
            aria-label="Your order"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-warm-200 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={20} className="text-spice" />
                <h2 className="font-display text-lg font-semibold text-charcoal">
                  {step === "cart" ? `Your Order (${totalItems})` : step === "checkout" ? "Checkout" : "Order Placed!"}
                </h2>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-warm-200 text-muted transition-colors hover:border-spice hover:text-spice"
              >
                <X size={16} />
              </button>
            </div>

            {/* ── CART STEP ── */}
            {step === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center gap-4 py-20 text-center">
                      <span className="text-5xl">🥘</span>
                      <p className="font-display text-xl font-semibold text-charcoal">
                        Your order is empty
                      </p>
                      <p className="text-sm text-muted">
                        Browse the menu and add something delicious.
                      </p>
                      <button onClick={handleClose} className="btn-spice mt-2">
                        Browse Menu
                      </button>
                    </div>
                  ) : (
                    <ul className="divide-y divide-warm-100 px-5">
                      {items.map(({ item, qty }: CartItem) => (
                        <li key={item.id} className="flex gap-4 py-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-warm-100">
                            <Image
                              src={`${item.image}?auto=format&fit=crop&w=120&q=75`}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col gap-1">
                            <div className="flex items-start justify-between">
                              <p className="text-sm font-semibold text-charcoal leading-snug">
                                {item.name}
                              </p>
                              <p className="shrink-0 font-mono text-sm font-bold text-spice">
                                £{(item.price * qty).toFixed(2)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {/* Quantity stepper */}
                              <div className="flex items-center gap-1 rounded-lg border border-warm-200">
                                <button
                                  onClick={() => setQty(item.id, qty - 1)}
                                  aria-label="Decrease quantity"
                                  className="flex h-7 w-7 items-center justify-center text-muted transition-colors hover:text-spice"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="w-5 text-center font-mono text-xs font-bold text-charcoal">
                                  {qty}
                                </span>
                                <button
                                  onClick={() => setQty(item.id, qty + 1)}
                                  aria-label="Increase quantity"
                                  className="flex h-7 w-7 items-center justify-center text-muted transition-colors hover:text-spice"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                aria-label={`Remove ${item.name}`}
                                className="ml-auto text-muted-light transition-colors hover:text-chili"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Footer with totals */}
                {items.length > 0 && (
                  <div className="border-t border-warm-200 bg-cream-50 p-5">
                    {/* Delivery/Collection toggle */}
                    <div className="mb-4 flex rounded-xl border border-warm-200 bg-white p-1 text-sm font-medium">
                      {(["delivery", "collection"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setOrderType(t)}
                          className={`flex-1 rounded-lg py-2 capitalize transition-all ${
                            orderType === t
                              ? "bg-spice text-white shadow"
                              : "text-muted hover:text-charcoal"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between text-muted">
                        <span>Subtotal</span>
                        <span>£{totalPrice.toFixed(2)}</span>
                      </div>
                      {orderType === "delivery" && (
                        <div className="flex justify-between text-muted">
                          <span>Delivery fee</span>
                          <span>{deliveryFee === 0 ? "Free" : `£${deliveryFee.toFixed(2)}`}</span>
                        </div>
                      )}
                      {orderType === "delivery" && totalPrice < 30 && (
                        <p className="text-xs text-spice">
                          Add £{(30 - totalPrice).toFixed(2)} more for free delivery
                        </p>
                      )}
                      <div className="flex justify-between border-t border-warm-200 pt-2 font-semibold text-charcoal">
                        <span>Total</span>
                        <span className="font-mono text-base text-spice">£{grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep("checkout")}
                      className="btn-spice mt-4 w-full justify-center text-base"
                    >
                      Go to Checkout
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ── CHECKOUT STEP ── */}
            {step === "checkout" && (
              <form onSubmit={handleCheckout} className="flex flex-1 flex-col overflow-y-auto">
                <div className="flex-1 space-y-5 p-5">
                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    className="text-sm text-spice hover:underline"
                  >
                    ← Back to order
                  </button>

                  <fieldset className="space-y-3">
                    <legend className="text-sm font-semibold text-charcoal">Your details</legend>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="fname" className="mb-1 block text-xs font-medium text-muted">First name</label>
                        <input id="fname" type="text" required placeholder="Priya" className="input-field" />
                      </div>
                      <div>
                        <label htmlFor="lname" className="mb-1 block text-xs font-medium text-muted">Last name</label>
                        <input id="lname" type="text" required placeholder="Sharma" className="input-field" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1 block text-xs font-medium text-muted">Phone</label>
                      <input id="phone" type="tel" required placeholder="07700 900000" className="input-field" />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1 block text-xs font-medium text-muted">Email</label>
                      <input id="email" type="email" required placeholder="priya@email.com" className="input-field" />
                    </div>
                  </fieldset>

                  {orderType === "delivery" && (
                    <fieldset className="space-y-3">
                      <legend className="text-sm font-semibold text-charcoal">Delivery address</legend>
                      <input type="text" required placeholder="Street address" className="input-field" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" required placeholder="City" className="input-field" />
                        <input type="text" required placeholder="Postcode" className="input-field" />
                      </div>
                    </fieldset>
                  )}

                  <fieldset className="space-y-3">
                    <legend className="text-sm font-semibold text-charcoal">Payment</legend>
                    <p className="rounded-lg border border-warm-200 bg-spice-faint p-3 text-xs text-muted">
                      💳 This demo uses no real payments. Hit "Place Order" to see the confirmation screen.
                    </p>
                    <input type="text" placeholder="Card number" className="input-field" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="MM / YY" className="input-field" />
                      <input type="text" placeholder="CVV" className="input-field" />
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="notes" className="mb-1 block text-xs font-medium text-muted">Special instructions (optional)</label>
                    <textarea
                      id="notes"
                      rows={2}
                      placeholder="Allergies, spice preferences…"
                      className="input-field resize-none"
                    />
                  </div>
                </div>

                <div className="border-t border-warm-200 p-5">
                  <div className="mb-3 flex justify-between text-sm font-semibold text-charcoal">
                    <span>Total</span>
                    <span className="font-mono text-spice">£{grandTotal.toFixed(2)}</span>
                  </div>
                  <button type="submit" className="btn-spice w-full justify-center text-base" disabled={submitting}>
                    {submitting ? "Placing order…" : "Place Order →"}
                  </button>
                </div>
              </form>
            )}

            {/* ── SUCCESS STEP ── */}
            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.15 }}
                >
                  <CheckCircle2 size={64} className="text-veg" strokeWidth={1.5} />
                </motion.div>
                <h3 className="font-display text-2xl font-semibold text-charcoal">
                  Order confirmed!
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-muted">
                  Thank you for your order. We&apos;ll send a confirmation to your email
                  and get your food ready as soon as possible.
                </p>
                <div className="mt-2 rounded-xl border border-warm-200 bg-cream px-6 py-4">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                    Estimated {orderType === "delivery" ? "delivery" : "collection"} time
                  </p>
                  <p className="mt-1 font-display text-2xl font-semibold text-spice">
                    {orderType === "delivery" ? "30–45 min" : "15–20 min"}
                  </p>
                </div>
                <button
                  onClick={() => { handleClose(); }}
                  className="btn-spice mt-2"
                >
                  Back to Menu
                </button>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
