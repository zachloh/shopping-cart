import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import cart from '../../assets/images/shopping-outline.svg';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <Link to="/">FAKESTORE</Link>
      </div>
      <nav>
        <ul className={styles.links}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              SHOP
            </NavLink>
          </li>
          <li>
            <img src={cart} alt="cart icon" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
