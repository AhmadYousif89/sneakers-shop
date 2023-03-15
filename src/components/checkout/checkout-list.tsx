import { useCartStore } from '../../store';
import { CheckoutItem } from './checkout-item';

export const CheckoutList = () => {
  const cart = useCartStore(state => state.cart);

  return (
    <ul className="my-16 xl:my-0 flex flex-col gap-8">
      {cart.map(item => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
    </ul>
  );
};
