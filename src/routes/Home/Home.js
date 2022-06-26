import React from 'react';
import heroImg from '../../assets/images/denim-models.jpg';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <img
          src={heroImg}
          alt="a male and a female model wearing denims"
          class={styles['hero-img']}
        />
        <div className={styles['hero-text-container']}>
          <p className={styles['hero-text']}>DISCOVER FASHION</p>
          <p className={styles['hero-text-secondary']}>
            Better when it's on <i>you</i>
          </p>
          <button className={styles['hero-button']}>Go to shop</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
