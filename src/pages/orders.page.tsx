import { useParams } from 'react-router-dom';
import profileImg from '../assets/images/avatar.png';
import { useProfile } from '../context/user.context';

export const Orders = () => {
  const {
    state: { orderList },
  } = useProfile();
  const { id: oId } = useParams();

  const curOrder = orderList.find(order => order.id === oId);

  if (!curOrder)
    return (
      <p className="text-3xl font-bold mx-8 text-Dark_grayish_blue my-16 text-center">
        You didn't place any order lately !
      </p>
    );

  const numOfOrders = orderList.length;
  let originalPrice = 0;

  const subtotal = curOrder.order.reduce((acc, curItem) => {
    let total = 0;
    originalPrice = curItem.price / (1 - curItem.discountPercentage);
    total += originalPrice * curItem.qty;
    return acc + total;
  }, 0);

  const totalDiscount = curOrder.order.reduce((acc, curItem) => {
    let discount = 0;
    originalPrice = curItem.price / (1 - curItem.discountPercentage);
    discount += originalPrice * curItem.discountPercentage * curItem.qty;
    return acc + discount;
  }, 0);

  const deliveryFees = 50;
  const freeShippingPoint = 300;
  const hasDeliveryFees = subtotal > freeShippingPoint ? false : true;
  const totalDue = hasDeliveryFees
    ? subtotal - totalDiscount + deliveryFees
    : (subtotal - totalDiscount).toFixed(2);

  return (
    <section className="grid xl:grid-cols-3 mx-8 my-16 gap-8 xl:my-32">
      <div className="flex flex-col gap-4 text-4xl row-start-1 col-span-full capitalize font-bold mb-8 xl:text-5xl">
        <div className="flex items-center gap-6">
          <h2 className="text-Very_dark_blue">order confirmed</h2>
          <p className="text-Dark_grayish_blue">#{oId}</p>
        </div>

        <p className="text-xl text-Dark_grayish_blue normal-case tracking-wide">
          Placed on : {curOrder.date}
        </p>
      </div>

      <section className="bg-Light_grayish_blue xl:col-span-2 p-8 xl:p-12 rounded-xl row-start-2 col-span-full">
        <h3 className="text-3xl xl:text-4xl font-bold text-Very_dark_blue/80">
          Items details
        </h3>

        <ul className="flex flex-col gap-8 mt-16 xl:gap-16">
          {curOrder.order.map(item => {
            const originalPrice = item.price / (1 - item.discountPercentage);
            return (
              <li
                key={item.id}
                className="group grid grid-cols-[minmax(auto,12rem),minmax(18rem,1fr)] gap-6 items-center xl:gap-12">
                <figure className="rounded-3xl bg-Grayish_blue">
                  <img
                    alt={item.title}
                    src={item.image.thumb}
                    className="w-full rounded-3xl"
                  />
                  <figcaption className="sr-only">product image</figcaption>
                </figure>

                <div className="grid pb-8 border-b-2 border-Grayish_blue/50 group-last:border-0 text-xl capitalize text-Dark_grayish_blue gap-2 xl:pb-16 xl:grid-cols-[.75fr,1fr] xl:text-2xl">
                  <h4 className="text-2xl mb-4 text-Dark_grayish_blue font-bold xl:text-3xl">
                    {item.title}
                  </h4>

                  <p className="flex items-center gap-8 mb-4 xl:justify-between xl:row-start-1 xl:col-start-2">
                    <span className="space-x-4">
                      <b className="text-2xl xl:text-3xl">${item.price}</b>
                      <span className="text-xl line-through font-bold text-Dark_grayish_blue/50 xl:text-2xl">
                        ${originalPrice.toFixed(2)}
                      </span>
                    </span>

                    <b className="text-2xl xl:text-3xl">{item.qty}</b>

                    <span className="flex items-center gap-4">
                      <span className="font-bold bg-Pale_orange text-Orange py-1 px-2 rounded-md text-xl xl:text-2xl">
                        {item.discountPercentage * 100}%
                      </span>
                    </span>
                  </p>

                  <div className="space-y-2 xl:space-y-4">
                    <p>
                      color : <b className="text-2xl">{item.color}</b>
                    </p>

                    <p>
                      size : <b className="text-2xl">{item.size}</b>
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Summary */}
      <section className="bg-Light_grayish_blue p-8 xl:p-12 rounded-xl grid gap-8 xl:col-span-2">
        <h3 className="text-3xl xl:text-4xl font-bold text-Very_dark_blue/80">Summary</h3>

        <div className="pb-8 border-b-2 border-Grayish_blue/50 capitalize text-xl font-bold text-Dark_grayish_blue space-y-2 tracking-wide xl:text-2xl">
          <p className="flex items-center justify-between">
            <span>subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </p>
          <p className="flex items-center justify-between text-green-400">
            <span>discount</span>
            <span>${totalDiscount.toFixed(2)}</span>
          </p>
          <p className="flex items-center justify-between text-indigo-400">
            <span>shipping</span>
            <span>${hasDeliveryFees ? `${deliveryFees}.00` : '00.0'}</span>
          </p>
        </div>

        <p className="flex items-center justify-between text-2xl font-bold tracking-wide xl:text-3xl">
          <span>Total Due</span>
          <span>${totalDue}</span>
        </p>
      </section>

      <section className="bg-Light_grayish_blue p-8 xl:p-12 rounded-xl grid gap-8 xl:col-start-3 xl:row-start-2">
        <h3 className="text-3xl xl:text-4xl font-bold text-Very_dark_blue/80">
          Personal info
        </h3>

        {/* Personal Info */}
        <div className="pb-8 flex items-center justify-between gap-4 border-b-2 border-Grayish_blue/50">
          <img src={profileImg} alt="profile image" className="w-20" />
          <p className="text-3xl font-bold text-Orange">Big_Jo 89</p>
          <p className="text-xl capitalize text-Dark_grayish_blue xl:text-2xl">
            <b className="mr-2">{numOfOrders}</b>
            <span>Total orders</span>
          </p>
        </div>

        {/* Shipping and Billing */}
        <div className="pb-8 border-b-2 border-Grayish_blue/50">
          <h4 className="text-2xl capitalize mb-8 xl:text-3xl">shipping address</h4>

          <div className="space-y-2 text-xl xl:text-2xl text-Dark_grayish_blue">
            <p>1234 Elm Street, Apt 567</p>
            <p>Anytown, CA 98765</p>
            <p>Somewhere on Earth</p>
          </div>
        </div>

        <div>
          <h4 className="text-2xl capitalize mb-8 xl:text-3xl">billing address</h4>

          <div className="space-y-2 text-xl xl:text-2xl text-Dark_grayish_blue">
            <p>5678 Maple Avenue, Suite 910</p>
            <p>Sometown, NY 12345</p>
            <p>Another place on Earth</p>
          </div>
        </div>
      </section>

      <section className="bg-Light_grayish_blue p-8 xl:p-12 rounded-xl grid gap-8">
        <div className="flex items-center gap-8 xl:gap-16">
          <h3 className="text-3xl xl:text-4xl font-bold text-Very_dark_blue/80">
            Status
          </h3>
          <div className="space-x-2">
            <span className="px-4 py-2 text-lg bg-Orange/80 text-white rounded-md ">
              in process
            </span>
            <span className="text-2xl"> 🛒 </span>
            <span className="px-4 py-2 text-lg bg-green-500/80 text-white rounded-md ">
              to be shipped
            </span>
          </div>
        </div>

        <p className="grid gap-4 text-xl text-Dark_grayish_blue text-center xl:text-2xl">
          <span>Thank you for placing an order with</span>
          <b className="text-3xl uppercase text-Orange xl:text-4xl"> sneakers </b>
          <span>
            We are pleased to confirm that your order has been received and is being
            processed.
          </span>
          <span>
            An email with the shipping information and tracking number will be sent once
            your order has been shipped.
          </span>
        </p>
      </section>
    </section>
  );
};
