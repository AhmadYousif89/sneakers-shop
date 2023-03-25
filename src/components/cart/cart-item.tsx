import { useCartStore } from '../../store/cart.store';
import { TCartItem } from '../../types';
import { Button } from '../ui/button';
import { DeleteIcon } from '../icons';

export const CartItem = ({ item }: { item: TCartItem }) => {
  const removeCartItem = useCartStore(state => state.removeCartItem);

  return (
    <li
      key={item.id}
      className="grid grid-cols-[5rem,1fr,2rem] xl:grid-cols-[6rem,1fr,2rem] gap-8 items-center border-b border-Grayish_blue/25 pb-4 last:border-b-0">
      <figure className="ring-1 ring-Grayish_blue bg-Light_grayish_blue shadow-sm rounded">
        <img className="rounded w-20 xl:w-full" src={item.image.thumb} alt={`${item.title}`} />
        <figcaption className="sr-only">product image in shopping cart</figcaption>
      </figure>

      <div className="flex flex-col gap-2 text-Dark_grayish_blue text-2xl xl:text-2xl cursor-default">
        <h3 className="capitalize">{item.title}</h3>
        <p className="flex items-center gap-4">
          <span>
            ${item.price.toFixed(2)} x {item.qty}
          </span>
          <span className="text-Very_dark_blue font-bold">
            ${(item.price * item.qty).toFixed(2)}
          </span>
        </p>
      </div>

      <Button title="remove item" onClick={() => removeCartItem(item.id)}>
        <DeleteIcon className="hover:fill-Orange xl:scale-125" />
      </Button>
    </li>
  );
};
