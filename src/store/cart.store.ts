import { create } from 'zustand';
import { TCartItem } from '../types';
import { cartItems } from '../data/cart-items';

type CartState = { cart: TCartItem[] };
type CartActions = {
  addCartItem: (item: TCartItem) => void;
  removeCartItem: (itemItemId: number) => void;
  incrementCartItem: (itemItemId: number) => void;
  decrementCartItem: (itemItemId: number) => void;
  clearCart: () => void;
};

type InitCartStore = CartState & CartActions;

export const useCartStore = create<InitCartStore>((set, get) => ({
  cart: cartItems,
  addCartItem: payload => {
    const exItem = get().cart.find(item => item.id === payload.id);
    if (exItem) {
      const newItem = { ...exItem, qty: payload.qty };
      set(state => ({
        cart: state.cart.map(item => (item.id !== exItem.id ? item : newItem)),
      }));
    } else {
      const newCart = [...get().cart, payload];
      set(state => ({ cart: newCart }));
    }
  },
  removeCartItem: itemId => {
    const exItem = get().cart.find(item => item.id === itemId);
    if (exItem) {
      const newCart = get().cart.filter(item => item.id !== exItem.id);
      set({ cart: newCart });
    }
  },
  incrementCartItem: itemId => {
    const exItem = get().cart.find(item => item.id === itemId);
    if (exItem) {
      const newQty = exItem.qty === exItem.availableQty ? exItem.qty : exItem.qty + 1;
      const newItem = { ...exItem, qty: newQty };
      set(state => ({
        cart: state.cart.map(item => (item.id !== exItem.id ? item : newItem)),
      }));
    }
  },
  decrementCartItem: itemId => {
    const exItem = get().cart.find(item => item.id === itemId);
    if (exItem && exItem.qty > 1) {
      const newItem = { ...exItem, qty: exItem.qty - 1 };
      set(state => ({
        cart: state.cart.map(item => (item.id !== exItem.id ? item : newItem)),
      }));
    } else if (exItem && exItem.qty === 1) {
      get().removeCartItem(exItem.id);
    }
  },
  clearCart: () => set({ cart: [] }),
}));
