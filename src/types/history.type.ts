import { TProduct } from './product.type';

export type THistoryItem = Pick<TProduct, 'id' | 'title' | 'image'>;
