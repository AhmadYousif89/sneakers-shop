import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/user.context';
import { CloseIcon } from '../icons';
import { Button } from '../ui/button';

export const HistoryList = () => {
  const {
    state: { historyList },
    toggleItemHistory,
  } = useProfile();
  const navigate = useNavigate();

  if (historyList.length === 0)
    return (
      <h2 className="place-self-center">
        You have no history, you can start with our awesome collections
      </h2>
    );

  return (
    <section className="mx-4 flex flex-col items-center">
      <h2 className="mb-8 text-3xl">Most Recent</h2>
      <ul className="grid grid-cols-1 gap-4">
        {historyList.map(item => (
          <li
            key={item.id}
            onClick={() => navigate('product')}
            className="relative flex items-center gap-4 bg-Light_grayish_blue pl-12 pr-4 py-4 rounded-md capitalize cursor-pointer shadow-sm hover:ring-1 hover:ring-Grayish_blue transition-shadow duration-[var(--duration)]">
            <Button
              title="delete item from history"
              onClick={e => {
                e.stopPropagation();
                toggleItemHistory({ ...item });
              }}
              className="absolute top-1/2 -translate-y-1/2 left-0"
              variant={'profile_del'}>
              <CloseIcon />
            </Button>
            <img
              src={item.image.thumb as string}
              alt={item.title}
              className="rounded-xl w-16 xl:w-20"
            />
            <p className="text-Dark_grayish_blue text-xl xl:text-2xl">{item.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
