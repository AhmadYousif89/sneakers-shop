import { useAuthStore, useUserStore } from '../../store';

import { SectionWrapper } from './section-wrapper';
import profileImg from '../../assets/images/avatar.png';
import moneyImg from '../../assets/images/money.png';

export const PersonalInfo = () => {
  const orderList = useUserStore(state => state.orderList);
  const user = useAuthStore(state => state.user);
  const numOfOrders = orderList.length;

  return (
    <SectionWrapper className="xl:row-start-2 xl:col-start-3">
      <h3 className="text-3xl xl:text-4xl font-bold text-Very_dark_blue/80">Personal info</h3>

      <div className="grid gap-8 xl:gap-12">
        {/* Personal Info */}
        <div className="pb-8 flex flex-col gap-8 border-b-2 border-Grayish_blue/50">
          <div className="flex items-center justify-between">
            <img src={profileImg} alt="profile image" className="w-16" />
            <div className="grid grid-cols-2 items-center justify-items-center gap-4">
              <p className="text-3xl font-bold text-Orange">{user?.name}</p>
              <p className="text-xl capitalize text-Dark_grayish_blue xl:text-2xl">
                <b className="mr-2 text-2xl">{numOfOrders}</b>
                <span>Total orders</span>
              </p>
            </div>
          </div>
          <p className="flex items-end justify-between">
            <span className="text-xl text-Dark_grayish_blue">Current Email</span>
            <span className="text-3xl tracking-wider text-Dark_grayish_blue/75">{user?.email}</span>
          </p>
        </div>

        {/* Shipping Address */}
        <div className="pb-8 border-b-2 border-Grayish_blue/50">
          <h4 className="text-2xl capitalize mb-8 xl:text-3xl">shipping address</h4>

          <div className="space-y-2 text-xl xl:text-2xl text-Dark_grayish_blue">
            <p>1234 Elm Street, Apt 567</p>
            <p>Anytown, CA 98765</p>
            <p>Somewhere on Earth</p>
          </div>
        </div>

        {/* Billing Address */}
        <div className="pb-8 border-b-2 border-Grayish_blue/50">
          <h4 className="text-2xl capitalize mb-8 xl:text-3xl">billing address</h4>

          <div className="space-y-2 text-xl xl:text-2xl text-Dark_grayish_blue">
            <p>5678 Maple Avenue, Suite 910</p>
            <p>Sometown, NY 12345</p>
            <p>Another place on Earth</p>
          </div>
        </div>

        {/* PAYMENTS */}
        <div>
          <h4 className="text-2xl capitalize mb-8 xl:text-3xl">payment method</h4>
          <div className="flex items-center gap-4 font-bold text-2xl xl:text-3xl text-Dark_grayish_blue">
            <p>Cash on delivery</p>
            <img src={moneyImg} alt="cash money image" className="w-12" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
