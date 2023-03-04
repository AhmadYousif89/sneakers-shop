import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
  FC,
} from 'react';

type InitUIState = {
  menuIsOpen: boolean;
  cartIsOpen: boolean;
  profileIsOpen: boolean;
  lightboxIsOpen: boolean;
};

const initState: InitUIState = {
  menuIsOpen: false,
  cartIsOpen: false,
  profileIsOpen: false,
  lightboxIsOpen: false,
};

const initContext: UseUIContext = {
  state: initState,
  setMenuState: () => {},
  setCartState: () => {},
  setProfileState: () => {},
  setLightboxState: () => {},
};

const UIContext = createContext<UseUIContext>(initContext);

export const UICtxProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <UIContext.Provider value={useUIContext(initState)}>{children}</UIContext.Provider>
  );
};

type UseUIContext = ReturnType<typeof useUIContext>;

const useUIContext = (initState: InitUIState) => {
  const [menuIsOpen, setMenuIsOpen] = useState(initState.menuIsOpen);
  const [cartIsOpen, setCartIsOpen] = useState(initState.cartIsOpen);
  const [profileIsOpen, setprofileIsOpen] = useState(initState.profileIsOpen);
  const [lightboxIsOpen, setlightboxIsOpen] = useState(initState.lightboxIsOpen);

  const setMenuState = useCallback(
    (toggle: SetStateAction<boolean>) => setMenuIsOpen(toggle),
    [],
  );

  const setCartState = useCallback(
    (toggle: SetStateAction<boolean>) => setCartIsOpen(toggle),
    [],
  );

  const setProfileState = useCallback(
    (toggle: SetStateAction<boolean>) => setprofileIsOpen(toggle),
    [],
  );

  const setLightboxState = useCallback(
    (toggle: SetStateAction<boolean>) => setlightboxIsOpen(toggle),
    [],
  );

  const state = { menuIsOpen, cartIsOpen, profileIsOpen, lightboxIsOpen };
  return { state, setCartState, setMenuState, setProfileState, setLightboxState };
};

export const useUI = () => useContext(UIContext);
