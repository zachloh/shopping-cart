import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Cart from '../../components/Cart/Cart';
import styles from './Sidebar.module.css';

const Sidebar = ({ shouldOpen, onCloseSidebar }) => {
  const overlayRef = useRef(null);
  const sidebarRef = useRef(null);

  return ReactDOM.createPortal(
    <>
      <CSSTransition
        nodeRef={overlayRef}
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
        <div
          ref={overlayRef}
          className={styles.overlay}
          onClick={onCloseSidebar}
          data-testid="overlay"
        />
      </CSSTransition>
      <CSSTransition
        nodeRef={sidebarRef}
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
        <div ref={sidebarRef} className={styles.sidebar}>
          <Cart onCloseSidebar={onCloseSidebar} />
        </div>
      </CSSTransition>
    </>,
    document.getElementById('sidebar-root')
  );
};

export default Sidebar;
