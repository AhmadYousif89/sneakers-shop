import { useUserStore } from '../../store';

import { Button } from '../ui/button';
import { FavorIcon } from '../icons/favorite';
import { TProduct } from '../../types/product.type';
import { SkeletonItem } from '../skeletons/skeleton-item';
import { useImageLoader } from '../../hooks/use-image-loader';

export const CategoryItem = ({ item }: { item: TProduct }) => {
  const favoriteList = useUserStore(state => state.favoriteList);
  const toggleItemFavorite = useUserStore(state => state.toggleItemFavorite);

  const itemImage = item.image.thumb as string;
  const { isLoading, imageRef } = useImageLoader(itemImage);

  const favoredItem = favoriteList.find(i => i.id === item.id);
  const itemIsFavored = favoredItem ? true : false;

  const handleFavoriteBtn = () => toggleItemFavorite({ ...item });

  if (isLoading) return <SkeletonItem />;

  return (
    <li className="w-96 min-h-[33rem] flex flex-col justify-between gap-4 bg-Light_grayish_blue p-8 rounded-3xl shadow-sm">
      <figure className="relative w-full min-h-[17rem] flex-center isolate before:absolute before:w-56 before:h-56 before:bg-gradient-to-br before:from-Orange/40 before:to-Orange/80 before:rounded-full before:-z-10 before:shadow-lg">
        <img ref={imageRef} src={itemImage} alt={item.title} />
        <figcaption className="sr-only">product image in the category section</figcaption>
      </figure>

      <div className="capitalize space-y-4 text-center">
        <h3 className="text-Dark_grayish_blue text-2xl">{item.title}</h3>
        <p className="text-xl text-Grayish_blue">{item.category} sneaker</p>
        <p className="flex items-center justify-between text-Dark_grayish_blue text-2xl font-bold">
          <span className="">${item.discountedPrice}</span>
          <Button hasRipple onClick={handleFavoriteBtn}>
            <span className="sr-only">like this sneaker</span>
            <FavorIcon fill={itemIsFavored} />
          </Button>
        </p>
      </div>
    </li>
  );
};
