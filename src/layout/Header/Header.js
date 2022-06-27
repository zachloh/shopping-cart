import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useOpenSidebar } from '../../hooks/useOpenSidebar';
import Sidebar from '../Sidebar/Sidebar';
import cart from '../../assets/images/shopping-outline.svg';
import styles from './Header.module.css';

const Header = () => {
  const { shouldSidebarOpen, handleOpenSidebar, handleCloseSidebar } =
    useOpenSidebar();

  return (
    <>
      <Sidebar
        shouldOpen={shouldSidebarOpen}
        onCloseSidebar={handleCloseSidebar}
      />
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
              <img src={cart} alt="cart icon" onClick={handleOpenSidebar} />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
