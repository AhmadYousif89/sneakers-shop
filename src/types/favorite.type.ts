import { TProduct } from './product.type';

export type TFavoriteItem = Pick<TProduct, 'id' | 'title' | 'image' | 'category'>;
