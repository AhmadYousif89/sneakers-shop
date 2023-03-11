import { product } from '../../data/featured-product';
import { useProfile } from '../../context/user.context';
import { THistoryItem } from '../../types';
import { Button } from '../ui/button';

export const FeaturedProduct = () => {
  const { toggleItemHistory } = useProfile();

  const productImg = product.image.thumb[0];

  const addToHistoryHandler = () => {
    const item: THistoryItem = {
      id: product.id,
      title: product.title,
      image: { full: '', thumb: productImg },
    };
    toggleItemHistory(item);
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
              Up to {product.discountPercentage}% Discount <br /> valid till 15th May
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
            <img src={productImg} alt="display sneaker" className="rounded-full" />
            <figcaption className="sr-only">featured sneaker image</figcaption>
          </figure>
        </div>

        {/* 2ed item */}
        <div className="hidden flex-1 xl:grid gap-y-4 grid-cols-[1fr,minmax(8rem,12rem)] items-center bg-Pale_orange rounded-3xl p-8">
          <h3 className="capitalize text-3xl text-Dark_grayish_blue font-bold col-span-full">
            {product.title}
          </h3>
          <div className="flex flex-col  gap-4 col-start-1">
            <p className="text-xl text-Dark_grayish_blue">
              Up to {product.discountPercentage}% Discount <br /> valid till 15th May
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
            <img src={productImg} alt="display sneaker" className="rounded-full" />
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
              Up to {product.discountPercentage}% Discount <br /> valid till 15th May
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
            <img src={productImg} alt="display sneaker" className="rounded-full" />
            <figcaption className="sr-only">featured sneaker image</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
