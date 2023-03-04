import { NavLink } from 'react-router-dom';

import { Button } from '../ui/button';

import logo from '../../assets/icons/logo.svg';
import { footer_links } from '../../data/links';

export const Footer = () => {
  return (
    <footer className="grid grid-cols-3 gap-y-8 justify-items-center px-8 py-16 mt-auto min-h-[5rem] border-t-2 border-Light_grayish_blue">
      <figure className="row-start-1 col-span-full mb-16">
        <Button href="/">
          <span className="sr-only">link with company logo</span>
          <img src={logo} alt="logo" aria-hidden />
        </Button>
      </figure>

      <ul className="grid gap-4 justify-items-center">
        <li className="text-2xl capitalize text-Very_dark_blue font-bold mb-8">
          product
        </li>
        {footer_links.products.map(link => (
          <li key={link.id} className="li-item">
            <NavLink to={'/home'} className="footer-link">
              {link.href}
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className="grid gap-4 justify-items-center">
        <li className="text-2xl capitalize text-Very_dark_blue font-bold mb-8">
          category
        </li>
        {footer_links.category.map(link => (
          <li key={link.id} className="li-item">
            <NavLink to={'/home'} className="footer-link">
              {link.href}
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className="grid gap-4 justify-items-center">
        <li className="text-2xl capitalize text-Very_dark_blue font-bold mb-8">
          company
        </li>
        {footer_links.company.map(link => (
          <li key={link.id} className="li-item">
            <NavLink to={'/home'} className="footer-link">
              {link.href}
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className="flex gap-4 items-center col-span-full">
        <li className="row-start-1 col-span-full text-2xl capitalize text-Very_dark_blue font-bold">
          social
        </li>
        {footer_links.social.map(link => (
          <li key={link.id} title={link.name} className="li-item">
            <NavLink to={'/home'} className="footer-link">
              {link.icon}
            </NavLink>
          </li>
        ))}
      </ul>

      <p className="col-span-full mt-8 text-xl font-medium text-Grayish_blue">
        © 2023 Sneakers, Inc. All rights reserved
      </p>
    </footer>
  );
};
