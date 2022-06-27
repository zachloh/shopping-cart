import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} />
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <p className={styles.title}>CART</p>
          <button className={styles.close}>&#x2715;</button>
        </div>
        {/* Cart Item - start */}
        <div className={styles.item}>
          <img
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            alt="fake item"
            className={styles.image}
          />
          <div className={styles.description}>
            <p className={styles.name}>
              Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
            </p>
            <div className={styles.bottom}>
              <p>$109.95</p>
              <div className={styles.quantity}>
                <button>&#8722;</button>
                <div className={styles.number}>1</div>
                <button>&#43;</button>
              </div>
            </div>
          </div>
        </div>
        <hr className={styles.hr} />
        {/* Cart Item - end */}
        {/* Cart Item - start */}
        <div className={styles.item}>
          <img
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            alt="fake item"
            className={styles.image}
          />
          <div className={styles.description}>
            <p className={styles.name}>
              Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
            </p>
            <div className={styles.bottom}>
              <p>$109.95</p>
              <div className={styles.quantity}>
                <button>&#8722;</button>
                <div className={styles.number}>1</div>
                <button>&#43;</button>
              </div>
            </div>
          </div>
        </div>
        <hr className={styles.hr} />
        {/* Cart Item - end */}
        <div className={styles.total}>
          <p>TOTAL:</p>
          <p>$109.95</p>
        </div>
        <button className={styles.checkout}>CHECKOUT</button>
      </div>
    </>,
    document.getElementById('sidebar-root')
  );
};

export default Sidebar;
