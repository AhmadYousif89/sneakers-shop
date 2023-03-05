import { useUI } from '../../context/ui.context';
import { Button } from '../ui/button';
import { Overlay } from '../ui/overlay';
import { ProductCaruosel } from './caruosel';

export const Lightbox = () => {
  const { setLightboxState } = useUI();

  return (
    <Overlay>
      <div onClick={e => e.stopPropagation()}>
        <Button
          title="close lightbox"
          onClick={() => setLightboxState(false)}
          className={'text-6xl z-50 float-right mb-4 hover:text-Orange'}>
          &times;
        </Button>
        <ProductCaruosel inLightbox={true} />
      </div>
    </Overlay>
  );
};
