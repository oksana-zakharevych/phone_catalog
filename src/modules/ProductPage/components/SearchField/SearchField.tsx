import React from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './SearchField.module.scss';
import { asset } from '../../../../helper';

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchField: React.FC<Props> = ({ search, setSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearch(value);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    setSearchParams(params);
  };

  const handleCancelSearch = () => {
    setSearch('');

    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params);
  };

  return (
    <div className={styles['search-field-wrapper']}>
      <img src={asset('img/magnifying-glass.svg')} className={styles.icon} alt="Search" />
      <input
        type="text"
        value={search}
        className={styles['search-field']}
        onChange={handleSearch}
      />
      <img
        src={asset('img/close-secondary.svg')}
        className={styles.icon}
        alt="Cancel"
        onClick={handleCancelSearch}
      />
    </div>
  );
};
