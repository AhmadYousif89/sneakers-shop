type TProductImage = { full: string | string[]; thumb: string | string[] };
export type TProductCategory = 'sports' | 'fashion' | 'gym' | 'running' | 'training';
export type TProduct = {
  id: number;
  title: string;
  image: TProductImage;
  size: string;
  color: string;
  price: number;
  description: string;
  availableQty: number;
  discountedPrice: number;
  discountPercentage: number;
  category: TProductCategory;
  isFavorite: boolean;
  inStock: boolean;
};
