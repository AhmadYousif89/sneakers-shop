import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PromoCodes, useCartStore, useUserStore } from '../../store';
import { useEventListener } from '../../hooks/use-event-listener';

import { Button } from '../ui/button';
import { InfoIcon } from '../icons/info';
import { SpinnerIcon } from '../icons/spinner';
import { CloseIcon } from '../icons';

export const CheckoutTotal = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef<number | undefined>();
  const [isChecking, setIsChecking] = useState(false);

  const addOrder = useUserStore(state => state.addOrder);
  const getCartSubtotal = useCartStore(state => state.getCartSubtotal);
  const getCartTotalDiscount = useCartStore(state => state.getCartTotalDiscount);
  const { cart, clearCart, cartDiscount, setCartDiscount } = useCartStore(state => state);

  const { ref: tipRef, isInside } = useEventListener<HTMLSpanElement>({});

  const handleCheckout = () => {
    setIsChecking(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      addOrder(cart);
      setIsChecking(false);
      navigate('success');
      clearCart();
    }, 2000);
  };

  const freeShippingPoint = 300;
  const promoCode: PromoCodes =
    cartDiscount === 'full-disc'
      ? 'IHaveNoMoney_100'
      : cartDiscount === 'half-disc'
      ? 'ILoveYou_50'
      : '';

  const subtotal = getCartSubtotal();
  const totalDiscount = getCartTotalDiscount();

  let hasDeliveryFees = subtotal < freeShippingPoint;
  let deliveryFees = 0;

  if (hasDeliveryFees) deliveryFees = 50;
  if (hasDeliveryFees && cartDiscount === 'half-disc') deliveryFees = 25;
  if (!hasDeliveryFees || cartDiscount === 'full-disc') deliveryFees = 0;

  let totalCart = subtotal - totalDiscount;
  if (hasDeliveryFees) totalCart = subtotal - totalDiscount + deliveryFees;

  return (
    <div className="flex flex-col gap-8 my-16 capitalize text-xl text-Dark_grayish_blue xl:text-2xl xl:gap-16">
      <div className="relative space-y-2 pb-8 border-b-2 border-Light_grayish_blue">
        {/* SUBTOTAL */}
        <p className="flex items-center justify-between">
          <span>subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>

        {/* PROMO */}
        <div className="flex items-center justify-between text-Orange">
          <span>promo code</span>
          <span className={`group normal-case flex items-center gap-4`}>
            {promoCode !== '' && ( // has promo code
              <Button
                title="remove promo code"
                className="p-1 rounded-full bg-Pale_orange"
                onClick={() => setCartDiscount('')}>
                <CloseIcon className="scale-[.6] fill-Dark_grayish_blue hover:fill-Orange xl:scale-75" />
              </Button>
            )}
            <span>{promoCode ? promoCode : 'no code'}</span>
          </span>
        </div>

        {/* DISCOUNT */}
        <div className="flex items-center justify-between text-green-400">
          <span>you just saved</span>
          <span>${totalDiscount.toFixed(2)}</span>
        </div>

        {/* DELIVERY */}
        <div className="flex items-center justify-between text-indigo-400">
          <span className="flex items-center gap-2">
            delivery fee
            <span
              ref={tipRef}
              title={'purchase policy'}
              aria-pressed={isInside}
              data-tip={`Eligible free shipping on purchases over $${freeShippingPoint}`}
              className="relative cursor-pointer fill-indigo-400 after:absolute after:-top-11 after:-left-32 xl:after:-left-0 xl:after:origin-bottom-left after:scale-0 after:aria-pressed:scale-100 after:transition-transform after:duration-[var(--duration)] after:content-[attr(data-tip)] after:text-xl after:font-bold after:tracking-wide after:px-4 after:py-2 after:rounded-full after:w-max after:normal-case after:text-Dark_grayish_blue after:bg-Light_grayish_blue">
              <InfoIcon />
            </span>
          </span>

          <span className="normal-case">
            {deliveryFees ? `$${deliveryFees.toFixed(2)}` : 'free shipping'}
          </span>
        </div>

        {/* Promo Message */}
        <span
          className={`absolute -bottom-10 text-xl text-Dark_grayish_blue normal-case transition-all ${
            promoCode === ''
              ? '-translate-y-5 opacity-0 invisible'
              : 'translate-y-0 opacity-100 visible'
          }`}>
          applied
          <b className="tracking-wide text-2xl text-Orange">
            {cartDiscount === 'full-disc' ? ' 100% ' : ' 50% '}
          </b>
          discount on total
        </span>
      </div>

      {/* TOTAL */}
      <div className="text-2xl mt-8 flex items-center justify-between gap-4 font-bold xl:text-3xl">
        <span className="uppercase">total</span>
        <span
          className={`ml-auto ${
            promoCode === '' ? 'text-Very_dark_blue' : 'line-through text-Grayish_blue'
          }`}>
          $ {totalCart.toFixed(2)}
        </span>
        {promoCode !== '' && ( // has promo code
          <span>{promoCode === 'ILoveYou_50' ? `$${(totalCart / 2).toFixed(2)}` : `$0.00`}</span>
        )}
      </div>

      <Button hasRipple variant={'cart_chk'} onClick={handleCheckout} className="w-full py-6 mt-8">
        <span>Place your order</span>
        {isChecking && (
          <SpinnerIcon className="absolute top-1/2 -translate-y-1/2 right-0 -translate-x-10" />
        )}
      </Button>
    </div>
  );
};
