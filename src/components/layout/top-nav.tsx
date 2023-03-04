import { NavLink } from 'react-router-dom';
import { header_links } from '../../data/links';

export const TopNavigation = () => {
  return (
    <nav>
      <ul className="hidden xl:flex items-center gap-10 ">
        {header_links.map(link => (
          <li key={link.id} className="li-item">
            <NavLink to={''} className="header-link">
              {link.href}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
