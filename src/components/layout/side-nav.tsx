import { NavLink } from 'react-router-dom';

import { Button } from '../ui/button';
import { useUI } from '../../context/ui.context';

import { header_links } from '../../data/links';
import { CloseIcon } from '../icons/close';

export const SideNavigation = () => {
  const {
    state: { menuIsOpen },
    setMenuState,
  } = useUI();

  return (
    <nav
      onClick={e => {
        if (e.target !== e.currentTarget) return;
        else setMenuState(false);
      }}
      className={`${
        menuIsOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed z-50 isolate min-h-screen inset-0 bg-Black/70 backdrop-blur-[2px] transition-transform duration-500 xs:hidden`}>
      <Button
        aria-expanded={menuIsOpen}
        onClick={() => setMenuState(false)}
        className="ml-8 mt-16 cursor-pointer w-fit">
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
  );
};
