import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getSuggestedProducts } from '../../services/services';
import type { Product } from '../../types/Product';
import styles from './ProductDetailsPage.module.scss';
import type { ProductCategories } from '../../types/ProductCategories';
import { Loader } from '../shared/components/Loader';
import { ErrorLoading } from '../ProductPage/components/ErrorLoading';
import { asset } from '../../helper';
import { COLOR_MAP } from '../../constants/color-map';
import { AddActions } from '../shared/components/AddActions';
import { PRODUCT_SPECIFICATIONS, PRODUCT_SPECIFICATIONS_TECH } from '../../constants';
import { Specifications } from '../shared/components/Specifications';
import { Prices } from '../shared/components/Prices';
import { AboutProduct } from './components/AboutProduct/AboutProduct';
import { CardSlider } from '../shared/components/CardSlider';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const ProductDetailsPage: React.FC = () => {
  const { id, category } = useParams<{ id: string; category: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');

  const currentCategory = category as ProductCategories;

  const loadProduct = useCallback(() => {
    if (!id) return;

    setIsLoading(true);
    setHasError(false);

    getProductById(id, currentCategory)
      .then((data) => {
        setProduct(data ?? null);
        setSelectedImage(data?.images[0] || '');
        setSelectedColor(data?.color || '');
        setSelectedCapacity(data?.capacity || '');
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [id, currentCategory]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    getSuggestedProducts(10).then((data) => setSuggestedProducts(data));
  }, []);

  const handleColorChange = (newColor: string) => {
    if (!product || newColor === selectedColor) return;

    const newProductId = `${product.namespaceId}-${selectedCapacity.toLowerCase()}-${newColor}`;
    console.log(newProductId);
    navigate(`/${category}/${newProductId}`);
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (!product || newCapacity === selectedCapacity) return;

    const newProductId = `${product.namespaceId}-${newCapacity.toLowerCase()}-${product.color}`;
    navigate(`/${category}/${newProductId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <ErrorLoading reloadAction={loadProduct} />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const {
    name,
    images = [],
    priceRegular,
    priceDiscount,
    colorsAvailable = [],
    capacityAvailable = [],
    description = [],
  } = product;

  const currentImage = selectedImage || images[0];

  return (
    <>
      <Breadcrumbs productName={product.name} />

      <div className={styles['product-details']}>
        <button type="button" className={styles['back-link']} onClick={() => navigate(-1)}>
          <img src={asset('img/arrow-primary.svg')} alt="Back" />
          <span>Back</span>
        </button>
        <h1 className={styles['title']}>{name}</h1>

        <div className={styles['details-top']}>
          <div className={styles['details-top-left']}>
            <div className={styles['gallery']}>
              <div className={styles['main-image-container']}>
                <img src={asset(currentImage)} alt={name} />
              </div>
              <div className={styles['thumb-list']}>
                {images.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles['thumb-item']} ${
                      currentImage === imgUrl ? styles['thumb-item--active'] : ''
                    }`}
                    onClick={() => setSelectedImage(imgUrl)}
                  >
                    <img src={asset(imgUrl)} alt={name} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles['details-top-right']}>
            <div className={styles['colors-panel']}>
              <span className={styles['label-text']}>Available colors</span>
              <div className={styles['colors-row']}>
                {colorsAvailable.map((color) => (
                  <div key={color}>
                    <input
                      type="radio"
                      name="color"
                      id={color}
                      value={color}
                      checked={selectedColor === color}
                      onChange={() => handleColorChange(color)}
                    />
                    <label className={styles['color-button']} htmlFor={color}>
                      <span
                        className={styles['color-circle']}
                        style={{ backgroundColor: COLOR_MAP[color] }}
                      ></span>
                    </label>
                  </div>
                ))}
              </div>
              <span className={styles['product-id']}>ID: {product.id}</span>
            </div>
            <div className={styles['divider']} />

            <div className={styles['capacity-panel']}>
              <span className={styles['label-text']}>Select capacity</span>
              <div className={styles['capacity-row']}>
                {capacityAvailable.map((capacity) => (
                  <div key={capacity}>
                    <input
                      type="radio"
                      name="capacity"
                      id={capacity}
                      value={capacity}
                      checked={selectedCapacity === capacity}
                      onChange={() => handleCapacityChange(capacity)}
                    />
                    <label className={styles['capacity-button']} htmlFor={capacity}>
                      <span className={styles['capacity-text']}>{capacity}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Prices
              priceDiscount={priceDiscount}
              priceRegular={priceRegular}
              classname={styles.prices}
            />
            <AddActions classname={styles.actions} />
            <Specifications list={PRODUCT_SPECIFICATIONS} product={product} />
          </div>
        </div>

        <div className={styles['details-bottom']}>
          <div className={styles['details-bottom-left']}>
            <AboutProduct description={description} />
          </div>

          <div className={styles['details-bottom-right']}>
            <Specifications
              list={PRODUCT_SPECIFICATIONS_TECH}
              product={product}
              title={'Tech specs'}
              classnames={{
                specificationsPanel: styles['specifications-panel'],
                specifications: styles.specifications,
              }}
            />
          </div>
        </div>

        <div className={styles['suggested-products']}>
          {suggestedProducts && (
            <CardSlider products={suggestedProducts} title={'You may also like'} />
          )}
        </div>
      </div>
    </>
  );
};
