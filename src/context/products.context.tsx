import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react';
import { TProduct, TProductCategory } from '../types/product.type';
import { products } from '../data/products';

type InitProductState = {
  products: TProduct[];
  isLoading: boolean;
  curImageIdx: number;
  selectedCategory: TProductCategory;
};

const initState: InitProductState = {
  products,
  isLoading: false,
  curImageIdx: 0,
  selectedCategory: 'sports',
};

const initContext: UseProductContext = {
  state: initState,
  curImageHandler: () => {},
  setSelectedCategory: () => {},
  setProductIsLoading: () => {},
};

const ProductContext = createContext<UseProductContext>(initContext);

export const ProductCtxProvider = ({ children }: PropsWithChildren) => {
  return (
    <ProductContext.Provider value={useProductContext(initState)}>
      {children}
    </ProductContext.Provider>
  );
};

type ReducerActions =
  | { type: 'select_category'; payload: TProductCategory }
  | { type: 'loading_items'; payload: boolean };

const reducer = (state: InitProductState, { type, payload }: ReducerActions) => {
  switch (type) {
    case 'select_category': {
      return { ...state, selectedCategory: payload };
    }
    case 'loading_items': {
      return { ...state, isLoading: payload };
    }
    default:
      throw new Error('Invalid action type');
  }
};

type UseProductContext = ReturnType<typeof useProductContext>;

const useProductContext = (initState: InitProductState) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [curImageIdx, setCurImageIdx] = useState(0);

  const setSelectedCategory = useCallback(
    (payload: TProductCategory) => dispatch({ type: 'select_category', payload }),
    [],
  );

  const setProductIsLoading = useCallback(
    (payload: boolean) => dispatch({ type: 'loading_items', payload }),
    [],
  );

  const curImageHandler = useCallback(
    (payload: SetStateAction<number>) => setCurImageIdx(payload),
    [],
  );

  return {
    state: { ...state, curImageIdx },
    curImageHandler,
    setProductIsLoading,
    setSelectedCategory,
  };
};

export const useProducts = () => useContext(ProductContext);
