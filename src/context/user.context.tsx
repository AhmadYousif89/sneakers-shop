import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import { TFavoriteItem, TOrderItem, THistoryItem, TOrder } from '../types';

type UserInitState = {
  favoriteList: TFavoriteItem[];
  historyList: THistoryItem[];
  orderList: TOrder[];
};

const storedFavList = JSON.parse(
  localStorage.getItem('favorite_list') as string,
) as TFavoriteItem[];
const storedHistoryList = JSON.parse(
  localStorage.getItem('history_list') as string,
) as THistoryItem[];
const storedOrderList = JSON.parse(
  localStorage.getItem('order_list') as string,
) as TOrder[];

const initState: UserInitState = {
  orderList: storedOrderList ?? [],
  favoriteList: storedFavList ?? [],
  historyList: storedHistoryList ?? [],
};

const UserContext = createContext<useProfileContextType>({
  state: initState,
  toggleItemFavorite: () => {},
  toggleItemHistory: () => {},
  addOrder: () => {},
});

export const UserCtxProvider = ({ children }: PropsWithChildren) => {
  return (
    <UserContext.Provider value={useProfileContext(initState)}>
      {children}
    </UserContext.Provider>
  );
};

type ReducerActions =
  | { type: 'add_to_orders'; payload: TOrderItem }
  | { type: 'toggle_history'; payload: THistoryItem }
  | { type: 'toggle_favorite'; payload: TFavoriteItem }
  | { type: 'clear_favoriteList'; payload: [] }
  | { type: 'clear_historyList'; payload: [] }
  | { type: 'clear_orderList'; payload: [] };

const reducer = (state: UserInitState, { type, payload }: ReducerActions) => {
  switch (type) {
    case 'toggle_favorite': {
      const exItem = state.favoriteList.find(i => i.id === payload.id);
      if (exItem) {
        const newFavorites = state.favoriteList.filter(item => item.id !== exItem.id);
        localStorage.setItem('favorite_list', JSON.stringify(newFavorites));
        return { ...state, favoriteList: newFavorites };
      } else {
        const newFavorites = [...state.favoriteList, payload];
        localStorage.setItem('favorite_list', JSON.stringify(newFavorites));
        return { ...state, favoriteList: newFavorites };
      }
    }
    case 'clear_favoriteList': {
      return { ...state, favoriteList: [] };
    }

    /* Actions on the orders list */
    case 'add_to_orders': {
      const newOrder: TOrder = {
        id: Math.random().toString(36).substring(6),
        order: payload,
        date: new Date().toLocaleString().replace(',', ' at '),
      };

      const newOrderList = [...state.orderList, newOrder];
      localStorage.setItem('order_list', JSON.stringify(newOrderList));

      return { ...state, orderList: newOrderList };
    }
    case 'clear_orderList': {
      return { ...state, orderList: [] };
    }

    /* Actions on the history list */
    case 'toggle_history': {
      const exItem = state.historyList.find(i => i.id === payload.id);
      if (exItem) {
        const newHistorys = state.historyList.filter(item => item.id !== exItem.id);
        localStorage.setItem('history_list', JSON.stringify(newHistorys));
        return { ...state, historyList: newHistorys };
      } else {
        const newHistory = [...state.historyList, payload];
        localStorage.setItem('history_list', JSON.stringify(newHistory));
        return { ...state, historyList: newHistory };
      }
    }
    case 'clear_historyList': {
      return { ...state, historyList: [] };
    }

    default:
      throw new Error('Invalid action type');
  }
};

type useProfileContextType = ReturnType<typeof useProfileContext>;

const useProfileContext = (initState: UserInitState) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const toggleItemFavorite = useCallback(
    (payload: TFavoriteItem) => dispatch({ type: 'toggle_favorite', payload }),
    [],
  );

  const toggleItemHistory = useCallback(
    (payload: THistoryItem) => dispatch({ type: 'toggle_history', payload }),
    [],
  );

  const addOrder = useCallback(
    (payload: TOrderItem) => dispatch({ type: 'add_to_orders', payload }),
    [],
  );
  return { state, toggleItemFavorite, toggleItemHistory, addOrder };
};

export const useProfile = () => useContext(UserContext);
