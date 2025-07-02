import React, { createContext, useState } from 'react';

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [papelera, setPapelera] = useState([]);

  const addProducto = (producto) => {
    // Se espera objeto { name, price, description, category, image }
    setProductos(prev => [...prev, { ...producto, id: Date.now() }]);
  };
  const editProducto = (productoActualizado) => {
    setProductos(prev =>
      prev.map(p => p.id === productoActualizado.id ? productoActualizado : p)
    );
  };

  const deleteProducto = (id) => {
    const idx = productos.findIndex(p => p.id === id);
    if (idx < 0) return;
    const prod = productos[idx];
    setPapelera(prev => [...prev, { producto: prod, index: idx }]);
    setProductos(prev => prev.filter(p => p.id !== id));
  };
