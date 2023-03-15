import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';

export const OrderList = () => {
  const navigate = useNavigate();
  const orderList = useUserStore(state => state.orderList);

  if (orderList.length === 0)
    return (
      <h2 className="place-self-center text-center">
        Looks like you haven't purchased any sneaker lately !
      </h2>
    );

  let sortedOrders = [...orderList];
  sortedOrders.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="flex flex-col">
      <h2 className="mb-8 text-2xl self-center">Most Recent</h2>
      <ul className="grid grid-cols-1 gap-8">
        {sortedOrders.map((item, idx) => (
          <li
            key={item.id}
            onClick={() => navigate(`orders/${item.id}`)}
            className="flex items-center text-Dark_grayish_blue text-xl justify-between gap-6 bg-Light_grayish_blue px-8 py-4 rounded-md cursor-pointer shadow-sm hover:ring-1 hover:ring-Grayish_blue transition-shadow duration-[var(--duration)]">
            <span className="p-1 text-center min-w-[3rem] font-bold rounded-md ring-1 ring-Grayish_blue">
              {idx < 9 ? `0${idx + 1}` : idx + 1}
            </span>
            <p className="text-center xl:text-2xl">
              <span>
                Order with id <b className="mx-1">"{item.id}"</b> was recieved successfully
              </span>
            </p>
            <span className="text-center font-bold tracking-wider">{item.date.split('at')[0]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
