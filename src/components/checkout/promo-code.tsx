import { FormEvent, useEffect, useRef, useState } from 'react';
import { useEventListener } from '../../hooks/use-event-listener';
import { PromoCodes, useCartStore } from '../../store';
import { Button } from '../ui/button';

type Promo = {
  status: 'valid' | 'invalid' | '';
  message: 'invalid promo codes' | 'promo code added successfully' | '';
};
const promo: Promo = { status: '', message: '' };

export const PromoCodeInput = () => {
  const status = useRef('');
  const [promoCode, setPromoCode] = useState(promo);
  const cartDiscount = useCartStore(state => state.cartDiscount);
  const setCartDiscount = useCartStore(state => state.setCartDiscount);
  const { ref: promoRef } = useEventListener<HTMLInputElement>({
    outsideElement: () => {
      if (status.current === 'valid' || promoRef.current?.value === '') {
        setPromoCode({ status: '', message: '' });
      }
    },
  });

  useEffect(() => {
    status.current = promoCode.status;
    if (promoRef.current && cartDiscount === '') promoRef.current.value = '';
  }, [promoCode.status, cartDiscount]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const promoText = promoRef.current;
    const fullDisc: PromoCodes = 'IHaveNoMoney_100';
    const halfDisc: PromoCodes = 'ILoveYou_50';

    if (!promoText || promoText.value === '') {
      setPromoCode({
        status: '',
        message: '',
      });
      return;
    }
    if (!promoText.value.match(`^${fullDisc}$`) && !promoText.value.match(`^${halfDisc}$`)) {
      setPromoCode({
        status: 'invalid',
        message: 'invalid promo codes',
      });
      return;
    }
    setCartDiscount(promoText.value as PromoCodes);
    setPromoCode({
      status: 'valid',
      message: 'promo code added successfully',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex justify-between items-center my-8 max-w-xl mx-auto xl:my-16">
      <label htmlFor="promo-code" className="peer flex-1">
        <input
          ref={promoRef}
          type="text"
          id="promo-code"
          autoComplete="off"
          placeholder="Enter promo code"
          className="w-full bg-Light_grayish_blue text-2xl text-Dark_grayish_blue rounded-tl-xl rounded-bl-xl py-4 px-8 outline-none placeholder:text-Grayish_blue placeholder:text-xl focus-visible:outline focus-visible:outline-offset-0 focus-visible:outline-2 focus-visible:outline-Orange"
        />
      </label>
      <Button
        hasRipple
        title="apply promo code"
        variant={'input_btn'}
        className="peer-focus-within:outline peer-focus-within:outline-2 peer-focus-within:outline-Dark_grayish_blue focus-visible:outline-2 focus-visible:outline-Dark_grayish_blue">
        Apply
      </Button>
      <p
        className={`absolute top-20 left-1/2 -translate-x-1/2 text-xl text-center w-full font-bold tracking-wide transition-all ${
          promoCode.status === 'valid' ? 'text-green-400' : 'text-Orange'
        } ${
          promoCode.message
            ? 'translate-y-0 opacity-100 visible'
            : '-translate-y-5 opacity-0 invisible'
        }`}>
        {promoCode.message}
      </p>
    </form>
  );
};
