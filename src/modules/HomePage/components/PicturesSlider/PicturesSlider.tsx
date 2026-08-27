import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './PicturesSlider.module.scss';

export const PicturesSlider = () => {
  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className={styles.picturesSlider}
      >
        <SwiperSlide>
          <div className={styles.slideContent}>
            <div className={styles.slideLeft}>
              <h2>Still available in our store! 👌</h2>
              <p>Be the first!</p>
              <button className={styles.orderBtn}>ORDER NOW</button>
            </div>
            <div className={styles.slideRight}>
              <h3>iPhone 14 Pro</h3>
              <p>Pro. Beyond.</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.slideContent}>
            <div className={styles.slideLeft}>
              <h2>Now available in our store! 👌</h2>
              <p>Be the first!</p>
              <button className={styles.orderBtn}>ORDER NOW</button>
            </div>
            <div className={styles.slideRight}>
              <h3>iPhone 16 Pro</h3>
              <p>Pro. Beyond.</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
