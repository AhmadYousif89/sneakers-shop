export type TProductCategory = 'sports' | 'fashion' | 'gym' | 'running' | 'training';
export type TProduct = {
  id: number;
  title: string;
  image: string;
  size: string;
  color: string;
  price: number;
  description: string;
  availableQty: number;
  discountedPrice: number;
  discountPercentage: number;
  category: TProductCategory;
  inStock: boolean;
};
