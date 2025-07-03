import React, { createContext, useState } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const addToCarrito = (producto) => {
    setCarrito(prev => [...prev, producto]);
  };

  const removeFromCarrito = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const clearCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider value={{ carrito, addToCarrito, removeFromCarrito, clearCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};