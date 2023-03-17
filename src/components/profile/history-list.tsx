import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';
import { Button } from '../ui/button';
import { CloseIcon } from '../icons';

export const HistoryList = () => {
  const navigate = useNavigate();
  const historyList = useUserStore(state => state.historyList);
  const removeItemHistory = useUserStore(state => state.removeItemHistory);

  if (historyList.length === 0)
    return (
      <h2 className="place-self-center text-center">
        You have no history, you can start with our awesome collections
      </h2>
    );

  return (
    <section className="flex flex-col">
      <h2 className="mb-8 text-2xl self-center">Most Recent</h2>
      <ul className="grid grid-cols-1 justify-items-center mx-8 gap-4">
        {historyList.map(item => (
          <li
            key={item.id}
            onClick={() => navigate('product')}
            className="relative flex items-center gap-4 bg-Light_grayish_blue pl-16 pr-8 py-4 rounded-md capitalize cursor-pointer shadow-sm hover:ring-1 hover:ring-Grayish_blue transition-shadow duration-[var(--duration)]">
            <Button
              title="delete item from history"
              onClick={e => {
                e.stopPropagation();
                removeItemHistory(item.id);
              }}
              className="absolute top-1/2 -translate-y-1/2 left-2"
              variant={'profile_del'}>
              <CloseIcon />
            </Button>

            <img
              src={item.image.thumb as string}
              alt={item.title}
              className="rounded-xl w-16 xl:w-20 object-contain bg-Grayish_blue aspect-square"
            />
            <p className="text-Dark_grayish_blue text-xl">{item.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
