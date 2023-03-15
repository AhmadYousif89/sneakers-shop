import { useProductStore } from '../../store';
import { CategoryItem } from './category-item';

export const CategoryList = () => {
  const products = useProductStore(state => state.products);
  const selectedCategory = useProductStore(state => state.selectedCategory);

  const filteredProducts = products.filter(p => p.category === selectedCategory);

  return (
    <ul className="grid grid-flow-col xl:justify-evenly gap-8 px-2 my-8 overflow-auto scrollbar-hide whitespace-pre-line">
      {filteredProducts.map(item => (
        <CategoryItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
