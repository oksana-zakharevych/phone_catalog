import type React from 'react';
import { BannerSlider } from './components/BannerSlider';
import { CardSlider } from '../shared/components/CardSlider';
import { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';
import { getAllProducts } from '../../services/services';
import { Categories } from './components/Categories';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((result) => setProducts(result))
      .catch(() => {})
      .finally(() => {});
  }, []);

  const sortedByYearProducts = [...products].sort((product1, product2) => {
    const year1 = product1.year ?? 0;
    const year2 = product2.year ?? 0;
    return year2 - year1;
  });

  const sortedByHotPrice = [...products].sort((product1, product2) => {
    const delta1 = product1.priceRegular - product1.priceDiscount;
    const delta2 = product2.priceRegular - product2.priceDiscount;
    return delta2 - delta1;
  });

  return (
    <>
      <BannerSlider />
      <CardSlider title="Brand new models" products={sortedByYearProducts.slice(0, 10)} />
      <Categories products={products} />
      <CardSlider title="Hot prices" products={sortedByHotPrice.slice(0, 10)} />
    </>
  );
};
