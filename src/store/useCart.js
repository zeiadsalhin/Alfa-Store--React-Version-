import { create } from 'zustand';

const useCart = create((set) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    const existingProduct = state.cart.find((item) => item.id === product.id);
    if (existingProduct) {
      // If the product is already in the cart, increment the quantity
      return {
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    // If it's not in the cart, add it with quantity = 1
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((product) => product.id !== id),
  })),
  clearCart: () => set({ cart: [] }),
  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map((product) =>
      product.id === id ? { ...product, quantity } : product
    ),
  })),
  // Selector to calculate total quantity
  getTotalQuantity: () => (state) => {
    return state.cart.reduce((total, product) => total + product.quantity, 0);
  },
}));

export { useCart };
