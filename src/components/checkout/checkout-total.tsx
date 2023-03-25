import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEventListener } from '../../hooks/use-event-listener';
import { PromoCodes, useAuthStore, useCartStore, useUserStore } from '../../store';

import { TOrder } from '../../types';
import { Button } from '../ui/button';
import { CloseIcon, InfoIcon, SpinnerIcon } from '../icons';

export const CheckoutTotal = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef<number | undefined>();
  const [isChecking, setIsChecking] = useState(false);

  const addOrder = useUserStore(state => state.addOrder);
  const state = useCartStore(state => state);
  const user = useAuthStore(state => state.user);

  const { ref: tipRef, isInside } = useEventListener<HTMLSpanElement>({});

  const promoCode: PromoCodes =
    state.cartDiscount === 'full-disc'
      ? 'IHaveNoMoney_100'
      : state.cartDiscount === 'half-disc'
      ? 'ILoveYou_50'
      : '';

  const subtotal = state.getSubtotal();
  const totalDiscount = state.getTotalDiscount();
  const deliveryFees = state.getDeliveryFees();
  const totalCart = subtotal - totalDiscount + deliveryFees;

  const handleCheckout = () => {
    setIsChecking(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!user) {
        navigate('/auth');
        return;
      }

      const newOrder: TOrder = {
        id: Math.random().toString(36).substring(6),
        cart: state.cart,
        cartDiscount: state.cartDiscount,
        subtotal,
        totalDiscount,
        deliveryFees,
        totalDue: totalCart,
        date: new Date().toLocaleString().replace(',', ' at '),
      };
      addOrder(newOrder);
      state.setCartDiscount('');
      setIsChecking(false);
      navigate('success');
      state.clearCart();
    }, 2000);
  };

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
                onClick={() => state.setCartDiscount('')}>
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
              data-tip={`Eligible free shipping on purchases over $${state.shippingLimit}`}
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
            {state.cartDiscount === 'full-disc' ? ' 100% ' : ' 50% '}
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
