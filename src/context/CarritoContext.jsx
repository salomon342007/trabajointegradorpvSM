import React, { createContext, useState } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const addToCarrito = (producto) => {
    setCarrito(carritoActual => {
      const existe = carritoActual.find(p => p.id === producto.id);
      const cantidadAgregar = producto.cantidad || 1;
      if (existe) {
        // Suma la cantidad seleccionada
        return carritoActual.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: (p.cantidad || 1) + cantidadAgregar }
            : p
        );
      } else {
        // Agrega con la cantidad seleccionada
        return [...carritoActual, { ...producto, cantidad: cantidadAgregar }];
      }
    });
  };

  const removeFromCarrito = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const clearCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider value={{
      carrito,
      setCarrito,
      addToCarrito,
      removeFromCarrito,
      clearCarrito
    }}>
      {children}
    </CarritoContext.Provider>
  );
};