import { TCartItem } from './TCartItem';

export type TOrderItem = Omit<TCartItem, 'availableQty'>[];
export type TOrder = { id: string; order: TOrderItem; date: string };
