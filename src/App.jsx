import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ProductProvider } from '/src/ProductContext';
import Home from '/src/Home';
import Favorites from '/src/Favorites';
import ProductDetail from '/src/ProductDetail';
import ProductForm from '/src/ProductForm';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/favorites">Favoritos</Link> | 
        <Link to="/create">Nuevo Producto</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/create" element={<ProductForm />} />
        <Route path="/edit/:id" element={<ProductForm />} />
      </Routes>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductProvider>
  </React.StrictMode>
);