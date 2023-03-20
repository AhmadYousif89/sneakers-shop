import { PropsWithChildren } from 'react';
import { useAuthStore } from '../../store';
import { Button } from '../ui/button';

type SectionWrapperProps = {
  className?: string;
} & PropsWithChildren;

export const SectionWrapper = ({ children, className = '' }: SectionWrapperProps) => {
  const setAuthPage = useAuthStore(state => state.setAuthPage);
  const authPage = useAuthStore(state => state.authPage);

  return (
    <section
      className={`${className} flex flex-col justify-between gap-24 items-center col-span-1 row-start-2`}>
      <div className="text-center space-y-8">
        <h2 className="text-5xl font-bold text-Very_dark_blue capitalize">hey there!</h2>
        <p className="text-2xl tracking-wide text-Dark_grayish_blue">
          welcome to <strong className="uppercase text-Orange">sneakers</strong> the best selling
          sneaker shop in the world
        </p>
      </div>

      <h3 className="text-4xl text-Dark_grayish_blue font-bold capitalize">
        {authPage === 'login' ? 'login to your account' : 'create new account'}
      </h3>

      {children}

      <p className="flex items-center gap-2 text-xl text-Dark_grayish_blue">
        <span>{authPage === 'login' ? "Don't have an account" : 'I already have an account'}</span>
        <span className="text-4xl">|</span>
        {authPage === 'login' ? (
          <Button
            onClick={() => setAuthPage('register')}
            className="text-2xl text-Orange font-bold underline hover:text-Orange/75">
            Sign Up
          </Button>
        ) : (
          <Button
            onClick={() => setAuthPage('login')}
            className="text-2xl text-Orange font-bold underline hover:text-Orange/75">
            Sign In
          </Button>
        )}
      </p>
    </section>
  );
};
