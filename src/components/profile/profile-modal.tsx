import { useState } from 'react';
import { useUserStore, useUIStore } from '../../store';

import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { FavoriteList } from './favorite-list';
import { HistoryList } from './history-list';
import { OrderList } from './order-list';

const options = ['favorites', 'orders', 'history'] as const;

export const ProfileModal = () => {
  const [profileOption, setProfileOption] = useState<typeof options[number]>('favorites');
  const profileIsOpen = useUIStore(state => state.profileIsOpen);
  const { favoriteList, historyList, orderList } = useUserStore(state => state);

  const animate = profileIsOpen
    ? 'translate-y-16 xl:translate-y-20 opacity-100 visible'
    : 'translate-y-0 opacity-0 invisible';

  return (
    <Card
      onClick={e => e.stopPropagation()}
      className={`absolute top-24 left-1/2 xl:left-full xl:-translate-x-[102%] max-w-4xl -translate-x-1/2 w-11/12 ${animate} transition-all duration-[var(--duration)] ease-in-out min-h-[20rem]`}>
      {/* ////////////////////////////// */}
      <div className="flex items-center justify-between p-8 gap-2 capitalize border-b border-Grayish_blue/25 tracking-wide">
        <Button
          aria-pressed={profileOption === 'favorites'}
          onClick={() => setProfileOption('favorites')}
          variant={'profile'}>
          <span>favorites</span>
          <span className="ml-4 px-2 py-1 min-w-[2rem] rounded-md ring-1 ring-Grayish_blue text-xl">
            {favoriteList.length > 99 ? '99+' : favoriteList.length}
          </span>
        </Button>

        <Button
          aria-pressed={profileOption === 'orders'}
          onClick={() => setProfileOption('orders')}
          variant={'profile'}>
          <span>orders</span>
          <span className="ml-4 px-2 py-1 min-w-[2rem] rounded-md ring-1 ring-Grayish_blue text-xl text-center">
            {orderList.length > 99 ? '99+' : orderList.length}
          </span>
        </Button>

        <Button
          aria-pressed={profileOption === 'history'}
          onClick={() => setProfileOption('history')}
          variant={'profile'}>
          <span>history</span>
          <span className="ml-4 py-1 min-w-[2rem] rounded-md ring-1 ring-Grayish_blue text-xl">
            {historyList.length > 99 ? '99+' : historyList.length}
          </span>
        </Button>
      </div>

      <div className="grid text-2xl text-Grayish_blue p-8 min-h-[20rem] max-h-[42rem] overflow-y-auto scrollbar-hide">
        {profileOption === 'favorites' && <FavoriteList />}
        {profileOption === 'history' && <HistoryList />}
        {profileOption === 'orders' && <OrderList />}
      </div>
    </Card>
  );
};
