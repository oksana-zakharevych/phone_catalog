import { useEffect, useState, useMemo } from 'react';
import { ProductList } from './ProductList/ProductList.tsx';
import { DropdownSelect } from './DropdownSelect/DropdownSelect.tsx';
import { ITEMS_PER_PAGE_OPTIONS, SORT_OPTIONS } from '../../../constants.ts';
import { useSearchParams } from 'react-router-dom';

import styles from './ProductPage.module.scss';
import { Loader } from '../../shared/components/Loader/Loader.tsx';
import { getProductsByCategory } from '../../../services/services.ts';

export const ProductPage = () => {
  const [phones, setPhones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || SORT_OPTIONS[0];
  const perPageParam = searchParams.get('perPage');
  const perPage = perPageParam === 'all' ? 'all' : perPageParam ? Number(perPageParam) : 4;

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setIsLoading(true);

    getProductsByCategory('phones')
      .then((data) => {
        setPhones(data);
      })
      .catch(() => {
        setHasLoadingError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSortChange = (newSort: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', String(newSort));
    setSearchParams(params);
  };

  const handlePerPageChange = (newPerPage: string | number) => {
    const params = new URLSearchParams(searchParams);
    if (newPerPage === 'all') {
      params.set('perPage', 'all');
    } else {
      params.set('perPage', String(newPerPage));
    }
    params.set('page', '1');
    if (newPerPage === 8) {
      params.delete('perPage');
    }

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }
    setSearchParams(params);
  };

  const sortedPhones = useMemo(() => {
    const phonesCopy = [...phones];

    switch (sortBy) {
      case 'Newest':
        return phonesCopy.sort((a, b) => b.year - a.year);
      case 'Alphabetically':
        return phonesCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'Cheapest':
        return phonesCopy.sort((a, b) => a.priceDiscount - b.priceDiscount);
      default:
        return phonesCopy;
    }
  }, [phones, sortBy]);

  const totalPhones = sortedPhones.length;
  const computedPerPage = perPage === 'all' ? totalPhones : Number(perPage);
  const totalPages = perPage === 'all' ? 1 : Math.ceil(totalPhones / computedPerPage);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      handlePageChange(totalPages);
    }
  }, [totalPages, page]);

  const visiblePhones = useMemo(() => {
    if (perPage === 'all') {
      return sortedPhones;
    }
    const start = (page - 1) * computedPerPage;
    const end = start + computedPerPage;
    return sortedPhones.slice(start, end);
  }, [sortedPhones, page, computedPerPage, perPage]);

  const showPagination = perPage !== 'all' && totalPages > 1;

  return (
    <>
      <h1>Mobile Phones</h1>

      <div className={styles.dropdowns}>
        <DropdownSelect
          options={SORT_OPTIONS}
          label="Sort by"
          className="sortDropdown"
          value={sortBy}
          onChange={handleSortChange}
        />
        <DropdownSelect
          options={ITEMS_PER_PAGE_OPTIONS}
          label="Items on page"
          className="itemsDropdown"
          value={perPage}
          onChange={handlePerPageChange}
        />
      </div>

      {isLoading && <Loader />}

      {hasLoadingError && <p>Error loading phones. Please try again later.</p>}

      {!isLoading && !hasLoadingError && phones.length === 0 && <p>There are no phones yet.</p>}

      {!isLoading && !hasLoadingError && <ProductList products={visiblePhones} />}

      {showPagination && (
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pageButton}
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                type="button"
                className={`${styles.pageButton} ${page === pageNumber ? styles.active : ''}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            type="button"
            className={styles.pageButton}
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </>
  );
};
