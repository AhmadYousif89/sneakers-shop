import { PropsWithChildren } from 'react';

type OverlaryProps = { onClick?: () => void; className?: string } & PropsWithChildren;

export const Overlay = ({ children, onClick, className = '' }: OverlaryProps) => {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 min-h-screen z-20 bg-black/75 flex flex-col items-center justify-center ${className}`}>
      {children}
    </div>
  );
};
