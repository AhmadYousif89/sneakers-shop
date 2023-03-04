import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../ui/button';
import { InfoIcon } from '../icons/info';
import { SpinnerIcon } from '../icons/spinner';
import { useCart } from '../../context/cart.context';
import { useEventListener } from '../../hooks/use-event-listener';

export const CheckoutTotal = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef<number | undefined>();
  const [isChecking, setIsChecking] = useState(false);
  const {
    state: { cart },
    clearCart,
  } = useCart();
  const { ref: tipRef, isInside } = useEventListener<HTMLSpanElement>({});

  const handleCheckout = () => {
    setIsChecking(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsChecking(false);
      navigate('success');
      clearCart();
    }, 2000);
  };

  const subtotal = cart.reduce((acc, curItem) => acc + curItem.price * curItem.qty, 0);
  const totalDiscount = cart.reduce(
    (acc, curItem) => acc + curItem.price * curItem.discountPercentage * curItem.qty,
    0,
  );
  const freeShippingPoint = 200;
  const deliveryFees = 50;
  const hasDeliveryFees = subtotal > freeShippingPoint ? false : true;
  const totalCart = hasDeliveryFees ? subtotal + deliveryFees : subtotal.toFixed(2);

  return (
    <div className="flex flex-col gap-8 my-16 capitalize text-xl text-Dark_grayish_blue xl:text-2xl xl:gap-16">
      <div className="space-y-2 pb-8 border-b-2 border-Light_grayish_blue">
        <p className="flex items-center justify-between">
          <span>total after discount</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>

        <p className="flex items-center justify-between">
          <span className="relative">
            delivery fee
            <span
              ref={tipRef}
              title={'purchase policy'}
              aria-pressed={isInside}
              data-tip={`Eligible free shipping on purchases over $${freeShippingPoint}`}
              className="absolute top-0 -right-8 cursor-pointer fill-indigo-400 font-bold after:scale-0 after:aria-pressed:scale-100 after:transition-transform after:duration-[var(--duration)] after:origin-bottom-left after:content-[attr(data-tip)] after:px-4 after:py-2 after:absolute after:-top-12 after:-left-0 after:rounded-full after:w-max after:normal-case after:text-indigo-400 after:bg-Light_grayish_blue">
              <InfoIcon />
            </span>
          </span>
          <span className="text-indigo-400">
            {hasDeliveryFees ? `$${deliveryFees.toFixed(2)}` : 'free shipping'}
          </span>
        </p>
        <p className="flex items-center justify-between text-green-400">
          <span>you just saved</span>
          <span>${totalDiscount.toFixed(2)}</span>
        </p>
      </div>

      <div className="text-2xl flex items-center justify-between font-bold xl:text-3xl">
        <span className="uppercase">total</span>
        <span className="text-Very_dark_blue">$ {totalCart}</span>
      </div>

      <Button
        hasRipple
        variant={'cart_chk'}
        onClick={handleCheckout}
        className="w-full py-6">
        <span>Place your order</span>
        {isChecking && (
          <SpinnerIcon className="absolute top-1/2 -translate-y-1/2 right-0 -translate-x-10" />
        )}
      </Button>
    </div>
  );
};
