import { ProductCarousel } from '../components/product/carousel';
import { ProductDetails } from '../components/product/details';
import { Lightbox } from '../components/product/lightbox';
import { useUI } from '../context/ui.context';

export const Product = () => {
  const {
    state: { lightboxIsOpen },
  } = useUI();

  return (
    <section className="xl:grid grid-cols-2 justify-items-center xl:my-40">
      <ProductCarousel />
      <ProductDetails />
      {lightboxIsOpen && <Lightbox />}
    </section>
  );
};
