import { ProductCaruosel } from '../components/product/caruosel';
import { ProductDetails } from '../components/product/details';
import { Lightbox } from '../components/product/lightbox';
import { useUI } from '../context/ui.context';

export const Product = () => {
  const {
    state: { lightboxIsOpen },
  } = useUI();

  return (
    <section className="xl:grid grid-cols-2 justify-items-center xl:my-40">
      <ProductCaruosel />
      <ProductDetails />
      {lightboxIsOpen && <Lightbox />}
    </section>
  );
};
