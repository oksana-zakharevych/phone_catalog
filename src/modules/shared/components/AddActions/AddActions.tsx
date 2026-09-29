import type React from 'react';
import { asset } from '../../../../helper';
import styles from './AddActions.module.scss';

type Props = {
  classname?: string;
};

export const AddActions: React.FC<Props> = ({ classname }) => {
  return (
    <div className={`${styles.actions} ${classname}`}>
      <button type="button" className={styles['add-button']}>
        Add to cart
      </button>
      <button type="button" className={styles['favorite-button']}>
        <img src={asset('/img/Favorites.svg')} />
      </button>
    </div>
  );
};
