import type { Phone } from '../../../../types/Phone';
import { ProductCard } from '../../../shared/components/ProductCard';

import styles from './ProductList.module.scss';

type Props = {
  products: Phone[] | Tablet[] | Accessories[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
