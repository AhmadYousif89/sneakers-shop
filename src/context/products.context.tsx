import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
  FC,
} from 'react';
import { TProduct, TProductCategory } from '../types/product.type';
import { products } from '../data/products';

type InitProductState = {
  products: TProduct[];
  isLoading: boolean;
  selectedCategory: TProductCategory;
  curImageIdx: number;
};

const initState: InitProductState = {
  products,
  isLoading: false,
  selectedCategory: 'sports',
  curImageIdx: 0,
};

const initContext: UseProductContext = {
  state: initState,
  setSelectedCategory: () => {},
  setProductIsLoading: () => {},
  setProductCurImage: () => {},
};

const ProductContext = createContext<UseProductContext>(initContext);

export const ProductCtxProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ProductContext.Provider value={useProductContext(initState)}>
      {children}
    </ProductContext.Provider>
  );
};

type UseProductContext = ReturnType<typeof useProductContext>;

const useProductContext = (initState: InitProductState) => {
  const [category, setCategory] = useState(initState.selectedCategory);
  const [isLoading, setIsLoading] = useState(initState.isLoading);
  const [curImageIdx, setCurImageIdx] = useState(initState.curImageIdx);

  const setSelectedCategory = useCallback(
    (category: TProductCategory) => setCategory(category),
    [],
  );

  const setProductIsLoading = useCallback(
    (isLoading: boolean) => setIsLoading(isLoading),
    [],
  );

  const setProductCurImage = useCallback(
    (curImage: SetStateAction<number>) => setCurImageIdx(curImage),
    [],
  );

  const state = {
    products: initState.products,
    selectedCategory: category,
    curImageIdx,
    isLoading,
  };
  return { state, setSelectedCategory, setProductIsLoading, setProductCurImage };
};

export const useProducts = () => useContext(ProductContext);
