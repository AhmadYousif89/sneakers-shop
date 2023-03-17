import { PropsWithChildren } from 'react';

type SectionWrapperProps = { className?: string } & PropsWithChildren;

export const SectionWrapper = ({ children, className = '' }: SectionWrapperProps) => {
  return (
    <section
      className={`${className} flex flex-col bg-Light_grayish_blue p-8 xl:p-12 gap-8 xl:gap-16 rounded-xl`}>
      {children}
    </section>
  );
};
