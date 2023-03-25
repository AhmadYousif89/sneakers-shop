import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '../store';

import { Button } from '../components/ui/button';
import { DeleteIcon } from '../components/icons';
import { ActionModal } from '../components/ui/action-modal';
import { OrderStatus } from '../components/order/order-status';
import { ItemsDetails } from '../components/order/items-details';
import { OrderSummary } from '../components/order/order-summary';
import { PersonalInfo } from '../components/order/personal-info';

export const Orders = () => {
  const { oId } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const orderList = useUserStore(state => state.orderList);
  const deleteOrder = useUserStore(state => state.deleteOrder);

  const curOrder = orderList.find(order => order.id === oId);

  if (orderList.length === 0)
    return (
      <p className="text-3xl font-bold mx-8 text-Dark_grayish_blue my-24 text-center">
        You have not placed any order !
      </p>
    );

  if (!curOrder)
    return (
      <p className="text-3xl font-bold mx-8 text-Dark_grayish_blue my-24 text-center">
        Order Not Found !
      </p>
    );

  return (
    <>
      <ActionModal
        state={modal}
        variants={'delete_order'}
        onConfirm={() => {
          deleteOrder(curOrder.id);
          navigate('/home', { replace: true });
        }}
        onCancel={() => setModal(false)}
      />
      <section className="grid xl:grid-cols-3 mx-8 my-16 gap-8 xl:my-32">
        <section className="flex flex-col gap-4 text-4xl row-start-1 col-span-full capitalize font-bold mb-8 xl:text-5xl">
          <div className="flex items-end text-center gap-6">
            <h2 className="text-Very_dark_blue">order confirmed</h2>
            <p className="text-Dark_grayish_blue">#{oId}</p>
          </div>

          <div className="flex items-center justify-between text-xl text-Dark_grayish_blue normal-case tracking-wide">
            <span>Placed on : {curOrder.date}</span>
            <Button
              title="delete this order"
              onClick={() => setModal(true)}
              className="group bg-Grayish_blue/50 w-12 h-12 flex items-center justify-center rounded-lg">
              <DeleteIcon className="fill-Very_dark_blue group-hover:fill-Orange group-focus-visible:fill-Orange" />
            </Button>
          </div>
        </section>

        <ItemsDetails currentOrderCart={curOrder.cart} />

        <OrderSummary currentOrder={curOrder} />

        <PersonalInfo />

        <OrderStatus />
      </section>
    </>
  );
};
