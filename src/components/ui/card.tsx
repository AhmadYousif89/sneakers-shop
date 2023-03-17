import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', onClick }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`${className} z-[100] bg-White drop-shadow-xl shadow-Orange rounded-xl`}>
        {children}
      </div>
    );
  },
);
