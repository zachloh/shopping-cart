import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useOpenSidebar } from '../../hooks/useOpenSidebar';
import { useCart } from '../../context/CartContext';
import Sidebar from '../Sidebar/Sidebar';
import cartSVG from '../../assets/images/shopping-outline.svg';
import styles from './Header.module.css';

const Header = () => {
  const { shouldSidebarOpen, handleOpenSidebar, handleCloseSidebar } =
    useOpenSidebar();
  const {
    cart: { numberOfItems },
  } = useCart();

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
            <li className={styles.cart} onClick={handleOpenSidebar}>
              <img src={cartSVG} alt="cart icon" />
              <span role="status" className={styles.badge}>
                {numberOfItems}
              </span>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
