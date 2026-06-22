"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, UtensilsCrossed } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
  }

  return (
    <footer className="border-t border-warm-200 bg-charcoal text-warm-300">
      <div className="container-app py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-spice text-white">
                <UtensilsCrossed size={16} strokeWidth={2.5} />
              </span>
              <span className="font-display text-xl font-semibold text-white">Zaaika</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Authentic Indian food made with whole spices, fresh aromatics and
              more than a decade of family recipes.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Facebook,  href: "#", label: "Facebook" },
                { Icon: Twitter,   href: "#", label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-warm-300 transition-colors hover:border-spice hover:text-spice"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-spice">
              Find us
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-spice" />
                <span>42 Spice Lane, Brick Lane<br />London E1 6RF</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="shrink-0 text-spice" />
                <a href="tel:+442071234567" className="transition-colors hover:text-white">
                  020 7123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="shrink-0 text-spice" />
                <a href="mailto:hello@zaaika.co.uk" className="transition-colors hover:text-white">
                  hello@zaaika.co.uk
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-spice">
              Hours
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { day: "Mon – Thu", time: "11:30 – 22:00" },
                { day: "Fri – Sat", time: "11:30 – 23:00" },
                { day: "Sunday",    time: "12:00 – 21:30" },
              ].map((h) => (
                <li key={h.day} className="flex justify-between gap-6">
                  <span>{h.day}</span>
                  <span className="font-mono text-xs text-white">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs">
              Last orders 30 min before closing
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-spice">
              Stay in the loop
            </p>
            <p className="mb-4 text-sm leading-relaxed">
              Weekly specials, new dishes and exclusive offers — straight to your inbox.
            </p>
            {done ? (
              <p className="rounded-xl border border-white/15 px-4 py-3 text-sm text-white">
                ✅ You&apos;re on the list — watch your inbox!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Email for newsletter"
                  className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-warm-300 outline-none transition-colors focus:border-spice"
                />
                <button type="submit" className="btn-spice w-full justify-center">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-center text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Zaaika Restaurant. All rights reserved.</p>
          <p>Made with ❤️ in London · Delivery by our own drivers</p>
        </div>
      </div>
    </footer>
  );
}
