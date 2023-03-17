import { useParams } from 'react-router-dom';
import { useUserStore } from '../store';

import { ItemsDetails } from '../components/order/items-details';
import { OrderSummary } from '../components/order/order-summary';
import { PersonalInfo } from '../components/order/personal-info';
import { OrderStatus } from '../components/order/order-status';

export const Orders = () => {
  const { oId } = useParams();
  const orderList = useUserStore(state => state.orderList);

  const curOrder = orderList.find(order => order.id === oId);

  if (orderList.length === 0)
    return (
      <p className="text-3xl font-bold mx-8 text-Dark_grayish_blue my-24 text-center">
        You have not placed any order lately !
      </p>
    );

  if (!curOrder)
    return (
      <p className="text-3xl font-bold mx-8 text-Dark_grayish_blue my-24 text-center">
        Order Not Found !
      </p>
    );

  return (
    <section className="grid xl:grid-cols-3 mx-8 my-16 gap-8 xl:my-32">
      <section className="flex flex-col gap-4 text-4xl row-start-1 col-span-full capitalize font-bold mb-8 xl:text-5xl">
        <div className="flex items-center gap-6">
          <h2 className="text-Very_dark_blue">order confirmed</h2>
          <p className="text-Dark_grayish_blue">#{oId}</p>
        </div>

        <p className="text-xl text-Dark_grayish_blue normal-case tracking-wide">
          Placed on : {curOrder.date}
        </p>
      </section>

      <ItemsDetails currentOrderCart={curOrder.cart} />

      <OrderSummary currentOrder={curOrder} />

      <PersonalInfo />

      <OrderStatus />
    </section>
  );
};
