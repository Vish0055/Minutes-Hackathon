import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ShoppingCart from './ShoppingCart';
import FastForwardPage from './FastForwardPage';
import { ThemeProvider } from '@/components/ui/theme-provider';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage onNavigateToCart={() => {}} />} />
            <Route path="/fast-forward" element={<FastForwardPage />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
