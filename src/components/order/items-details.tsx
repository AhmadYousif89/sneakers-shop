import { TCartItem } from '../../types';
import { SectionWrapper } from './section-wrapper';

export const ItemsDetails = ({ currentOrderCart }: { currentOrderCart: TCartItem[] }) => {
  return (
    <SectionWrapper className="row-start-2 xl:col-span-2">
      <h3 className="text-3xl xl:text-4xl font-bold text-Very_dark_blue/80">Items details</h3>

      <ul className="flex flex-col gap-8 xl:gap-16">
        {currentOrderCart.map(item => {
          const originalPrice = item.price / (1 - item.discountPercentage);
          return (
            <li
              key={item.id}
              className="group grid grid-cols-[minmax(auto,12rem),minmax(18rem,1fr)] gap-6 items-center xl:gap-12">
              <figure className="rounded-3xl bg-Grayish_blue">
                <img alt={item.title} src={item.image.thumb} className="w-full rounded-3xl" />
                <figcaption className="sr-only">product image</figcaption>
              </figure>

              <div className="grid pb-8 border-b-2 border-Grayish_blue/50 group-last:border-0 text-xl capitalize text-Dark_grayish_blue gap-2 xl:pb-16 xl:grid-cols-[.75fr,1fr] xl:text-2xl">
                <h4 className="text-2xl mb-4 text-Dark_grayish_blue font-bold xl:text-3xl">
                  {item.title}
                </h4>

                <p className="flex items-center gap-8 mb-4 xl:justify-between xl:row-start-1 xl:col-start-2">
                  <span className="space-x-4">
                    <b className="text-2xl xl:text-3xl">${item.price.toFixed(2)}</b>
                    <span className="text-xl line-through font-bold text-Dark_grayish_blue/50 xl:text-2xl">
                      ${originalPrice.toFixed(2)}
                    </span>
                  </span>

                  <b className="text-2xl xl:text-3xl">{item.qty}</b>

                  <span className="flex items-center gap-4">
                    <span className="font-bold bg-Pale_orange text-Orange py-1 px-2 rounded-md text-xl xl:text-2xl">
                      {item.discountPercentage * 100}%
                    </span>
                  </span>
                </p>

                <div className="space-y-2 xl:space-y-4">
                  <p>
                    color : <b className="text-2xl">{item.color}</b>
                  </p>

                  <p>
                    size : <b className="text-2xl">{item.size}</b>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </SectionWrapper>
  );
};
