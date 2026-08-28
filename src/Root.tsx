import type React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App.tsx';
import { HomePage } from './modules/HomePage';
import { ProductPage } from './modules/ProductPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage/CartPage.tsx';

export const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<ProductPage />} />
          <Route path="tablets" element={<ProductPage />} />
          <Route path="accessories" element={<ProductPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
