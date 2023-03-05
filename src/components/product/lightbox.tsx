import { useEffect } from 'react';
import { useUI } from '../../context/ui.context';
import { Button } from '../ui/button';
import { Overlay } from '../ui/overlay';
import { ProductCarousel } from './carousel';

export const Lightbox = () => {
  const { setLightboxState } = useUI();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxState(false);
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <Overlay>
      <div className="flex flex-col gap-4" onClick={e => e.stopPropagation()}>
        <Button
          title="close lightbox"
          onClick={() => setLightboxState(false)}
          className={'text-6xl self-end hover:text-Orange'}>
          &times;
        </Button>
        <ProductCarousel inLightbox={true} />
      </div>
    </Overlay>
  );
};
