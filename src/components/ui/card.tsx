import { FC, PropsWithChildren } from 'react';

type CardProps = {
  className?: string;
  onClick?: (e: any) => void;
};

export const Card: FC<PropsWithChildren<CardProps>> = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} z-[100] bg-White drop-shadow-xl shadow-Orange rounded-xl`}>
      {children}
    </div>
  );
};
