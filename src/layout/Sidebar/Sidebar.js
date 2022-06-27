import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './Sidebar.module.css';

const Sidebar = ({ shouldOpen, onCloseSidebar }) => {
  return ReactDOM.createPortal(
    <>
      <CSSTransition
        in={shouldOpen}
        timeout={700}
        classNames={{
          enter: styles.overlayEnter,
          enterActive: styles.overlayEnterActive,
          exit: styles.overlayExit,
          exitActive: styles.overlayExitActive,
        }}
        unmountOnExit
      >
        <div className={styles.overlay} onClick={onCloseSidebar} />
      </CSSTransition>
      <CSSTransition
        in={shouldOpen}
        timeout={700}
        classNames={{
          enter: styles.sidebarEnter,
          enterActive: styles.sidebarEnterActive,
          exit: styles.sidebarExit,
          exitActive: styles.sidebarExitActive,
        }}
        unmountOnExit
      >
        <div className={styles.sidebar}>
          <div className={styles.header}>
            <p className={styles.title}>CART</p>
            <button className={styles.close} onClick={onCloseSidebar}>
              &#x2715;
            </button>
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
          <button className={styles.checkout} onClick={onCloseSidebar}>
            CHECKOUT
          </button>
        </div>
      </CSSTransition>
    </>,
    document.getElementById('sidebar-root')
  );
};

export default Sidebar;
