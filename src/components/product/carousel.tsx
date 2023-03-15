import { useEffect, useRef } from 'react';
import { useProductStore, useUIStore } from '../../store';
import { useImageLoader } from '../../hooks/use-image-loader';

import { Button } from '../ui/button';
import { NavigateBackIcon } from '../icons';
import { product } from '../../data/featured-product';
import { SkeletonCarousel } from '../skeletons/skeleton-carousel';

export const ProductCarousel = ({ inLightbox = false }) => {
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const curImageIdx = useProductStore(state => state.curImageIdx);
  const curImageHandler = useProductStore(state => state.curImageHandler);
  const setLightboxStatus = useUIStore(state => state.setLightboxStatus);

  const { full: prodFullImgs, thumb: prodThumbImgs } = product.image;
  const { isLoading, imageRef } = useImageLoader(prodFullImgs);

  const displayPrevImage = () => {
    const length = prodFullImgs.length;
    curImageHandler(pv => {
      return pv === 0 ? length - 1 : --pv;
    });
  };

  const displayNextImage = () => {
    const length = prodFullImgs.length;
    curImageHandler(pv => {
      return pv === length - 1 ? 0 : ++pv;
    });
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && !e.altKey) {
        if (nextBtnRef.current && prevBtnRef.current) {
          prevBtnRef.current.blur();
          nextBtnRef.current.focus();
        }
        if (inLightbox) return;
        displayPrevImage();
      }
      if (e.key === 'ArrowRight' && !e.altKey) {
        if (nextBtnRef.current && prevBtnRef.current) {
          nextBtnRef.current.blur();
          prevBtnRef.current.focus();
        }
        if (inLightbox) return;
        displayNextImage();
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [inLightbox]);

  if (isLoading) return <SkeletonCarousel />;

  return (
    <div className="xl:max-w-3xl">
      <div className="relative group">
        <Button
          ref={prevBtnRef}
          variant={'caruosel'}
          title={'previous image'}
          onClick={displayPrevImage}
          className={`xl:hidden group-hover:block z-30 absolute top-1/2 left-0 translate-x-1/2 -translate-y-1/2 ${
            inLightbox ? 'xl:block -translate-x-1/2' : ''
          }`}>
          <span className="sr-only">go to previuos image</span>
          <NavigateBackIcon className="hover:fill-Orange" />
        </Button>

        <figure className="relative flex items-center xl:rounded-3xl overflow-hidden">
          {(prodFullImgs as string[]).map((image, idx) => (
            <img
              key={idx}
              src={image}
              ref={imageRef}
              alt="sneakers image"
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${curImageIdx * 100}%)` }}
            />
          ))}
          <figcaption className="sr-only">showcasing the sneaker images</figcaption>
        </figure>

        <div
          className={`hidden xl:flex items-center justify-between w-full absolute bottom-4 px-4 tracking-wider text-Light_grayish_blue opacity-0 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[var(--duration)] ${
            inLightbox ? 'xl:hidden' : ''
          }`}>
          <p className="bg-Very_dark_blue/50 text-xl rounded-md p-4 ring-1 ring-Light_grayish_blue">
            Slide with <span>⬅</span> and <span>➡</span>
          </p>

          <Button
            hasRipple
            onClick={() => setLightboxStatus(true)}
            className={`overflow-hidden text-xl bg-Very_dark_blue/50 rounded-md p-4 ring-1 ring-Light_grayish_blue`}>
            Showcase
          </Button>
        </div>

        <Button
          ref={nextBtnRef}
          title="next image"
          variant={'caruosel'}
          onClick={displayNextImage}
          className={`xl:hidden group-hover:block z-30 absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 rotate-180 ${
            inLightbox ? 'xl:block translate-x-1/2' : ''
          }`}>
          <span className="sr-only">go to next image</span>
          <NavigateBackIcon className="hover:fill-Orange" />
        </Button>
      </div>

      <div className="hidden xl:flex items-center justify-between mt-16">
        {(prodThumbImgs as string[]).map((imgThumb, idx) => (
          <figure
            key={imgThumb}
            aria-pressed={idx === curImageIdx}
            onClick={() => curImageHandler(idx)}
            className={`relative overflow-hidden cursor-pointer rounded-2xl border-Orange aria-pressed:border-[3px] after:absolute after:inset-0 aria-pressed:after:bg-Pale_orange after:opacity-50 shadow-md shadow-Grayish_blue ${
              inLightbox ? 'shadow-none' : ''
            }`}>
            <img src={imgThumb} alt="sneakers thumbnail image" className="w-40" />
            <figcaption className="sr-only">showcasing the sneaker images thumbnails</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};
