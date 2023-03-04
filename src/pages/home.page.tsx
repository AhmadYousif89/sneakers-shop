import { FeaturedProduct } from '../components/product/featured';
import { HeroSection } from '../components/layout/hero-section';
import { NewsletterSection } from '../components/layout/newsletter';
import { SearchSection } from '../components/layout/search-section';
import { CategorySection } from '../components/categories/category-section';

export const Home = () => {
  return (
    <section>
      <HeroSection />
      <SearchSection />
      <FeaturedProduct />
      <CategorySection />
      <NewsletterSection />
    </section>
  );
};
