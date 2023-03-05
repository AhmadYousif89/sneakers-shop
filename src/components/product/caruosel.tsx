import { useEffect } from 'react';

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

export const ProductCaruosel = ({ inLightbox = false }) => {
  const { setLightboxState } = useUI();
  const {
    state: { curImageIdx },
    setProductCurImage,
  } = useProducts();

  const displayPrevImage = () => {
    setProductCurImage(pv => (pv === 0 ? sneakerImgs.length - 1 : --pv));
  };

  const displayNextImage = () => {
    setProductCurImage(pv => (pv === sneakerImgs.length - 1 ? 0 : ++pv));
  };

  useEffect(() => {
    if (inLightbox) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') displayPrevImage();
      if (e.key === 'ArrowRight') displayNextImage();
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [inLightbox]);

  return (
    <div className="min-h-[40rem] xl:max-w-3xl">
      <figure className="relative group">
        <Button
          title={'previous image'}
          variant={'caruosel'}
          onClick={displayPrevImage}
          className={`xl:hidden group-hover:block absolute top-1/2 left-0 translate-x-1/2 -translate-y-1/2 ${
            inLightbox ? 'xl:block -translate-x-1/2' : ''
          }`}>
          <span className="sr-only">go to previuos image</span>
          <NavigateBackIcon className="hover:fill-Orange" />
        </Button>
        <img
          src={sneakerImgs[curImageIdx]}
          alt="sneakers image"
          className="xl:rounded-3xl"
        />
        <Button
          hasRipple
          onClick={() => setLightboxState(true)}
          className={`hidden xl:block absolute overflow-hidden bottom-10 right-10 text-2xl font-bold tracking-wider bg-Very_dark_blue/50 text-Light_grayish_blue rounded-sm p-4 opacity-0 group-hover:opacity-100 group-hover:ring-2 ring-Light_grayish_blue ${
            inLightbox ? 'xl:hidden' : ''
          }`}>
          Showcase
        </Button>
        <Button
          title="next image"
          variant={'caruosel'}
          onClick={displayNextImage}
          className={`xl:hidden group-hover:block absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 rotate-180 ${
            inLightbox ? 'xl:block translate-x-1/2' : ''
          }`}>
          <span className="sr-only">go to next image</span>
          <NavigateBackIcon className="hover:fill-Orange" />
        </Button>
        <figcaption className="sr-only">showcasing the sneaker images</figcaption>
      </figure>

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
