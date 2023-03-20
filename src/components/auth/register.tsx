import { FormEvent, useState } from 'react';
import { Button } from '../ui/button';
import { AuthInput } from '../ui/auth-input';
import { EmailIcon, LockIcon, SpinnerIcon, UserIcon } from '../icons';
import { SectionWrapper } from './section-wrapper';
import googleIcon from '../../assets/icons/google.png';

const userInputs = { name: '', email: '', password: '' };

export const Register = () => {
  const [formInputs, setFormInputs] = useState(userInputs);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <SectionWrapper>
      <form onSubmit={handleSubmit} className="grid gap-20 w-11/12 max-w-2xl">
        <fieldset className="grid gap-10">
          <AuthInput type={'text'} name={'name'} placeholder="Name">
            <span className="fake-placeholder">Name</span>
            <span className="absolute right-5 fill-Grayish_blue w-8 h-8 peer-focus-visible:fill-Orange">
              <UserIcon />
            </span>
          </AuthInput>

          <AuthInput type={'email'} name={'email'} placeholder="Email">
            <span className="fake-placeholder">Email</span>
            <span className="absolute right-5 fill-Grayish_blue w-8 h-8 peer-focus-visible:fill-Orange">
              <EmailIcon />
            </span>
          </AuthInput>

          <AuthInput type={'password'} name={'password'} placeholder={'Password'}>
            <span className="fake-placeholder">Password</span>
            <span className="absolute right-5 fill-Grayish_blue w-8 h-8 peer-focus-visible:fill-Orange">
              <LockIcon />
            </span>
          </AuthInput>
        </fieldset>

        <fieldset className="flex flex-col gap-8">
          <Button
            hasRipple
            type="submit"
            className="overflow-hidden text-center py-6 shadow rounded-xl font-bold bg-Orange tracking-wide">
            <span>REGISTER</span>
          </Button>

          {/* DIVIDER */}
          <div className="relative group flex items-center justify-center gap-4 my-4">
            <span className="relative bg-Orange/50 h-px w-full">&nbsp;</span>
            {/* <SpinnerIcon className="absolute top-0 left-1/2 z-10 after:p-8 after:border-transparent after:border-l-Orange after:border-r-Orange after:border-2" /> */}
            <span className="absolute text-xl uppercase text-Dark_grayish_blue p-8 rounded-full bg-white">
              or
            </span>
          </div>

          <Button
            hasRipple
            rippleColor={'bg-black/25'}
            type="button"
            className="overflow-hidden flex items-center justify-center gap-8 text-Dark_grayish_blue text-center tracking-wide py-6 shadow ring-1 ring-Grayish_blue rounded-xl font-bold">
            <img src={googleIcon} alt="google icon" className="w-8 h-8" />
            <span>Continue with google</span>
          </Button>
        </fieldset>
      </form>
    </SectionWrapper>
  );
};
