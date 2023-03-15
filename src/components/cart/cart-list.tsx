import { Button } from '../ui/button';
import { CartItem } from './cart-item';
import { useCartStore, useUIStore } from '../../store';

export const CartList = () => {
  const cart = useCartStore(state => state.cart);
  const setCartStatus = useUIStore(state => state.setCartStatus);

  return (
    <section className="p-8">
      <ul className="flex flex-col gap-4 mb-8">
        {cart.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <Button
        hasRipple
        href="/checkout"
        variant="cart_chk"
        className="mb-4"
        onClick={() => setCartStatus(false)}>
        <span>checkout</span>
      </Button>
    </section>
  );
};
