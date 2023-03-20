import { forwardRef, InputHTMLAttributes } from 'react';

type AuthInputProps = {} & InputHTMLAttributes<HTMLInputElement>;

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <label htmlFor={props.id} className="relative flex items-center cursor-pointer">
        <input
          ref={ref}
          required
          className={`${className} peer flex-1 focus-visible:bg-white placeholder-shown:bg-Light_grayish_blue px-8 py-6 text-2xl rounded-xl ring-1 ring-Grayish_blue/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-Orange placeholder-transparent`}
          {...props}
        />
        {children}
      </label>
    );
  },
);
