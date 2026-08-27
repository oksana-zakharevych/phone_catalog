import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './NavigationMobile.module.scss';
import { useEffect } from 'react';

const getLinkClassName = (baseClass: string) => {
  return ({ isActive }: { isActive: boolean }) => {
    return classNames(styles[baseClass], { [styles.active]: isActive });
  };
};

type Props = {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
};

export const NavigationMobile: React.FC<Props> = ({ isNavOpen, setIsNavOpen }) => {
  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }

    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [isNavOpen]);

  const handleLinkClick = () => {
    if (isNavOpen) {
      setIsNavOpen(false);
    }
  };

  return (
    <nav
      className={classNames(styles['nav'], {
        [styles.open]: isNavOpen,
      })}
    >
      <ul className={styles['nav-links']}>
        <li>
          <NavLink to={'/home'} className={getLinkClassName('nav-link')} onClick={handleLinkClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/phones'}
            className={getLinkClassName('nav-link')}
            onClick={handleLinkClick}
          >
            Phone
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/tablets'}
            className={getLinkClassName('nav-link')}
            onClick={handleLinkClick}
          >
            Tablets
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/accessories'}
            className={getLinkClassName('nav-link')}
            onClick={handleLinkClick}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
      <ul className={styles['nav-icons']}>
        <li className={styles['nav-icon-wrapper']}>
          <NavLink
            to={'/favorites'}
            className={getLinkClassName('nav-icon')}
            onClick={handleLinkClick}
          >
            <img src="/images/Favorites.svg" alt="Favorites" />
          </NavLink>
        </li>
        <li className={styles['nav-icon-wrapper']}>
          <NavLink to={'/cart'} className={getLinkClassName('nav-icon')} onClick={handleLinkClick}>
            <img src="/images/Cart.svg" alt="Cart" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
