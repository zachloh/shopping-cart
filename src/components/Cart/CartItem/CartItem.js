import React from 'react';
import { useCart } from '../../../context/CartContext';
import {
  convertToCents,
  convertToDollars,
} from '../../../utils/priceConversion';
import styles from './CartItem.module.css';

const CartItem = ({ id, name, price, quantity, imageSrc }) => {
  const { onAddItem, onRemoveItem } = useCart();

  const handleAddItem = () =>
    onAddItem({
      id,
      name,
      price,
      imageSrc,
    });

  const handleRemoveItem = () => onRemoveItem(id, price);

  const getTotalPrice = () =>
    convertToDollars(convertToCents(price) * quantity);

  return (
    <>
      <div className={styles.item}>
        <img src={imageSrc} alt={name} className={styles.image} />
        <div className={styles.description}>
          <p className={styles.name}>{name}</p>
          <div className={styles.bottom}>
            <p>${getTotalPrice()}</p>
            <div className={styles.quantity}>
              <button onClick={handleRemoveItem}>&#8722;</button>
              <div className={styles.number}>{quantity}</div>
              <button onClick={handleAddItem}>&#43;</button>
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.hr} />
    </>
  );
};

export default CartItem;
