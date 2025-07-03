import React, { createContext, useState, useEffect } from 'react';

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [papelera, setPapelera] = useState([]);
  const [cargado, setCargado] = useState(false);

  // Cargar productos desde localStorage o API al iniciar
  useEffect(() => {
    // Limpiar productos viejos con formato incorrecto
    let productosLS = JSON.parse(localStorage.getItem('productos'));
    if (productosLS && productosLS.length > 0) {
      // Si hay productos con 'name', convertirlos a 'title'
      productosLS = productosLS.map(p => ({
        ...p,
        title: p.title || p.name,
        id: p.id || Date.now() + Math.random()
      }));
      productosLS.forEach(p => delete p.name);
      setProductos(productosLS);
      localStorage.setItem('productos', JSON.stringify(productosLS));
      setCargado(true);
    } else {
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
          setProductos(data);
          localStorage.setItem('productos', JSON.stringify(data));
          setCargado(true);
        });
    }
    const papeleraLS = JSON.parse(localStorage.getItem('papelera')) || [];
    setPapelera(papeleraLS);
    const favLS = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(favLS);
  }, []);

  // Guardar productos, papelera y favoritos en localStorage cuando cambian
  useEffect(() => {
    if (cargado) localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos, cargado]);
  useEffect(() => {
    localStorage.setItem('papelera', JSON.stringify(papelera));
  }, [papelera]);
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const addProducto = (producto) => {
    // Convertir 'name' a 'title' para compatibilidad con la API y la vista de productos
    const nuevoProducto = {
      ...producto,
      title: producto.name || producto.title,
      id: Date.now()
    };
    delete nuevoProducto.name;
    setProductos(prev => {
      const nuevo = [...prev, nuevoProducto];
      localStorage.setItem('productos', JSON.stringify(nuevo));
      return nuevo;
    });
  };
  const editProducto = (productoActualizado) => {
    // Convertir 'name' a 'title' si es necesario
    const actualizado = {
      ...productoActualizado,
      title: productoActualizado.name || productoActualizado.title
    };
    delete actualizado.name;
    setProductos(prev => {
      const nuevo = prev.map(p => p.id === actualizado.id ? actualizado : p);
      localStorage.setItem('productos', JSON.stringify(nuevo));
      return nuevo;
    });
  };

  const deleteProducto = (id) => {
    const idx = productos.findIndex(p => p.id === id);
    if (idx < 0) return;
    const prod = productos[idx];
    setPapelera(prev => {
      const nuevaPapelera = [...prev, { producto: prod, index: idx }];
      localStorage.setItem('papelera', JSON.stringify(nuevaPapelera));
      return nuevaPapelera;
    });
    setProductos(prev => {
      const nuevo = prev.filter(p => p.id !== id);
      localStorage.setItem('productos', JSON.stringify(nuevo));
      return nuevo;
    });
  };
  const restoreProducto = (id) => {
    const entry = papelera.find(e => e.producto.id === id);
    if (!entry) return;
    setPapelera(prev => {
      const nuevaPapelera = prev.filter(e => e.producto.id !== id);
      localStorage.setItem('papelera', JSON.stringify(nuevaPapelera));
      return nuevaPapelera;
    });
    setProductos(prev => {
      const nuevos = [...prev];
      const pos = Math.min(entry.index, nuevos.length);
      nuevos.splice(pos, 0, entry.producto);
      localStorage.setItem('productos', JSON.stringify(nuevos));
      return nuevos;
    });
  };

  const toggleFavorito = (id) => {
    setFavoritos(prev => {
      const nuevo = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('favoritos', JSON.stringify(nuevo));
      return nuevo;
    });
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