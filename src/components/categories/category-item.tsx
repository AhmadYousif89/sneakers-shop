import { useState } from 'react';

import { Button } from '../ui/button';
import { FavorIcon } from '../icons/favorite';
import { TProduct } from '../../types/product.type';
import { SkeletonItem } from '../skeletons/skeleton-item';
import { useProducts } from '../../context/products.context';

export const CategoryItem = ({ item }: { item: TProduct }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    state: { isLoading },
  } = useProducts();

  if (isLoading) return <SkeletonItem />;

  return (
    <li className="w-96 min-h-[20rem] flex flex-col justify-between gap-4 bg-Light_grayish_blue p-8 rounded-3xl shadow-sm">
      <figure className="relative w-full min-h-[17rem] flex-center isolate before:absolute before:w-56 before:h-56 before:bg-gradient-to-br before:from-Orange/40 before:to-Orange/80 before:rounded-full before:-z-10 before:shadow-lg">
        <img src={item.image} alt={item.title} />
      </figure>

      <div className="capitalize space-y-4 text-center">
        <h3 className="text-Dark_grayish_blue text-2xl">{item.title}</h3>
        <p className="text-xl text-Grayish_blue">{item.category} sneaker</p>
        <p className="flex items-center justify-between text-Dark_grayish_blue text-2xl font-bold">
          <span className="">${item.discountedPrice}</span>
          <Button hasRipple onClick={() => setIsFavorite(pv => !pv)}>
            <FavorIcon fill={isFavorite} />
          </Button>
        </p>
      </div>
    </li>
  );
};
