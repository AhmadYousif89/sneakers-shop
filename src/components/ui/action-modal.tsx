import { MouseEventHandler } from 'react';

import { Card } from './card';
import { Button } from './button';
import { Overlay } from './overlay';

type ActionModalProps = {
  state: boolean;
  className?: string;
  variants: 'clear_cart' | 'delete_order';
  onCancel: MouseEventHandler<HTMLElement>;
  onConfirm: MouseEventHandler<HTMLElement>;
};

export const ActionModal = ({
  onCancel,
  onConfirm,
  state,
  className = '',
  variants,
}: ActionModalProps) => {
  let headerText = '';
  let bodyText: string | JSX.Element = '';
  let confirmText: string | JSX.Element = 'confirm';
  confirmText = (
    <span className="text-red-500 group-hover:text-white transition-colors duration-200">
      delete
    </span>
  );

  if (variants === 'clear_cart') {
    headerText = 'Clear my cart';
    bodyText = (
      <>
        You're about to <b className="text-red-500">delete all</b> items in your cart, Are you sure
        ?
      </>
    );
  }

  if (variants === 'delete_order') {
    headerText = 'Delete this order';
    bodyText = (
      <>
        You're about to <b className="text-red-500">delete</b> this currently active order, Are you
        sure ?
      </>
    );
  }

  return (
    <>
      <Overlay onClick={onCancel} className={`${state ? 'block' : 'hidden'}`} />
      <Card
        className={`${className} min-h-[20rem] min-w-[32rem] w-11/12 max-w-3xl fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col p-8 gap-16 transition-all duration-[var(--duration)] ${
          state
            ? '-translate-y-1/2 opacity-100 visible delay-100'
            : '-translate-y-2/3 opacity-0 invisible'
        }`}>
        <header className="pb-4 border-b-2 border-Light_grayish_blue">
          <p className="text-3xl text-Very_dark_blue font-bold ">{headerText}</p>
        </header>

        <section>
          <h2 className="text-2xl text-Dark_grayish_blue text-center">{bodyText}</h2>
        </section>

        <footer className="flex items-center justify-between mx-8 mt-auto mb-4">
          <Button
            title="confirm action"
            variant={'modal_btns'}
            onClick={onConfirm}
            className={`group hover:bg-red-500`}>
            {confirmText}
          </Button>
          <Button
            title="cancel action"
            variant={'modal_btns'}
            className="text-Dark_grayish_blue hover:bg-Dark_grayish_blue"
            onClick={onCancel}>
            <span>cancel</span>
          </Button>
        </footer>
      </Card>
    </>
  );
};
