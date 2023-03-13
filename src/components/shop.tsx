import { Outlet } from 'react-router-dom';
import { Footer } from './layout/footer';
import { Header } from './layout/header';
import { CartModal } from './cart/cart-modal';
import { ProfileModal } from './profile/profile-modal';

export const Shop = () => {
  return (
    <main className="flex flex-col min-h-[100svh] mx-auto max-w-[43rem] xl:max-w-[144rem] xs:max-xl:hidden">
      <h1 className="sr-only">Sneakers Shop</h1>
      <Header>
        <CartModal />
        <ProfileModal />
      </Header>
      <Outlet />
      <Footer />
    </main>
  );
};
