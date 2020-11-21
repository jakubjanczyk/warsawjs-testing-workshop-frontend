import { NavLink } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

export function Header() {
    const productsCount = useSelector(state => state.basket.length);
    return (
      <header className="header">
          <nav className={'links'}>
              <NavLink to={'/'} className={'link'}>Lista</NavLink>
              <NavLink to={'/basket'} className={'link'}>{productsCount === 0 ? 'Koszyk' : `Koszyk (${productsCount})`}</NavLink>
          </nav>
      </header>
    );
}
