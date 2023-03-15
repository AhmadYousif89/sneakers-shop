import { useEffect } from 'react';
import { useUIStore } from '../../store';

import { Button } from '../ui/button';
import { Overlay } from '../ui/overlay';
import { ProductCarousel } from './carousel';

export const Lightbox = () => {
  const setLightboxStatus = useUIStore(state => state.setLightboxStatus);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxStatus(false);
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <Overlay onClick={() => setLightboxStatus(false)}>
      <div className="flex flex-col gap-4" onClick={e => e.stopPropagation()}>
        <Button
          title="close lightbox"
          onClick={() => setLightboxStatus(false)}
          className={'text-6xl self-end hover:text-Orange'}>
          &times;
        </Button>
        <ProductCarousel inLightbox={true} />
      </div>
    </Overlay>
  );
};
