
import React from 'react';
import styles from './blog.module.css';

const FeaturedPost = ({ title, summary, imageUrl, onFeaturedPostClick }) => {
    return (
      <div className={styles.featuredPostContainer} onClick={onFeaturedPostClick}>
        <h2 className={styles.featuredPostTitle}>Featured Blog</h2>
        <h3>{title}</h3>
        <img src={imageUrl} alt="Featured" className={styles.featuredImage} />
      </div>
    );
};

export default FeaturedPost;
