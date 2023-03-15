import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';
import { TFavoriteItem, THistoryItem, TOrder, TOrderItem } from '../types';

type UserState = {
  favoriteList: TFavoriteItem[];
  historyList: THistoryItem[];
  orderList: TOrder[];
};

type UserActions = {
  toggleItemFavorite: (payload: TFavoriteItem) => void;
  clearFavorites: () => void;
  toggleItemHistory: (payload: THistoryItem) => void;
  clearHistory: () => void;
  addOrder: (payload: TOrderItem) => void;
  clearOrders: () => void;
};

type InitUserStoreState = UserState & UserActions;

const key = 'user-store';

const { state } = JSON.parse(localStorage.getItem(key) as string) as StorageValue<UserState>;

export const useUserStore = create<InitUserStoreState>()(
  persist(
    (set, get) => ({
      favoriteList: state.favoriteList ?? [],
      historyList: state.historyList ?? [],
      orderList: state.orderList ?? [],
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

      toggleItemHistory: payload => {
        const exItem = get().historyList.find(item => item.id === payload.id);
        if (exItem) {
          const newHistorys = get().historyList.filter(item => item.id !== exItem.id);
          set({ historyList: newHistorys });
        } else {
          const newHistory = [...get().historyList, payload];
          set({ historyList: newHistory });
        }
      },
      clearHistory: () => set({ historyList: [] }),

      addOrder: payload => {
        const newOrder: TOrder = {
          id: Math.random().toString(36).substring(6),
          order: payload,
          date: new Date().toLocaleString().replace(',', ' at '),
        };
        const newOrderList = [...get().orderList, newOrder];
        set({ orderList: newOrderList });
      },
      clearOrders: () => set({ orderList: [] }),
    }),
    { name: key },
  ),
);
