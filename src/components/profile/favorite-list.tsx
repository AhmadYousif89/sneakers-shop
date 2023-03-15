import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';

import { CloseIcon } from '../icons';
import { Button } from '../ui/button';

export const FavoriteList = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const favoriteList = useUserStore(state => state.favoriteList);
  const toggleItemFavorite = useUserStore(state => state.toggleItemFavorite);

  if (favoriteList.length === 0)
    return <h2 className="place-self-center">You don't have any favorites !</h2>;

  const filteredFavList = favoriteList.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  const noQueryMsg = (
    <h2 className="place-self-center mt-20">We can't find what you're looking for !</h2>
  );

  return (
    <div className="flex flex-col capitalize text-center">
      <label htmlFor="search-favorites">
        <input
          type="text"
          id="search-favorites"
          onChange={e => setQuery(e.target.value)}
          placeholder="Search your favorite sneaker"
          className="ml-4 px-6 py-2 focus-visible:outline-Orange focus-visible:outline-1 focus-visible:outline rounded-md text-Very_dark_blue ring-1 ring-Grayish_blue placeholder:text-center placeholder:text-xl"
        />
      </label>

      {filteredFavList.length === 0 && noQueryMsg}

      <ul className="my-12 grid grid-cols-2 gap-6 xl:grid-cols-3">
        {filteredFavList.map(item => (
          <li
            key={item.id}
            onClick={() => {
              navigate('product');
            }}
            className="relative flex flex-col items-center justify-center gap-2 bg-Light_grayish_blue px-4 py-4 rounded-md cursor-pointer shadow-sm hover:ring-1 hover:ring-Grayish_blue transition-shadow duration-[var(--duration)]">
            <Button
              title="delete item from favorite"
              onClick={e => {
                e.stopPropagation();
                toggleItemFavorite({ ...item });
              }}
              className="absolute top-0 left-0"
              variant={'profile_del'}>
              <CloseIcon />
            </Button>
            <img src={item.image.thumb as string} alt={item.title} className="rounded-xl w-20" />
            <p className="text-Dark_grayish_blue text-xl pointer-events-none">{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
