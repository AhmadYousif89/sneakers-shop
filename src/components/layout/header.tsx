import { PropsWithChildren } from 'react';
import { useAuthStore, useCartStore, useUIStore } from '../../store';
import { useEventListener } from '../../hooks/use-event-listener';

import profileImg from '../../assets/images/avatar.png';
import { MenuIcon, CartIcon, UserIcon } from '../icons';
import logo from '../../assets/icons/logo.svg';
import { SideNavigation } from './side-nav';
import { TopNavigation } from './top-nav';
import { Button } from '../ui/button';

export const Header = ({ children }: PropsWithChildren) => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const menuIsOpen = useUIStore(state => state.menuIsOpen);
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
        {user && (
          <Button title="logout" onClick={() => logout()} className="fill-Dark_grayish_blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 96 960 960"
              className="w-10 h-10 rotate-180">
              <path d="M613 747q-11-13-11-29.5t11-27.5l74-74H400q-17 0-28.5-11.5T360 576q0-17 11.5-28.5T400 536h287l-74-74q-12-12-12-28.5t12-28.5q11-12 27.5-12t27.5 11l144 144q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L668 748q-13 13-28.5 11.5T613 747ZM200 936q-33 0-56.5-23.5T120 856V296q0-33 23.5-56.5T200 216h240q17 0 28.5 11.5T480 256q0 17-11.5 28.5T440 296H200v560h240q17 0 28.5 11.5T480 896q0 17-11.5 28.5T440 936H200Z" />
            </svg>
            <span className="sr-only">logout button</span>
          </Button>
        )}

        <Button ref={cartRef} title="view cart" className="relative w-10 h-10 flex-center">
          {cart.length > 0 && (
            <span className="absolute -top-3 left-3 bg-Orange px-2 min-w-[2.25rem] text-White text-lg rounded-xl flex-center font-bold pointer-events-none">
              {totalQty}
            </span>
          )}
          <CartIcon className="pointer-events-none fill-Dark_grayish_blue" />
        </Button>

        <Button
          ref={profileRef}
          title="view user menu"
          className="hover:ring-2 hover:ring-Orange rounded-full focus-visible:outline-2 focus-visible:outline-Orange">
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
