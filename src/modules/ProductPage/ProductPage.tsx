import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductList } from './components/ProductList/';
import { DropdownSelect } from './components/DropdownSelect';
import { Loader } from '../shared/components/Loader';
import { ProductsTotal } from './components/ProductsTotal';
import { ErrorLoading } from './components/ErrorLoading';
import { EmptyList } from './components/EmptyList';
import { getProductsByCategory } from '../../services/services.ts';
import styles from './ProductPage.module.scss';
import type { Product } from '../../types/Product.ts';
import { SearchField } from './components/SearchField';
import { Pagination } from './components/Pagination';
import {
  SORT_OPTIONS,
  SORT_OPTIONS_MAP,
  PER_PAGE_OPTIONS,
  PER_PAGE_OPTIONS_MAP,
  CATEGORY_TITLES,
} from '../../constants';

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const isSuccess = !isLoading && !hasLoadingError;

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || SORT_OPTIONS[0];
  const searchBy = searchParams.get('search') || '';
  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');
  const currentPage = pageParam ? Number(pageParam) : 1;
  const perPage = perPageParam || PER_PAGE_OPTIONS_MAP.lg;

  const location = useLocation();
  const category = location.pathname.slice(1);
  const title = CATEGORY_TITLES[category as keyof typeof CATEGORY_TITLES] || 'Products';

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasLoadingError(false);

    getProductsByCategory(category)
      .then((data) => setProducts(data))
      .catch(() => setHasLoadingError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSortChange = (newSortBy: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', String(newSortBy));
    setSearchParams(params);
  };

  const handlePerPageChange = (newPerPage: string | number) => {
    const params = new URLSearchParams(searchParams);
    if (newPerPage === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', String(newPerPage));
    }
    params.delete('page');
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

  const sortProducts = () => {
    const productsCopy = [...products];
    switch (sortBy) {
      case SORT_OPTIONS_MAP.Newest:
        return productsCopy;
      case SORT_OPTIONS_MAP.Alphabetical:
        return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case SORT_OPTIONS_MAP.Cheapest:
        return productsCopy.sort((a, b) => a.priceDiscount - b.priceDiscount);
      case SORT_OPTIONS_MAP.MostExpensive:
        return productsCopy.sort((a, b) => b.priceDiscount - a.priceDiscount);
      default:
        return productsCopy;
    }
  };

  const sortedProducts = sortProducts();
  const productsTotal = sortedProducts.length;

  const [search, setSearch] = useState(searchBy);

  const visibleProducts = [...sortedProducts].filter((product) =>
    product.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()),
  );

  let paginatedProducts = visibleProducts;
  let totalPages = 1;
  let safeCurrentPage = currentPage;

  if (perPage !== 'all') {
    const perPageNum = Number(perPage);
    totalPages = Math.ceil(visibleProducts.length / perPageNum);
    if (totalPages === 0) totalPages = 1;

    safeCurrentPage = Math.min(currentPage, totalPages);
    if (safeCurrentPage < 1) safeCurrentPage = 1;

    const startIndex = (safeCurrentPage - 1) * perPageNum;
    paginatedProducts = visibleProducts.slice(startIndex, startIndex + perPageNum);
  }

  return (
    <>
      {isLoading && <Loader />}
      {hasLoadingError && <ErrorLoading />}
      {isSuccess && products.length === 0 && <EmptyList category={category} />}

      {isSuccess && products.length > 0 && (
        <>
          <h1 className={styles.title}>{title}</h1>
          <ProductsTotal productsTotal={productsTotal} />
          <div className={styles.filters}>
            <div className={styles['search-container']}>
              <SearchField search={search} setSearch={setSearch} />
            </div>

            <div className={styles['dropdowns-container']}>
              <DropdownSelect
                options={SORT_OPTIONS}
                label="Sort by"
                className="sort-dropdown"
                value={sortBy}
                onChange={handleSortChange}
              />
              <DropdownSelect
                options={PER_PAGE_OPTIONS}
                label="Items on page"
                className="per-page-dropdown"
                value={perPage}
                onChange={handlePerPageChange}
              />
            </div>
          </div>

          <ProductList products={paginatedProducts} />

          {totalPages > 1 && (
            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
};
