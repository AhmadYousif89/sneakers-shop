import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useReducer,
  FC,
} from 'react';
import { cartItems } from '../data/cart-items';
import { TCartItem } from '../types/cart.type';

type InitCartState = { cart: TCartItem[] };

const initState: InitCartState = { cart: cartItems };

const initContext: UseCartContext = {
  state: initState,
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItem: () => {},
  decrementCartItem: () => {},
  clearCart: () => {},
};

const CartContext = createContext<UseCartContext>(initContext);

export const CartCtxProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CartContext.Provider value={useCartContext(initState)}>
      {children}
    </CartContext.Provider>
  );
};

type ReducerActions =
  | { type: 'add_to_cart'; payload: TCartItem }
  | { type: 'remove_item'; payload: number }
  | { type: 'increment_item'; payload: number }
  | { type: 'decrement_item'; payload: number }
  | { type: 'clear_cart'; payload: [] };

const reducer = (state: InitCartState, { type, payload }: ReducerActions) => {
  switch (type) {
    case 'add_to_cart': {
      let newItem: TCartItem;
      const exItem = state.cart.find(item => item.id === payload.id);
      if (exItem) {
        newItem = { ...exItem, qty: payload.qty };
        return {
          ...state,
          cart: state.cart.map(item => (item.id !== exItem.id ? item : { ...newItem })),
        };
      } else {
        const newCart = [...state.cart, payload];
        return { ...state, cart: newCart };
      }
    }
    case 'increment_item': {
      let newItem: TCartItem;
      const exItem = state.cart.find(item => item.id === payload);
      if (exItem) {
        const newQty = exItem.qty === exItem.availableQty ? exItem.qty : exItem.qty + 1;
        newItem = { ...exItem, qty: newQty };
        return {
          ...state,
          cart: state.cart.map(item => (item.id !== exItem.id ? item : { ...newItem })),
        };
      } else {
        return { ...state };
      }
    }
    case 'decrement_item': {
      let newItem: TCartItem;
      const exItem = state.cart.find(item => item.id === payload);
      if (exItem && exItem.qty > 1) {
        newItem = { ...exItem, qty: exItem.qty - 1 };
        return {
          ...state,
          cart: state.cart.map(item => (item.id !== exItem.id ? item : { ...newItem })),
        };
      } else if (exItem && exItem.qty === 1) {
        return { ...state, cart: state.cart.filter(item => item.id !== exItem.id) };
      } else {
        return { ...state };
      }
    }
    case 'remove_item': {
      const exItem = state.cart.find(item => item.id === payload);
      if (exItem) {
        return { ...state, cart: state.cart.filter(item => item.id !== exItem.id) };
      }
    }
    case 'clear_cart': {
      return { ...state, cart: [] };
    }
    default:
      throw new Error('Invalid reducer action');
  }
};

type UseCartContext = ReturnType<typeof useCartContext>;

const useCartContext = (initState: InitCartState) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const addCartItem = useCallback(
    (item: TCartItem) => dispatch({ type: 'add_to_cart', payload: item }),
    [],
  );

  const removeCartItem = useCallback(
    (itemId: number) => dispatch({ type: 'remove_item', payload: itemId }),
    [],
  );

  const incrementCartItem = useCallback(
    (itemId: number) => dispatch({ type: 'increment_item', payload: itemId }),
    [],
  );

  const decrementCartItem = useCallback(
    (itemId: number) => dispatch({ type: 'decrement_item', payload: itemId }),
    [],
  );

  const clearCart = useCallback(() => dispatch({ type: 'clear_cart', payload: [] }), []);

  return {
    state,
    addCartItem,
    removeCartItem,
    incrementCartItem,
    decrementCartItem,
    clearCart,
  };
};

export const useCart = () => useContext(CartContext);
