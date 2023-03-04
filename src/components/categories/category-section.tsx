import { useEffect } from 'react';

import { useProducts } from '../../context/products.context';
import { TProductCategory } from '../../types/product.type';
import { CategoryList } from './category-list';
import { Button } from '../ui/button';

const categories: TProductCategory[] = [
  'sports',
  'fashion',
  'gym',
  'running',
  'training',
];

export const CategorySection = () => {
  const {
    state: { selectedCategory, isLoading },
    setSelectedCategory,
    setProductIsLoading,
  } = useProducts();

  useEffect(() => {
    if (!isLoading) return;
    const id = setTimeout(() => {
      setProductIsLoading(false);
    }, 1000);
    return () => clearTimeout(id);
  }, [isLoading]);

  return (
    <section className="mt-20 mb-28 mx-8 flex flex-col gap-4">
      <h2 className="text-3xl text-Very_dark_blue font-bold">Categories</h2>

      <div className="flex items-center gap-4 px-2 py-12 overflow-auto scrollbar-hide whitespace-nowrap">
        {categories.map(category => (
          <Button
            key={category}
            variant="category"
            aria-selected={selectedCategory === category}
            onClick={() => {
              if (selectedCategory === category) return;
              setProductIsLoading(true);
              setSelectedCategory(category);
            }}>
            <span>{category}</span>
          </Button>
        ))}
      </div>

      <CategoryList />
    </section>
  );
};
