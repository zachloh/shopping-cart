import { useEffect, useState } from 'react';
import { timeout } from '../utils/timeout';
import fallbackProducts from '../assets/data/products.json';

export const useFetchProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const response = await timeout(
          fetch(
            "https://fakestoreapi.com/products/category/women's%20clothing"
          ),
          1500
        );
        if (!response.ok) throw new Error('Could not fetch products');
        const products = await response.json();
        if (!products.length) throw new Error('Could not fetch products');
        setProducts(products);
      } catch (err) {
        setError(err);
        setProducts(fallbackProducts);
      }
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  return { isLoading, error, products };
};
