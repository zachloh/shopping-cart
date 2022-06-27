import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/images/denim-models.jpg';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles['img-container']}>
          <img
            src={heroImg}
            alt="a male and a female model wearing denims"
            className={styles['hero-img']}
          />
        </div>
        <div className={styles['hero-text-container']}>
          <p className={styles['hero-text']}>DISCOVER FASHION</p>
          <p className={styles['hero-text-secondary']}>
            Better when it's on <i>you</i>
          </p>
          <Link to="/shop">
            <button className={styles['hero-button']}>Go to shop</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
