import type React from 'react';
import type { CartItem } from '../../../types/CartItem';
import styles from './CartItemDetails.module.scss';

type Props = {
  item: CartItem;
};

export const CartItemDetails: React.FC<Props> = () => {
  return <div className={styles['cart-item']}></div>;
};
