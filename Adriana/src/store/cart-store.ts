import { create } from "zustand";

type CartMovie = {
  id: number;
  title: string;
  posterUrl: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartMovie[];
  addToCart: (movie: Omit<CartMovie, "quantity">) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (movie) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === movie.id);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === movie.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...movie, quantity: 1 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ items: [] }),

  total: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));