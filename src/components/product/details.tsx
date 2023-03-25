import { useEffect, useState } from 'react';
import { useCartStore } from '../../store';

import { Button } from '../ui/button';
import { TCartItem } from '../../types';
import { product } from '../../data/featured-product';
import { MinusIcon, PlusIcon, CartIcon } from '../icons';

export const ProductDetails = () => {
  const [showMsg, setShowMsg] = useState(false);
  const cart = useCartStore(state => state.cart);
  const addCartItem = useCartStore(state => state.addCartItem);

  const itemInCart = cart.find(i => i.id === product.id);
  const qty = itemInCart ? itemInCart.qty : 0;
  const [itemQty, setItemQty] = useState(qty);

  useEffect(() => {
    if (!itemInCart) {
      setItemQty(0);
      setShowMsg(false);
    }
  }, [itemInCart]);

  const handleItemToCart = () => {
    if (itemQty === 0 || itemQty === itemInCart?.qty) {
      setShowMsg(false);
      return;
    }

    setShowMsg(true);
    const cartItem: TCartItem = {
      id: product.id,
      qty: itemQty,
      title: product.title,
      price: product.discountedPrice,
      image: { full: '', thumb: product.image.thumb[0] },
      size: product.size,
      color: product.color,
      availableQty: product.availableQty,
      discountPercentage: product.discountPercentage,
    };
    addCartItem(cartItem);
  };

  return (
    <section className="m-8 mb-40 justify-self-start xl:max-w-3xl xl:m-0">
      <div className="grid gap-4 mb-16">
        <h3 className="text-xl text-Orange/80 tracking-wider font-bold uppercase">
          sneaker company
        </h3>
        <h2 className="text-5xl text-Very_dark_blue font-bold capitalize mb-4">{product.title}</h2>
        <p className="text-[1.6rem] text-Dark_grayish_blue/80">{product.description}</p>
      </div>

      <div className="grid gap-8">
        <div className="flex items-center justify-between xl:flex-col xl:items-start xl:gap-8">
          <div className="flex items-center gap-8">
            <span className="text-4xl font-bold">${product.discountedPrice.toFixed(2)}</span>
            <span className="font-bold bg-Pale_orange text-Orange px-3 py-1 rounded-md text-2xl">
              {product.discountPercentage * 100}%
            </span>
          </div>
          <span className="text-2xl text-Grayish_blue font-bold line-through">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="xl:flex xl:items-center xl:gap-6">
        <div className="relative flex items-center justify-between gap-4 bg-Light_grayish_blue py-6 px-4 my-16 rounded-xl xl:w-1/2">
          <Button
            title="decrease quantity"
            onClick={() => {
              setItemQty(pv => (pv > 0 ? --pv : 0));
              setShowMsg(false);
            }}
            className="text-Orange p-2 rounded-full focus-visible:text-Orange active:translate-y-px hover:bg-Light_grayish_blue">
            <MinusIcon className="w-7 h-7" />
          </Button>

          <span className="text-2xl font-bold xl:text-2xl">
            {itemQty} / {product.availableQty - itemQty}
          </span>

          <Button
            title="increase quantity"
            onClick={() => {
              setItemQty(pv => (pv === 10 ? 10 : ++pv));
              setShowMsg(false);
            }}
            className="text-Orange p-2 rounded-full focus-visible:text-Orange active:translate-y-px hover:bg-Light_grayish_blue">
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
          title="add item to cart"
          variant={'cart_chk'}
          onClick={handleItemToCart}
          className="flex items-center justify-center gap-8 w-full shadow-xl shadow-Orange/30 xl:w-2/3">
          <CartIcon className="fill-Light_grayish_blue" />
          <span>add to cart</span>
        </Button>
      </div>
    </section>
  );
};
