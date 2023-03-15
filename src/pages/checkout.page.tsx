import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store';

import { Button } from '../components/ui/button';
import { Overlay } from '../components/ui/overlay';
import { ActionModal } from '../components/ui/action-modal';
import { NavigateBackIcon, DeleteIcon } from '../components/icons';
import { PromoCodeInput } from '../components/checkout/promo-code';
import { CheckoutList } from '../components/checkout/checkout-list';
import { CheckoutTotal } from '../components/checkout/checkout-total';

import sideImg from '../assets/images/chkout.jpg';
import emptyCartImg from '../assets/images/cart-empty.png';

export const Checkout = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);

  if (cart.length === 0)
    return (
      <section className="my-16">
        <h2 className="text-3xl text-Dark_grayish_blue text-center font-bold xl:text-5xl xl:pb-16">
          Your cart is empty ! <br /> start shopping
        </h2>
        <figure className="flex items-center justify-center my-20 bg-Light_grayish_blue rounded-full w-80 h-80 mx-auto xl:w-96 xl:h-96">
          <img src={emptyCartImg} alt="cart is empty image" className="xl:w-full" />
        </figure>
      </section>
    );

  return (
    <>
      <ActionModal
        state={modal}
        variants={'clear_cart'}
        onConfirm={() => clearCart()}
        onCancel={() => setModal(false)}
      />

      <section className="my-16 mx-8">
        <div className="relative">
          <Button
            title="previous page"
            onClick={() => navigate(-1)}
            className="absolute top-1/2 -translate-y-1/2 left-0"
            variant={'navigation'}>
            <NavigateBackIcon />
          </Button>

          <h2 className="text-4xl text-Very_dark_blue text-center font-bold mb-8">My Cart</h2>

          <Button
            title="clear cart"
            onClick={() => setModal(true)}
            className="group absolute top-1/2 -translate-y-1/2 right-0 bg-Grayish_blue/50 w-16 h-16 flex items-center justify-center rounded-lg ">
            <DeleteIcon className="fill-Very_dark_blue group-hover:fill-Orange group-focus-visible:fill-Orange" />
          </Button>
        </div>
        <div className="xl:mt-28 xl:mx-20 xl:grid xl:grid-cols-[1fr,.75fr] xl:gap-16">
          <div>
            <CheckoutList />
            <PromoCodeInput />
            <CheckoutTotal />
          </div>

          <figure className="hidden xl:block min-h-[60rem] bg-Yellowish_orange">
            <img src={sideImg} alt="cart side image" className="object-cover w-full" />
            <figcaption className="sr-only">checkout side image</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
};
