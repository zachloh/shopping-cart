import React from 'react';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import Spinner from '../../components/Spinner/Spinner';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Shop.module.css';

const Shop = () => {
  const { isLoading, products } = useFetchProducts();

  return (
    <div className={styles.container}>
      <h2>All Products</h2>
      {isLoading && <Spinner />}
      <div className={styles.products}>
        {!isLoading &&
          products.map((prod) => (
            <ProductCard
              key={prod.id}
              id={prod.id}
              title={prod.title}
              price={prod.price}
              imageSrc={prod.image}
            />
          ))}
      </div>
    </div>
  );
};

export default Shop;
