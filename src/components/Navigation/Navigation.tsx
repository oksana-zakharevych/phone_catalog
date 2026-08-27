import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Navigation.module.scss';

const getLinkClassName = (baseClass: string) => {
  return ({ isActive }: { isActive: boolean }) => {
    return classNames(styles[baseClass], { [styles.active]: isActive });
  };
};

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles['nav-links']}>
        <li className={styles['nav-link-wrapper']}>
          <NavLink to={'/home'} className={getLinkClassName('nav-link')}>
            Home
          </NavLink>
        </li>
        <li className={styles['nav-link-wrapper']}>
          <NavLink to={'/phones'} className={getLinkClassName('nav-link')}>
            Phone
          </NavLink>
        </li>
        <li className={styles['nav-link-wrapper']}>
          <NavLink to={'/tablets'} className={getLinkClassName('nav-link')}>
            Tablets
          </NavLink>
        </li>
        <li className={styles['nav-link-wrapper']}>
          <NavLink to={'/accessories'} className={getLinkClassName('nav-link')}>
            Accessories
          </NavLink>
        </li>
      </ul>
      <ul className={styles['nav-icons']}>
        <li className={styles['nav-icon-wrapper']}>
          <NavLink to={'/favorites'} className={getLinkClassName('nav-icon')}>
            <img src="/images/Favorites.svg" alt="Favorites" />
          </NavLink>
        </li>
        <li className={styles['nav-icon-wrapper']}>
          <NavLink to={'/cart'} className={getLinkClassName('nav-icon')}>
            <img src="/images/Cart.svg" alt="Cart" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
