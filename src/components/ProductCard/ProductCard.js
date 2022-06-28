import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ id, title, price, imageSrc }) => {
  const { onAddItem } = useCart();

  const handeAddItem = () =>
    onAddItem({
      id,
      name: title,
      price,
      imageSrc,
    });

  return (
    <div className={styles.card}>
      <div>
        <img src={imageSrc} alt={title} className={styles.image} />
      </div>
      <hr />
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.price}>${price}</p>
      </div>
      <div>
        <button className={styles.button} onClick={handeAddItem}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
