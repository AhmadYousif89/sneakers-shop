import { FormEvent, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';

import { Button } from '../ui/button';
import { AuthInput } from '../ui/auth-input';
import { SectionWrapper } from './section-wrapper';
import { EmailIcon, LockIcon, SpinnerIcon, UserIcon } from '../icons';
import { useFormInputs, InputName } from '../../hooks/use-form-inputs';

import googleIcon from '../../assets/icons/google.png';

export const Register = () => {
  const timeoutId = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setUserCredentials = useAuthStore(state => state.setUserCredentials);
  const { inputForm, handleInputChange, validateForm } = useFormInputs([
    'name',
    'email',
    'password',
  ]);

  const inputField = inputForm.reduce(
    (
      inputObj: Record<
        InputName,
        { id: string; value: string; isValid: boolean; errorMsg: string }
      >,
      curInput,
    ) => {
      const id = curInput.id;
      const value = curInput.value;
      const isValid = curInput.isValid;
      const errorMsg = curInput.errorMsg;
      inputObj[id] = { id, value, isValid, errorMsg };
      return inputObj;
    },
    {
      name: { id: '', value: '', isValid: false, errorMsg: '' },
      email: { id: '', value: '', isValid: false, errorMsg: '' },
      password: { id: '', value: '', isValid: false, errorMsg: '' },
    },
  );

  const {
    id: nameId,
    value: enteredName,
    isValid: nameIsValid,
    errorMsg: nameErrMsg,
  } = inputField.name;

  const {
    id: emailId,
    value: enteredEmail,
    isValid: emailIsValid,
    errorMsg: emailErrMsg,
  } = inputField.email;

  const {
    id: passwordId,
    value: enteredPassword,
    isValid: passwordIsValid,
    errorMsg: passwordErrMsg,
  } = inputField.password;

  const nameHasError = !nameIsValid && nameErrMsg;
  const emailHasError = !emailIsValid && emailErrMsg;
  const passwordHasError = !passwordIsValid && passwordErrMsg;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const userInputs = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    };
    setUserCredentials(userInputs);

    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setIsSubmitting(false);
      const from = location.state?.from;
      navigate(from || '/home', { replace: true });
    }, 2000);
  };

  return (
    <SectionWrapper>
      <div className="text-center text-Dark_grayish_blue space-y-4">
        <h3 className="text-4xl font-bold capitalize">create new account</h3>
        <p className="text-xl">First time to our shop no worries, make your first account here</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-20 w-11/12 max-w-2xl">
        <div className="grid gap-12">
          <fieldset className="relative">
            {!nameIsValid && (
              <p className="absolute -top-10 right-0 z-10 text-xl text-rose-600 tracking-wide">
                {nameErrMsg}
              </p>
            )}

            <AuthInput
              type="text"
              id={nameId}
              name={nameId}
              placeholder="Name"
              value={enteredName}
              onChange={handleInputChange}
              className={`${nameHasError ? 'ring-rose-500' : nameIsValid ? 'ring-green-500' : ''}`}>
              <span className="fake-placeholder">Name</span>
              <span
                className={`absolute right-5 w-8 h-8 peer-focus-visible:fill-Orange ${
                  nameHasError
                    ? 'fill-rose-500'
                    : nameIsValid
                    ? 'fill-green-500'
                    : 'fill-Grayish_blue'
                }`}>
                <UserIcon />
              </span>
            </AuthInput>
          </fieldset>

          <fieldset className="relative">
            {!emailIsValid && (
              <p className="absolute -top-10 right-0 z-10 text-xl text-rose-600 tracking-wide">
                {emailErrMsg}
              </p>
            )}

            <AuthInput
              type="text"
              id={emailId}
              name={emailId}
              placeholder="Email"
              value={enteredEmail}
              onChange={handleInputChange}
              className={`${
                emailHasError ? 'ring-rose-500' : emailIsValid ? 'ring-green-500' : ''
              }`}>
              <span className="fake-placeholder">Email</span>
              <span
                className={`absolute right-5 w-8 h-8 peer-focus-visible:fill-Orange ${
                  emailHasError
                    ? 'fill-rose-500'
                    : emailIsValid
                    ? 'fill-green-500'
                    : 'fill-Grayish_blue'
                }`}>
                <EmailIcon />
              </span>
            </AuthInput>
          </fieldset>

          <fieldset className="relative">
            {!passwordIsValid && (
              <p className="absolute -top-10 right-0 z-10 text-xl text-rose-600 tracking-wide">
                {passwordErrMsg}
              </p>
            )}

            <AuthInput
              type="password"
              id={passwordId}
              name={passwordId}
              value={enteredPassword}
              placeholder={'Password'}
              onChange={handleInputChange}
              className={`${
                passwordHasError ? 'ring-rose-500' : passwordIsValid ? 'ring-green-500' : ''
              }`}>
              <span className="fake-placeholder">Password</span>
              <span
                className={`absolute right-5 w-8 h-8 peer-focus-visible:fill-Orange ${
                  passwordHasError
                    ? 'fill-rose-500'
                    : passwordIsValid
                    ? 'fill-green-500'
                    : 'fill-Grayish_blue'
                }`}>
                <LockIcon />
              </span>
            </AuthInput>
          </fieldset>
        </div>

        <fieldset className="flex flex-col gap-8">
          <Button
            hasRipple
            type="submit"
            onClick={() => validateForm()}
            className="overflow-hidden text-center py-6 shadow rounded-xl font-bold bg-Orange tracking-wide">
            <span>REGISTER</span>
          </Button>

          {/* DIVIDER */}
          <div className="relative group flex items-center justify-center gap-4 my-4">
            <span className="relative bg-Orange/50 h-px w-full">&nbsp;</span>
            {isSubmitting && (
              <SpinnerIcon className="absolute top-0 left-1/2 z-10 after:p-8 after:border-transparent after:border-l-Orange after:border-r-Orange after:!border-2" />
            )}
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
