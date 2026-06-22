export type Category =
  | "starters"
  | "mains"
  | "biryani"
  | "breads"
  | "desserts"
  | "drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  veg: boolean;
  spice: 0 | 1 | 2 | 3; // 0 = mild, 3 = very hot
  tags?: string[];
  popular?: boolean;
}

export interface CartItem {
  item: MenuItem;
  qty: number;
}
