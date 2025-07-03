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
 const restoreProducto = (id) => {
    const entry = papelera.find(e => e.producto.id === id);
    if (!entry) return;
    setPapelera(prev => prev.filter(e => e.producto.id !== id));
    setProductos(prev => {
      const nuevos = [...prev];
      const pos = Math.min(entry.index, nuevos.length);
      nuevos.splice(pos, 0, entry.producto);
      return nuevos;
    });
  };

  const toggleFavorito = (id) => {
    setFavoritos(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <ProductosContext.Provider value={{
      productos,
      setProductos,
      favoritos,
      papelera,
      addProducto,
      editProducto,
      deleteProducto,
      restoreProducto,
      toggleFavorito
    }}>
      {children}
    </ProductosContext.Provider>
  );
};