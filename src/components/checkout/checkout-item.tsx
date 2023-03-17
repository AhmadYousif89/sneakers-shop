import { useCartStore } from '../../store';

import { Button } from '../ui/button';
import { MinusIcon, PlusIcon } from '../icons';
import { TCartItem } from '../../types/TCartItem';

export const CheckoutItem = ({ cartItem }: { cartItem: TCartItem }) => {
  const getTotalQty = useCartStore(state => state.getTotalQty);
  const setCartWarning = useCartStore(state => state.setCartWarning);
  const incrementCartItem = useCartStore(state => state.incrementCartItem);
  const decrementCartItem = useCartStore(state => state.decrementCartItem);

  return (
    <li
      key={cartItem.id}
      className="bg-Light_grayish_blue shadow-sm px-6 py-4 rounded-3xl flex items-center gap-4 xl:gap-12">
      <figure className="rounded-3xl bg-Grayish_blue w-28 xl:w-36">
        <img alt={cartItem.title} src={cartItem.image.thumb} className="w-full rounded-3xl" />
        <figcaption className="sr-only">product image</figcaption>
      </figure>

      <div className="flex flex-col gap-y-2 text-2xl xl:text-3xl">
        <h3 className=" text-Very_dark_blue capitalize ">{cartItem.title}</h3>
        <p className="flex items-center gap-2 text-lg capitalize text-Dark_grayish_blue xl:text-xl">
          <span>size: {cartItem.size}</span>
          <span className="text-slate-300">|</span>
          <span>color: {cartItem.color}</span>
        </p>
        <p className="flex items-center justify-between">
          <span>${cartItem.price.toFixed(2)}</span>
          <span className="flex items-center font-bold bg-Pale_orange text-Orange px-2 py-1 rounded-md text-xl">
            {cartItem.discountPercentage * 100} %
          </span>
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 ml-auto bg-white py-3 px-2 rounded-3xl">
        <Button
          title="decrement item quantity"
          onClick={() => {
            if (getTotalQty() === 1) {
              setCartWarning(true);
              return;
            }
            decrementCartItem(cartItem.id);
          }}
          className="text-Dark_grayish_blue hover:text-Orange p-2 rounded-full focus-visible:text-Orange active:translate-y-px hover:bg-Light_grayish_blue">
          <MinusIcon />
        </Button>

        <span className="text-xl font-bold xl:text-2xl">{cartItem.qty}</span>

        <Button
          title="increment item quantity"
          onClick={() => incrementCartItem(cartItem.id)}
          className="text-Dark_grayish_blue hover:text-Orange p-2 rounded-full focus-visible:text-Orange active:translate-y-px hover:bg-Light_grayish_blue">
          <PlusIcon />
        </Button>
      </div>
    </li>
  );
};
