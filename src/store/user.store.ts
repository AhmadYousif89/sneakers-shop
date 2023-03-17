import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';
import { TFavoriteItem, THistoryItem, TOrder } from '../types';

type UserState = {
  favoriteList: TFavoriteItem[];
  historyList: THistoryItem[];
  orderList: TOrder[];
};

type UserActions = {
  toggleItemFavorite: (payload: TFavoriteItem) => void;
  clearFavorites: () => void;
  addItemHistory: (item: THistoryItem) => void;
  removeItemHistory: (id: number) => void;
  clearHistory: () => void;
  addOrder: (order: TOrder) => void;
  clearOrders: () => void;
};

type InitUserStoreState = UserState & UserActions;

const key = 'user-store';

const { state } =
  (JSON.parse(localStorage.getItem(key) as string) as StorageValue<UserState>) ?? {};

export const useUserStore = create<InitUserStoreState>()(
  persist(
    (set, get) => ({
      favoriteList: state?.favoriteList ?? [],
      historyList: state?.historyList ?? [],
      orderList: state?.orderList ?? [],
      toggleItemFavorite: payload => {
        const exItem = get().favoriteList.find(item => item.id === payload.id);
        if (exItem) {
          const newFavorites = get().favoriteList.filter(item => item.id !== exItem.id);
          set({ favoriteList: newFavorites });
        } else {
          const newFavorites = [...get().favoriteList, payload];
          set({ favoriteList: newFavorites });
        }
      },
      clearFavorites: () => set({ favoriteList: [] }),

      addItemHistory: item => {
        const exItem = get().historyList.find(item => item.id === item.id);
        if (exItem) return;
        else {
          const newHistory = [...get().historyList, item];
          set({ historyList: newHistory });
        }
      },
      removeItemHistory: itemId => {
        const exItem = get().historyList.find(item => item.id === itemId);
        if (exItem) {
          const newHistorys = get().historyList.filter(item => item.id !== exItem.id);
          set({ historyList: newHistorys });
        }
      },
      clearHistory: () => set({ historyList: [] }),

      addOrder: payload => {
        const newOrderList = [...get().orderList, payload];
        set({ orderList: newOrderList });
      },
      clearOrders: () => set({ orderList: [] }),
    }),
    { name: key },
  ),
);
