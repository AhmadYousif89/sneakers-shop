import img from '../../assets/images/p1-176.jpg';
import { Button } from '../ui/button';

export const FeaturedProduct = () => {
  return (
    <section className="mx-8 my-20">
      <h2 className="text-3xl font-bold capitalize mb-16">season deals</h2>

      <div className="flex items-center justify-around gap-8">
        <div className="flex-1 grid gap-y-4 grid-cols-[1fr,minmax(8rem,12rem)] items-center bg-Pale_orange rounded-3xl p-8">
          <h3 className="capitalize text-3xl text-Dark_grayish_blue font-bold col-span-full">
            fall limited edition sneaker
          </h3>
          <div className="flex flex-col  gap-4 col-start-1">
            <p className="text-xl text-Dark_grayish_blue">
              Up to 50% Discount <br /> valid till 15th May
            </p>
            <Button hasRipple href="/product" variant={'hero'} className="self-start">
              shop now
            </Button>
          </div>

          <figure className="col-start-2">
            <img src={img} alt="display sneaker" className="rounded-full" />
            <figcaption className="sr-only">featured sneaker image</figcaption>
          </figure>
        </div>

        <div className="max-xs:hidden flex-1 grid gap-y-4 grid-cols-[1fr,minmax(8rem,12rem)] items-center bg-Pale_orange rounded-3xl p-8">
          <h3 className="capitalize text-3xl text-Dark_grayish_blue font-bold col-span-full">
            fall limited edition sneaker
          </h3>
          <div className="flex flex-col  gap-4 col-start-1">
            <p className="text-xl text-Dark_grayish_blue">
              Up to 50% Discount <br /> valid till 15th May
            </p>
            <Button hasRipple href="/product" variant={'hero'} className="self-start">
              shop now
            </Button>
          </div>

          <figure className="col-start-2">
            <img src={img} alt="display sneaker" className="rounded-full" />
            <figcaption className="sr-only">featured sneaker image</figcaption>
          </figure>
        </div>

        <div className="max-xs:hidden flex-1 grid gap-y-4 grid-cols-[1fr,minmax(8rem,12rem)] items-center bg-Pale_orange rounded-3xl p-8">
          <h3 className="capitalize text-3xl text-Dark_grayish_blue font-bold col-span-full">
            fall limited edition sneaker
          </h3>
          <div className="flex flex-col  gap-4 col-start-1">
            <p className="text-xl text-Dark_grayish_blue">
              Up to 50% Discount <br /> valid till 15th May
            </p>
            <Button hasRipple href="/product" variant={'hero'} className="self-start">
              shop now
            </Button>
          </div>

          <figure className="col-start-2">
            <img src={img} alt="display sneaker" className="rounded-full" />
            <figcaption className="sr-only">featured sneaker image</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
