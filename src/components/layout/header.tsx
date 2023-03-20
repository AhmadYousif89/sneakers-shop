import { PropsWithChildren } from 'react';
import { useAuthStore, useCartStore, useUIStore } from '../../store';
import { useEventListener } from '../../hooks/use-event-listener';

import { MenuIcon, CartIcon, UserIcon } from '../icons';
import logo from '../../assets/icons/logo.svg';
import profileImg from '../../assets/images/avatar.png';
import { SideNavigation } from './side-nav';
import { TopNavigation } from './top-nav';
import { Button } from '../ui/button';

export const Header = ({ children }: PropsWithChildren) => {
  const menuIsOpen = useUIStore(state => state.menuIsOpen);
  const user = useAuthStore(state => state.user);
  const [setProfileStatus, setCartStatus, setMenuStatus] = useUIStore(state => [
    state.setProfileStatus,
    state.setCartStatus,
    state.setMenuStatus,
  ]);
  const cart = useCartStore(state => state.cart);
  const getTotalQty = useCartStore(state => state.getTotalQty);

  const { ref: cartRef } = useEventListener<HTMLButtonElement>({
    insideElement: () => setCartStatus(pv => !pv),
    outsideElement: () => setCartStatus(false),
  });

  const { ref: profileRef } = useEventListener<HTMLButtonElement>({
    insideElement: () => setProfileStatus(pv => !pv),
    outsideElement: () => setProfileStatus(false),
  });

  let totalQty: string | number = getTotalQty();
  if (totalQty > 99) totalQty = `99+`;

  return (
    <header className="relative flex items-center justify-between px-8 py-12 border-b-2 border-Light_grayish_blue">
      <div className="flex items-center gap-8 xl:gap-28">
        <Button
          className="xs:hidden"
          aria-expanded={menuIsOpen}
          onClick={() => setMenuStatus(true)}>
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
          <span className="sr-only">profile button</span>
          {user ? (
            <img
              className="h-12 xl:h-16 pointer-events-none"
              alt="user profile icon"
              src={profileImg}
              aria-hidden
            />
          ) : (
            <UserIcon className="w-12  h-12 fill-Dark_grayish_blue" />
          )}
        </Button>
      </div>

      {children}
    </header>
  );
};
