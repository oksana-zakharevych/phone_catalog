import styles from './FooterLinks.module.scss';

export const FooterLinks: React.FC = () => {
  return (
    <ul className={styles['footer-links']}>
      <li>
        <a href="" className={styles['footer-link']}>
          Github
        </a>
      </li>
      <li>
        <a href="" className={styles['footer-link']}>
          Contacts
        </a>
      </li>
      <li>
        <a href="" className={styles['footer-link']}>
          Rights
        </a>
      </li>
    </ul>
  );
};
