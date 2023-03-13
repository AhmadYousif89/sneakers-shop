import { NavLink } from 'react-router-dom';

import { Button } from '../ui/button';
import { useUI } from '../../context/ui.context';

import { header_links } from '../../data/links';
import { CloseIcon } from '../icons/close';
import { Overlay } from '../ui/overlay';

export const SideNavigation = () => {
  const {
    state: { menuIsOpen },
    setMenuState,
  } = useUI();

  return (
    <>
      <Overlay
        onClick={() => setMenuState(false)}
        className={`${
          menuIsOpen ? 'translate-x-0' : '-translate-x-full'
        } isolate transition-transform duration-500 backdrop-blur-[2px] xs:hidden`}
      />
      <nav
        className={`${
          menuIsOpen ? 'translate-x-0 delay-150' : '-translate-x-full delay-0'
        } fixed z-30 top-0 left-0 w-full transition-transform duration-500 xs:hidden`}>
        <Button
          aria-expanded={menuIsOpen}
          onClick={() => setMenuState(false)}
          className="ml-8 mt-16 cursor-pointer w-fit">
          <span className="sr-only">close side menu</span>
          <CloseIcon />
        </Button>

        <ul className="absolute -z-10 min-h-screen inset-0 w-2/3 bg-Light_grayish_blue flex flex-col pt-36 pl-8 gap-4">
          {header_links.map(link => (
            <li key={link.id} className="li-item w-fit">
              <NavLink to={''} className="header-link side">
                {link.href}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
