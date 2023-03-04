import { PropsWithChildren } from 'react';
import { useUI } from '../../context/ui.context';

export const Overlay = ({ children }: PropsWithChildren) => {
  const { setLightboxState } = useUI();

  return (
    <div
      onClick={() => setLightboxState(false)}
      className="fixed inset-0 min-h-screen z-50 bg-black/75 flex flex-col items-center justify-center">
      {children}
    </div>
  );
};
