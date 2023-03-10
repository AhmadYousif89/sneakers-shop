import { PropsWithChildren } from 'react';

import { MenuIcon } from '../icons/menu';
import { CartIcon } from '../icons/cart';
import logo from '../../assets/icons/logo.svg';
import { TopNavigation } from '../layout/top-nav';
import profileImg from '../../assets/images/avatar.png';

import { Button } from '../ui/button';
import { SideNavigation } from './side-nav';
import { useUI } from '../../context/ui.context';
import { useCart } from '../../context/cart.context';
import { useEventListener } from '../../hooks/use-event-listener';

export const Header = ({ children }: PropsWithChildren) => {
  const {
    state: { menuIsOpen },
    setProfileState,
    setCartState,
    setMenuState,
  } = useUI();
  const {
    state: { cart },
  } = useCart();

  const { ref: cartRef } = useEventListener<HTMLButtonElement>({
    insideElement: () => {
      setCartState(pv => !pv);
    },
    outsideElement: e => {
      setCartState(false);
    },
  });

  const { ref: profileRef } = useEventListener<HTMLButtonElement>({
    insideElement: () => {
      setProfileState(pv => !pv);
    },
    outsideElement: () => {
      setProfileState(false);
    },
  });

  let totalQty;
  totalQty = cart.reduce((acc, curItem) => acc + curItem.qty, 0);
  if (totalQty > 99) totalQty = `99+`;

  return (
    <header className="relative flex items-center justify-between px-8 py-12 border-b-2 border-Light_grayish_blue">
      <div className="flex items-center gap-8 xl:gap-28">
        <Button
          className="xs:hidden"
          aria-expanded={menuIsOpen}
          onClick={() => setMenuState(true)}>
          <span className="sr-only">side menu button</span>
          <MenuIcon aria-hidden />
        </Button>

        <SideNavigation />

        <Button href="/home">
          <span className="sr-only">link with company logo</span>
          <img src={logo} alt="logo" />
        </Button>

        <TopNavigation />
      </div>

      <div className="flex items-center gap-8 xl:gap-16">
        <Button ref={cartRef} className="relative w-10 h-10 flex-center">
          {cart.length > 0 && (
            <span className="absolute -top-3 left-3 bg-Orange px-2 min-w-[2.25rem] text-White text-lg rounded-xl flex-center font-bold pointer-events-none">
              {totalQty}
            </span>
          )}
          <span className="sr-only">_number of items quantity in cart</span>
          <CartIcon className="pointer-events-none fill-Dark_grayish_blue" />
        </Button>

        <Button
          ref={profileRef}
          className="hover:ring-2 hover:ring-Orange rounded-full focus-visible:outline-2 focus-visible:outline-Orange">
          <span className="sr-only">profile image</span>
          <img
            className="h-12 xl:h-16 pointer-events-none"
            alt="user profile icon"
            src={profileImg}
            aria-hidden
          />
        </Button>
      </div>

      {children}
    </header>
  );
};
