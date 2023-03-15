import { create } from 'zustand';

type UIState = {
  menuIsOpen: boolean;
  cartIsOpen: boolean;
  profileIsOpen: boolean;
  lightboxIsOpen: boolean;
};

type UIActions = {
  setCartStatus: (toggle: boolean | ((s: boolean) => boolean)) => void;
  setMenuStatus: (toggle: boolean | ((s: boolean) => boolean)) => void;
  setProfileStatus: (toggle: boolean | ((s: boolean) => boolean)) => void;
  setLightboxStatus: (toggle: boolean | ((s: boolean) => boolean)) => void;
};

type InitUIStore = UIState & UIActions;

export const useUIStore = create<InitUIStore>((set, get) => ({
  menuIsOpen: false,
  cartIsOpen: false,
  profileIsOpen: false,
  lightboxIsOpen: false,
  setCartStatus: toggle =>
    set({ cartIsOpen: typeof toggle === 'boolean' ? toggle : toggle(get().cartIsOpen) }),
  setMenuStatus: toggle =>
    set({ menuIsOpen: typeof toggle === 'boolean' ? toggle : toggle(get().menuIsOpen) }),
  setProfileStatus: toggle =>
    set({ profileIsOpen: typeof toggle === 'boolean' ? toggle : toggle(get().profileIsOpen) }),
  setLightboxStatus: toggle =>
    set({ lightboxIsOpen: typeof toggle === 'boolean' ? toggle : toggle(get().lightboxIsOpen) }),
}));
