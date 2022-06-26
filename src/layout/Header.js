import React from 'react';
import cart from '../assets/images/shopping-outline.svg';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>FAKESTORE</div>
      <nav>
        <ul className={styles.links}>
          <li>HOME</li>
          <li>SHOP</li>
          <li>
            <img src={cart} alt="cart icon" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
