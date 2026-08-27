import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';

import './App.scss';

export const App = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
