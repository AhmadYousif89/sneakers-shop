import { useState } from 'react';
import { useUI } from '../../context/ui.context';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const options = ['favorites', 'orders', 'history'] as const;

export const ProfileModal = () => {
  const [profileOption, setProfileOption] = useState<typeof options[number]>('favorites');
  const {
    state: { profileIsOpen },
  } = useUI();

  const animateCart = profileIsOpen
    ? 'translate-y-16 xl:translate-y-20 opacity-100 visible'
    : 'translate-y-0 opacity-0 invisible';

  return (
    <Card
      onClick={e => e.stopPropagation()}
      className={`absolute z-10 top-24 left-1/2 xl:left-full xl:-translate-x-[102%] max-w-4xl -translate-x-1/2 w-11/12 ${animateCart} transition-all duration-[var(--duration)] ease-in-out min-h-[20rem]`}>
      <div className="flex items-center justify-between p-8 capitalize border-b border-Grayish_blue/25 tracking-wide">
        <Button
          aria-pressed={profileOption === 'favorites'}
          onClick={() => setProfileOption('favorites')}
          variant={'profile'}
          className="">
          favorites
        </Button>
        <Button
          aria-pressed={profileOption === 'orders'}
          onClick={() => setProfileOption('orders')}
          variant={'profile'}
          className="">
          orders
        </Button>
        <Button
          aria-pressed={profileOption === 'history'}
          onClick={() => setProfileOption('history')}
          variant={'profile'}
          className="">
          history
        </Button>
      </div>

      <p className="text-2xl text-Grayish_blue capitalize px-2 text-center my-32 font-bold">
        {profileOption === 'favorites' && <span>you don't have any favorites yet !</span>}
        {profileOption === 'orders' && (
          <span>looks like you haven't purchased any sneaker lately !</span>
        )}
        {profileOption === 'history' && (
          <span>you have no history, you may take a look at our awesome collections</span>
        )}
      </p>
    </Card>
  );
};
