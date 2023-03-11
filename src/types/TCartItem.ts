export type TCartItem = {
  id: number;
  qty: number;
  title: string;
  price: number;
  image: { full: string; thumb: string };
  size: string;
  color: string;
  availableQty: number;
  discountPercentage: number;
};
