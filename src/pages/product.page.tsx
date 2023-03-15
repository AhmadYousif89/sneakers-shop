import { useUIStore } from '../store';
import { ProductCarousel } from '../components/product/carousel';
import { ProductDetails } from '../components/product/details';
import { Lightbox } from '../components/product/lightbox';

export const Product = () => {
  const lightboxIsOpen = useUIStore(state => state.lightboxIsOpen);

  return (
    <section className="xl:grid grid-cols-2 justify-items-center xl:my-40">
      <ProductCarousel />
      <ProductDetails />
      {lightboxIsOpen && <Lightbox />}
    </section>
  );
};
