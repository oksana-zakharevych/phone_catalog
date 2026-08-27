import styles from './ToTopButton.module.scss';

export const ToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles['top-button']}>
      <span className={styles.text}>Back to top</span>
      <button onClick={scrollToTop}>
        <img src="/images/TopButton.svg" alt="" />
      </button>
    </div>
  );
};
