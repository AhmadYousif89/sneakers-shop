import { TCartItem } from './TCartItem';

export type TOrderItem = Pick<
  TCartItem,
  'id' | 'title' | 'image' | 'price' | 'qty' | 'size'
> & { date: string };
