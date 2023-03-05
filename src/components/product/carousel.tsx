import { useEffect, useRef } from 'react';

import p1_1000 from '../../assets/images/p1-1000.jpg';
import p2_1000 from '../../assets/images/p2-1000.jpg';
import p3_1000 from '../../assets/images/p3-1000.jpg';
import p4_1000 from '../../assets/images/p4-1000.jpg';

import p1_176 from '../../assets/images/p1-176.jpg';
import p2_176 from '../../assets/images/p2-176.jpg';
import p3_176 from '../../assets/images/p3-176.jpg';
import p4_176 from '../../assets/images/p4-176.jpg';

import { Button } from '../ui/button';
import { useUI } from '../../context/ui.context';
import { NavigateBackIcon } from '../icons/navigate-back';
import { useProducts } from '../../context/products.context';

const sneakerImgs = [p1_1000, p2_1000, p3_1000, p4_1000];
const sneakerImgThumbs = [p1_176, p2_176, p3_176, p4_176];

export const ProductCarousel = ({ inLightbox = false }) => {
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const { setLightboxState } = useUI();
  const {
    state: { curImageIdx },
    setProductCurImage,
  } = useProducts();

  const displayPrevImage = () => {
    if (inLightbox) return;
    setProductCurImage(pv => (pv === 0 ? sneakerImgs.length - 1 : --pv));
  };

  const displayNextImage = () => {
    if (inLightbox) return;
    setProductCurImage(pv => (pv === sneakerImgs.length - 1 ? 0 : ++pv));
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (nextBtnRef.current && prevBtnRef.current) {
          prevBtnRef.current.blur();
          nextBtnRef.current.focus();
        }
        displayPrevImage();
      }
      if (e.key === 'ArrowRight') {
        if (nextBtnRef.current && prevBtnRef.current) {
          nextBtnRef.current.blur();
          prevBtnRef.current.focus();
        }
        displayNextImage();
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [inLightbox]);

  return (
    <div className="xl:max-w-3xl">
      <div className="relative group">
        <Button
          ref={prevBtnRef}
          variant={'caruosel'}
          title={'previous image'}
          onClick={displayPrevImage}
          className={`xl:hidden group-hover:block z-10 absolute top-1/2 left-0 translate-x-1/2 -translate-y-1/2 ${
            inLightbox ? 'xl:block -translate-x-1/2' : ''
          }`}>
          <span className="sr-only">go to previuos image</span>
          <NavigateBackIcon className="hover:fill-Orange" />
        </Button>

        <figure className="relative flex items-center bg-Yellowish_orange min-w-[32rem] min-h-[32rem] xl:rounded-3xl overflow-hidden">
          {sneakerImgs.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt="sneakers image"
              className={`transition-transform duration-500 ease-in-out`}
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
            onClick={() => setLightboxState(true)}
            className={`overflow-hidden text-xl bg-Very_dark_blue/50 rounded-md p-4 ring-1 ring-Light_grayish_blue`}>
            Showcase
          </Button>
        </div>

        <Button
          ref={nextBtnRef}
          title="next image"
          variant={'caruosel'}
          onClick={displayNextImage}
          className={`xl:hidden group-hover:block z-10 absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 rotate-180 ${
            inLightbox ? 'xl:block translate-x-1/2' : ''
          }`}>
          <span className="sr-only">go to next image</span>
          <NavigateBackIcon className="hover:fill-Orange" />
        </Button>
      </div>

      <div className="hidden xl:flex items-center justify-between mt-16">
        {sneakerImgThumbs.map((imgThumb, idx) => (
          <figure
            key={imgThumb}
            aria-pressed={idx === curImageIdx}
            onClick={() => setProductCurImage(idx)}
            className={`relative overflow-hidden cursor-pointer rounded-2xl border-Orange aria-pressed:border-[3px] after:absolute after:inset-0 aria-pressed:after:bg-Pale_orange after:opacity-50 shadow-md shadow-Grayish_blue ${
              inLightbox ? 'shadow-none' : ''
            }`}>
            <img src={imgThumb} alt="sneakers thumbnail image" className="w-40" />
            <figcaption className="sr-only">
              showcasing the sneaker images thumbnails
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};
