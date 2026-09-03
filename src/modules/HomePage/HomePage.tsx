import type React from 'react';
import { PicturesSlider } from './components/PicturesSlider';

export const HomePage: React.FC = () => {
  return (
    <>
      <h1>Welcome to Nice Gadgets store!</h1>
      <PicturesSlider />
    </>
  );
};
