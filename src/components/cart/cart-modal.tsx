import { Card } from '../ui/card';
import { CartList } from './cart-list';
import { useCartStore, useUIStore } from '../../store';

export const CartModal = () => {
  const cart = useCartStore(state => state.cart);
  const cartIsOpen = useUIStore(state => state.cartIsOpen);

  const subtotal = cart.reduce((acc, curItem) => acc + curItem.price * curItem.qty, 0);

  const animate = cartIsOpen
    ? 'translate-y-16 xl:translate-y-20 opacity-100 visible'
    : 'translate-y-0 opacity-0 invisible';

  return (
    <Card
      onClick={e => e.stopPropagation()}
      className={`absolute top-24 left-1/2 xl:left-full xl:-translate-x-[102%] -translate-x-1/2 w-11/12 max-w-3xl ${animate} transition-all duration-[var(--duration)] ease-in-out`}>
      <div className="flex items-center justify-between p-8 capitalize border-b border-Grayish_blue/25 tracking-wide">
        <h2 className="text-3xl font-bold xl:text-4xl">cart</h2>

        {cart.length > 0 && (
          <div className="text-xl font-semibold xl:text-2xl">
            <span className="bg-Orange py-2 px-4 text-white rounded-md shadow">
              $ {subtotal.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {cart.length > 0 ? (
        <CartList />
      ) : (
        <p className="text-2xl text-Grayish_blue capitalize text-center my-32 font-bold">
          <span>your cart is empty !</span>
        </p>
      )}
    </Card>
  );
};
