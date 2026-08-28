import type React from 'react';
import type { Product } from '../../../../types/Product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { name, images, priceRegular, priceDiscount, screen, capacity, ram } = product;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={images[0]} alt={name} className={styles.image} />
      </div>

      <h3 className={styles.title}>{name}</h3>

      <div className={styles.priceContainer}>
        {priceDiscount ? (
          <>
            <span className={styles.priceDiscount}>${priceDiscount}</span>
            <span className={styles.priceRegular}>${priceRegular}</span>
          </>
        ) : (
          <span className={styles.priceRegular}>${priceRegular}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specifications}>
        <div className={styles.specificationRow}>
          <span className={styles.specificationLabel}>Screen</span>
          <span className={styles.specificationValue}>{screen}</span>
        </div>
        <div className={styles.specificationRow}>
          <span className={styles.specificationLabel}>Capacity</span>
          <span className={styles.specificationValue}>{capacity}</span>
        </div>
        <div className={styles.specificationRow}>
          <span className={styles.specificationLabel}>RAM</span>
          <span className={styles.specificationValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.addButton}>
          Add to cart
        </button>
        <button type="button" className={styles.favoriteButton} aria-label="Add to favorites">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
              stroke="#B4B5B9"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
