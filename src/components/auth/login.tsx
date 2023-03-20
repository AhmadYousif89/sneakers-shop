import { Button } from '../ui/button';
import { AuthInput } from '../ui/auth-input';
import { EmailIcon, LockIcon, SpinnerIcon } from '../icons';
import { SectionWrapper } from './section-wrapper';
import googleIcon from '../../assets/icons/google.png';

export const Login = () => {
  return (
    <SectionWrapper>
      <form onSubmit={e => e.preventDefault()} className="grid gap-20 w-11/12 max-w-2xl">
        <fieldset className="grid gap-10">
          <AuthInput type={'email'} name="email" placeholder="Email">
            <span className="fake-placeholder">Email</span>
            <span className="absolute right-5 fill-Grayish_blue w-8 h-8 peer-focus-visible:fill-Orange">
              <EmailIcon />
            </span>
          </AuthInput>

          <AuthInput type={'password'} name="password" placeholder="Password">
            <span className="fake-placeholder">Password</span>
            <span className="absolute right-5 fill-Grayish_blue w-8 h-8 peer-focus-visible:fill-Orange">
              <LockIcon />
            </span>
          </AuthInput>

          <div className="flex items-center justify-between mx-4">
            <AuthInput type={'checkbox'}>
              <p className="ml-4 text-xl text-Grayish_blue font-bold hover:text-Orange/75">
                keep me logged in
              </p>
            </AuthInput>

            <Button
              type="button"
              className="text-Grayish_blue text-xl p-2 font-bold hover:text-Orange/75 focus-visible:outline-Orange">
              Recover password
            </Button>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-8">
          <Button
            hasRipple
            type="submit"
            className="overflow-hidden text-center py-6 shadow rounded-xl font-bold bg-Orange tracking-wide">
            <span>SIGN IN</span>
          </Button>

          {/* DIVIDER */}
          <div className="relative group flex items-center justify-center gap-4 my-4">
            <span className="relative bg-Orange/25 h-px w-full">&nbsp;</span>
            {/* <SpinnerIcon className="absolute top-0 left-1/2 z-10 after:p-8 after:border-transparent after:border-l-Orange after:border-r-Orange after:border-2" /> */}
            <span className="absolute text-xl uppercase text-Dark_grayish_blue p-8 rounded-full bg-white">
              or
            </span>
          </div>

          <Button
            hasRipple
            type="button"
            rippleColor={'bg-black/25'}
            className="overflow-hidden flex items-center justify-center gap-8 text-Dark_grayish_blue text-center tracking-wide py-6 shadow ring-1 ring-Grayish_blue rounded-xl font-bold">
            <img src={googleIcon} alt="google icon" className="w-8 h-8" />
            <span>Continue with google</span>
          </Button>
        </fieldset>
      </form>
    </SectionWrapper>
  );
};
