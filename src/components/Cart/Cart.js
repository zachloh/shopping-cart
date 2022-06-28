import React from 'react';
import { useCart } from '../../context/CartContext';
import { convertToDollars } from '../../utils/priceConversion';
import CartItem from './CartItem/CartItem';
import styles from './Cart.module.css';

const Cart = ({ onCloseSidebar }) => {
  const {
    cart: { cart, totalAmount },
  } = useCart();

  return (
    <>
      <div className={styles.header}>
        <p className={styles.title}>CART</p>
        <button className={styles.close} onClick={onCloseSidebar}>
          &#x2715;
        </button>
      </div>
      <div className={styles.container}>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            imageSrc={item.imageSrc}
          />
        ))}
      </div>
      <div className={styles.total}>
        <p>TOTAL:</p>
        <p>${convertToDollars(totalAmount)}</p>
      </div>
      <button className={styles.checkout} onClick={onCloseSidebar}>
        CHECKOUT
      </button>
    </>
  );
};

export default Cart;
