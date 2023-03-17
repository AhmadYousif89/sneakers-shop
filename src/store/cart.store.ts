import { create } from 'zustand';
import { TCartItem } from '../types';
import { cartItems } from '../data/cart-items';

type CartDiscount = 'full-disc' | 'half-disc' | '';
export type PromoCodes = 'IHaveNoMoney_100' | 'ILoveYou_50' | '';
type CartState = {
  cart: TCartItem[];
  cartDiscount: CartDiscount;
  cartSubtotal: number;
  cartTotalDiscount: number;
};
type CartActions = {
  addCartItem: (item: TCartItem) => void;
  removeCartItem: (itemItemId: number) => void;
  incrementCartItem: (itemItemId: number) => void;
  decrementCartItem: (itemItemId: number) => void;
  setCartDiscount: (text: PromoCodes) => void;
  getCartSubtotal: () => number;
  getCartTotalDiscount: () => number;
  clearCart: () => void;
};

type InitCartStore = CartState & CartActions;

export const useCartStore = create<InitCartStore>((set, get) => ({
  cart: cartItems,
  cartDiscount: '',
  cartSubtotal: 0,
  cartTotalDiscount: 0,
  addCartItem: payload => {
    const exItem = get().cart.find(item => item.id === payload.id);
    if (exItem) {
      const newItem = { ...exItem, qty: payload.qty };
      set(state => ({
        cart: state.cart.map(item => (item.id !== exItem.id ? item : newItem)),
      }));
    } else {
      const newCart = [...get().cart, payload];
      set({ cart: newCart });
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
  setCartDiscount: code => {
    if (code === 'IHaveNoMoney_100') set({ cartDiscount: 'full-disc' });
    if (code === 'ILoveYou_50') set({ cartDiscount: 'half-disc' });
    if (code === '') set({ cartDiscount: '' });
  },
  getCartSubtotal: () => {
    return get().cart.reduce((acc, curItem) => {
      let total = 0;
      const originalPrice = curItem.price / (1 - curItem.discountPercentage);
      total += originalPrice * curItem.qty;
      return acc + total;
    }, 0);
  },
  getCartTotalDiscount: () => {
    return get().cart.reduce((acc, curItem) => {
      let discount = 0;
      const originalPrice = curItem.price / (1 - curItem.discountPercentage);
      discount += originalPrice * curItem.discountPercentage * curItem.qty;
      return acc + discount;
    }, 0);
  },
  clearCart: () => set({ cart: [] }),
}));
