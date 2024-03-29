import { useUserStore } from '../../store';

import { Button } from '../ui/button';
import { THistoryItem } from '../../types';
import { product } from '../../data/featured-product';
import { SkeletonImage } from '../skeletons/skeleton-image';
import { useImageLoader } from '../../hooks/use-image-loader';

const productImg = product.image.thumb[0];

export const FeaturedProduct = () => {
  const addItemHistory = useUserStore(state => state.addItemHistory);
  const { isLoading } = useImageLoader(productImg);

  const addToHistoryHandler = () => {
    const item: THistoryItem = {
      id: product.id,
      title: product.title,
      image: { full: '', thumb: productImg },
    };
    addItemHistory(item);
  };

  return (
    <section className="mx-8 my-20">
      <h2 className="text-3xl font-bold capitalize mb-16">season deals</h2>

      {/* 1st item */}
      <div className="flex items-center justify-around gap-8">
        <div className="flex-1 grid gap-y-4 grid-cols-[1fr,minmax(8rem,12rem)] items-center bg-Pale_orange rounded-3xl p-8">
          <h3 className="capitalize text-3xl text-Dark_grayish_blue font-bold col-span-full">
            {product.title}
          </h3>
          <div className="flex flex-col  gap-4 col-start-1">
            <p className="text-xl text-Dark_grayish_blue">
              Up to {product.discountPercentage * 100}% Discount <br /> valid till 15th May
            </p>
            <Button
              hasRipple
              href="/product"
              variant={'hero'}
              className="self-start"
              onClick={addToHistoryHandler}>
              shop now
            </Button>
          </div>

          <figure className="col-start-2">
            {isLoading ? (
              <SkeletonImage />
            ) : (
              <img src={productImg} alt={product.title} className="rounded-full" />
            )}
          </figure>
        </div>

        {/* 2ed item */}
        <div className="hidden flex-1 xl:grid gap-y-4 grid-cols-[1fr,minmax(8rem,12rem)] items-center bg-Pale_orange rounded-3xl p-8">
          <h3 className="capitalize text-3xl text-Dark_grayish_blue font-bold col-span-full">
            {product.title}
          </h3>
          <div className="flex flex-col  gap-4 col-start-1">
            <p className="text-xl text-Dark_grayish_blue">
              Up to {product.discountPercentage * 100}% Discount <br /> valid till 15th May
            </p>
            <Button
              hasRipple
              href="/product"
              variant={'hero'}
              className="self-start"
              onClick={addToHistoryHandler}>
              shop now
            </Button>
          </div>

          <figure className="col-start-2">
            {isLoading ? (
              <SkeletonImage />
            ) : (
              <img src={productImg} alt={product.title} className="rounded-full" />
            )}
            <figcaption className="sr-only">featured sneaker image</figcaption>
          </figure>
        </div>

        {/* 3rd item */}
        <div className="hidden flex-1 xl:grid gap-y-4 grid-cols-[1fr,minmax(8rem,12rem)] items-center bg-Pale_orange rounded-3xl p-8">
          <h3 className="capitalize text-3xl text-Dark_grayish_blue font-bold col-span-full">
            {product.title}
          </h3>
          <div className="flex flex-col  gap-4 col-start-1">
            <p className="text-xl text-Dark_grayish_blue">
              Up to {product.discountPercentage * 100}% Discount <br /> valid till 15th May
            </p>
            <Button
              hasRipple
              href="/product"
              variant={'hero'}
              className="self-start"
              onClick={addToHistoryHandler}>
              shop now
            </Button>
          </div>

          <figure className="col-start-2">
            {isLoading ? (
              <SkeletonImage />
            ) : (
              <img src={productImg} alt={product.title} className="rounded-full" />
            )}
            <figcaption className="sr-only">featured sneaker image</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
