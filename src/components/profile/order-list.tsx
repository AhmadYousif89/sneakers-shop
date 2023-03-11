import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/user.context';

export const OrderList = () => {
  const {
    state: { orderList },
  } = useProfile();
  const navigate = useNavigate();

  if (orderList.length === 0)
    return (
      <h2 className="self-center">
        looks like you haven't purchased any sneaker lately !
      </h2>
    );

  return (
    <section className="mx-4 flex flex-col items-center">
      <h2 className="font-normal my-8">Most recent</h2>
      <ul className="grid grid-cols-1 gap-4">
        {orderList.map(item => (
          <li
            key={item.id}
            onClick={() => navigate('product')}
            className="flex items-center gap-8 bg-Light_grayish_blue px-8 py-4 rounded-xl cursor-pointer shadow-sm hover:ring-1 hover:ring-Grayish_blue transition-shadow duration-[var(--duration)]">
            <img
              src={item.image.thumb as string}
              alt={item.title}
              className="rounded-xl w-20"
            />
            <p className="text-Dark_grayish_blue">{item.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
