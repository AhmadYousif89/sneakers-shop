import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/user.context';

export const OrderList = () => {
  const {
    state: { orderList },
  } = useProfile();
  const navigate = useNavigate();

  if (orderList.length === 0)
    return (
      <h2 className="place-self-center">
        Looks like you haven't purchased any sneaker lately !
      </h2>
    );

  let sortedOrders = [...orderList];
  sortedOrders.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="mx-4 flex flex-col items-center">
      <h2 className="mb-8 text-3xl">Most Recent</h2>
      <ul className="grid grid-cols-1 gap-8">
        {sortedOrders.map((item, idx) => (
          <li
            key={item.id}
            onClick={() => navigate(`orders/${item.id}`)}
            className="flex items-center gap-6 bg-Light_grayish_blue px-8 py-4 rounded-md cursor-pointer shadow-sm hover:ring-1 hover:ring-Grayish_blue transition-shadow duration-[var(--duration)]">
            <span className="p-1 text-center text-xl text-Dark_grayish_blue min-w-[3rem] font-bold rounded-md ring-1 ring-Grayish_blue">
              {idx < 9 ? `0${idx + 1}` : idx + 1}
            </span>
            <p className="text-Dark_grayish_blue grid grid-cols-[1fr,minmax(5rem,8rem)] items-center gap-6 text-center">
              <span>
                Order with id <b className="mx-1">"{item.id}"</b> was recieved
                successfully
              </span>
              <span className="text-center text-xl font-bold font-mono">
                {item.date.split('at')[0]}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
