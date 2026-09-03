import type React from 'react';
import type { Product } from '../../../../types/Product';
import styles from './ProductCard.module.scss';
import { PRODUCT_SPECIFICATIONS } from '../../constants';
import { asset } from '../../../../helper';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { name, images, priceRegular, priceDiscount } = product;

  return (
    <div className={styles.card}>
      <div className={styles['image-wrapper']}>
        <img src={images[0]} alt={name} className={styles.image} />
      </div>

      <h3 className={styles.title}>{name}</h3>

      <div className={styles.prices}>
        {priceDiscount ? (
          <>
            <span className={styles['price-discount']}>${priceDiscount}</span>
            <span className={styles['price-regular']}>${priceRegular}</span>
          </>
        ) : (
          <span className={styles['price-regular']}>${priceRegular}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specifications}>
        {PRODUCT_SPECIFICATIONS.map((spec) => (
          <div className={styles['specification-row']} key={spec}>
            <span className={styles['specification-label']}>{spec}</span>
            <span className={styles['specification-value']}>{product[spec]}</span>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles['add-button']}>
          Add to cart
        </button>
        <button type="button" className={styles['favorite-button']}>
          <img src={asset('/img/Favorites.svg')} />
        </button>
      </div>
    </div>
  );
};
