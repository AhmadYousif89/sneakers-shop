import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/user.context';
import { CloseIcon } from '../icons';
import { Button } from '../ui/button';

export const FavoriteList = () => {
  const {
    state: { favoriteList },
    toggleItemFavorite,
  } = useProfile();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  if (favoriteList.length === 0)
    return <h2 className="place-self-center">You don't have any favorites !</h2>;

  const filteredFavList = favoriteList.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  const noQueryMsg = (
    <p className="mt-20 text-Dark_grayish_blue normal-case">
      We can't find what you're looking for !
    </p>
  );

  return (
    <div className="flex flex-col items-center capitalize text-center">
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

      <ul className="mx-4 my-8 grid grid-cols-3 auto-rows-min gap-4">
        {filteredFavList.map(item => (
          <li
            key={item.id}
            onClick={() => navigate('product')}
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
            <img
              src={item.image.thumb as string}
              alt={item.title}
              className="rounded-xl w-20"
            />
            <p className="text-Dark_grayish_blue text-xl pointer-events-none">
              {item.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
