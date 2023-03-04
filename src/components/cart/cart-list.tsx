import { useCart } from '../../context/cart.context';
import { useUI } from '../../context/ui.context';
import { Button } from '../ui/button';
import { CartItem } from './cart-item';

export const CartList = () => {
  const {
    state: { cart },
  } = useCart();

  const { setCartState } = useUI();

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
        onClick={() => setCartState(false)}>
        <span>checkout</span>
      </Button>
    </section>
  );
};
