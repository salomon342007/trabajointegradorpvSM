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