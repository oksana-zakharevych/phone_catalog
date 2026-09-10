import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './CardSlider.module.scss';
import type React from 'react';
import type { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  title?: string;
};

export const CardSlider: React.FC<Props> = ({ products, title }) => {
  return (
    <>
      {title && <h3 className={styles.title}>{title}</h3>}

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1.4}
        breakpoints={{
          600: {
            slidesPerView: 2.4,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        navigation
        loop={false}
        className={styles['card-slider']}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className={styles['slide-content']}>
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
