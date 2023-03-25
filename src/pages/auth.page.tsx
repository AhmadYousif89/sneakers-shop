import { useAuthStore } from '../store';
import { Login } from '../components/auth/login';
import { Register } from '../components/auth/register';

import authImg from '../assets/images/auth-wallpaper.jpg';

export const Auth = () => {
  const authPage = useAuthStore(state => state.authPage);

  return (
    <main className="my-16 mx-auto w-11/12 max-w-[144rem] h-[100svh] grid gap-8 xl:my-28 xl:grid-cols-2">
      {authPage === 'login' && <Login />}
      {authPage === 'register' && <Register />}

      <figure className="hidden xl:flex">
        <img src={authImg} alt="side picture" className="rounded-3xl max-h-[75rem]" />
        <figcaption className="sr-only">side wallpaper image</figcaption>
      </figure>
    </main>
  );
};
