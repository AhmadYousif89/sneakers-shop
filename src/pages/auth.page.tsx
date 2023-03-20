import logo from '../assets/icons/logo.svg';
import authImg from '../assets/images/auth-wallpaper.jpg';
import { Login } from '../components/auth/login';
import { Register } from '../components/auth/register';
import { useAuthStore } from '../store';

export const Auth = () => {
  const authPage = useAuthStore(state => state.authPage);

  return (
    <main className="m-8 grid gap-8 w-11/12 max-w-[140rem] xl:my-28 xl:mx-auto xl:grid-cols-2 min-h-[100svh]">
      {/* <figure className="xs:justify-self-center mt-8 xl:mt-0 xl:mb-10">
        <img src={logo} alt="logo" className="w-40 xl:w-52" />
        <figcaption className="sr-only">sneakers company logo</figcaption>
      </figure> */}

      {authPage === 'login' && <Login />}
      {authPage === 'register' && <Register />}

      <figure className="hidden xl:flex xl:row-span-2">
        <img src={authImg} alt="side picture" className="rounded-3xl max-h-[75rem]" />
        <figcaption className="sr-only">side wallpaper image</figcaption>
      </figure>
    </main>
  );
};
