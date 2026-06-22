"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CartItem, MenuItem } from "@/types";

interface CartState {
  items: CartItem[];
  open: boolean;
}

type CartAction =
  | { type: "ADD"; item: MenuItem }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((c) => c.item.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((c) =>
            c.item.id === action.item.id ? { ...c, qty: c.qty + 1 } : c
          ),
        };
      }
      return { ...state, items: [...state.items, { item: action.item, qty: 1 }] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((c) => c.item.id !== action.id) };
    case "SET_QTY":
      if (action.qty <= 0)
        return { ...state, items: state.items.filter((c) => c.item.id !== action.id) };
      return {
        ...state,
        items: state.items.map((c) =>
          c.item.id === action.id ? { ...c, qty: action.qty } : c
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "OPEN":
      return { ...state, open: true };
    case "CLOSE":
      return { ...state, open: false };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  open: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getQty: (id: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], open: false });

  const addItem    = useCallback((item: MenuItem) => dispatch({ type: "ADD", item }), []);
  const removeItem = useCallback((id: string) => dispatch({ type: "REMOVE", id }), []);
  const setQty     = useCallback((id: string, qty: number) => dispatch({ type: "SET_QTY", id, qty }), []);
  const clearCart  = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openCart   = useCallback(() => dispatch({ type: "OPEN" }), []);
  const closeCart  = useCallback(() => dispatch({ type: "CLOSE" }), []);
  const getQty     = useCallback((id: string) => state.items.find((c: CartItem) => c.item.id === id)?.qty ?? 0, [state.items]);

  const totalItems = useMemo(
    () => state.items.reduce((s: number, c: CartItem) => s + c.qty, 0),
    [state.items]
  );
  const totalPrice = useMemo(
    () => state.items.reduce((s: number, c: CartItem) => s + c.item.price * c.qty, 0),
    [state.items]
  );

  const value = useMemo<CartContextValue>(
    () => ({ ...state, totalItems, totalPrice, addItem, removeItem, setQty, clearCart, openCart, closeCart, getQty }),
    [state, totalItems, totalPrice, addItem, removeItem, setQty, clearCart, openCart, closeCart, getQty]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside <CartProvider>");
  return ctx;
}
