import { useEffect, useState } from 'react';

import { useCart } from '../../context/cart.context';
import { TCartItem } from '../../types/cart.type';
import { MinusIcon } from '../icons/minus';
import { PlusIcon } from '../icons/plus';
import { Button } from '../ui/button';

import p1_1000 from '../../assets/images/p1-1000.jpg';
import { CartIcon } from '../icons/cart';

const item: TCartItem = {
  id: 3,
  qty: 0,
  price: 125,
  discountPercentage: 0.5,
  title: 'fall limited edition sneakers',
  image: p1_1000,
  availableQty: 10,
  color: 'white',
  size: 'US-10',
};

export const ProductDetails = () => {
  const [showMsg, setShowMsg] = useState(false);
  const {
    state: { cart },
    addCartItem,
  } = useCart();
  const itemInCart = cart.find(i => i.id === item.id);
  const [itemQty, setItemQty] = useState(0);

  useEffect(() => {
    if (!itemInCart) return;
    setItemQty(itemInCart.qty);
  }, [itemInCart?.qty]);

  const handleItemToCart = () => {
    if (itemQty === 0 || itemQty === itemInCart?.qty) {
      setShowMsg(false);
      return;
    }
    setShowMsg(true);
    addCartItem({ ...item, qty: itemQty });
  };

  return (
    <section className="m-8 mb-40 xl:max-w-3xl xl:m-0">
      <div className="grid gap-4 mb-16">
        <h3 className="text-xl text-Orange/80 tracking-wider font-bold uppercase">
          sneaker company
        </h3>
        <h2 className="text-5xl text-Very_dark_blue font-bold capitalize mb-4">
          {item.title}
        </h2>
        <p className="text-[1.6rem] text-Dark_grayish_blue/80">
          These low-profile sneakers are your perfect casual wear companion. Featuring a
          durable ruber outer sole, they'll withstand everything the weather can offer.
        </p>
      </div>

      <div className="grid gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-4xl font-bold">${item.price.toFixed(2)}</span>
            <span className="font-bold bg-Pale_orange text-Orange px-3 py-1 rounded-md text-2xl">
              {item.discountPercentage * 100}%
            </span>
          </div>
          <span className="text-2xl text-Grayish_blue font-bold line-through">
            ${(item.price / item.discountPercentage).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="relative flex items-center justify-between gap-4 bg-Light_grayish_blue py-6 px-4 my-16 rounded-xl">
        <Button
          onClick={() => {
            setItemQty(pv => (pv > 0 ? --pv : 0));
            setShowMsg(false);
          }}
          className="text-Orange p-2 rounded-full focus-visible:bg-Grayish_blue focus-visible:text-Orange active:translate-y-px hover:bg-Light_grayish_blue">
          <MinusIcon className="w-7 h-7" />
        </Button>

        <span className="text-2xl font-bold xl:text-2xl">
          {itemQty} / {item.availableQty - itemQty}
        </span>

        <Button
          onClick={() => {
            setItemQty(pv => (pv === 10 ? 10 : ++pv));
            setShowMsg(false);
          }}
          className="text-Orange p-2 rounded-full focus-visible:bg-Grayish_blue focus-visible:text-Orange active:translate-y-px hover:bg-Light_grayish_blue">
          <PlusIcon className="w-7 h-7" />
        </Button>

        <p
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 pt-4 text-2xl text-green-500 font-bold capitalize ${
            showMsg ? 'translate-y-10 opacity-100 visible' : 'opacity-0 invisible'
          } transition-all duration-[var(--duration)]`}>
          cart updated
        </p>
      </div>

      <Button
        hasRipple
        variant={'cart_chk'}
        onClick={handleItemToCart}
        className="flex items-center justify-center gap-8 w-full shadow-xl shadow-Orange/30">
        <CartIcon className="fill-Light_grayish_blue" />
        <span>add to cart</span>
      </Button>
    </section>
  );
};
