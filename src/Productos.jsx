import React, { useContext, useEffect, useState } from 'react';
import React, { useContext, useEffect, useState, useMemo } from 'react';
import { ProductosContext } from './context/ProductosContext';
import { useNavigate } from 'react-router-dom';

const Productos = () => {
  const { favoritos, toggleFavorito } = useContext(ProductosContext);
  const [productos, setProductos] = useState([]);
  const { productos, setProductos, favoritos, toggleFavorito } = useContext(ProductosContext);
  const [filtro, setFiltro] = useState('todos');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProductos(data)) // usa el contexto
      .catch(err => console.error(err));
  }, []);

  // Filtro con useMemo
  const productosFiltrados = useMemo(() => {
    if (filtro === 'tecnologia') {
      // Puedes ajustar los nombres de categoría según la API
      return productos.filter(p =>
        p.category.toLowerCase().includes('electronics')
      );
    }
    if (filtro === 'ropa') {
      return productos.filter(p =>
        p.category.toLowerCase().includes('clothing')
      );
    }
    return productos;
  }, [productos, filtro]);

  return (
    <div>
      <h2>Todos los Productos</h2>
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setFiltro('todos')}
          style={{ marginRight: '8px', background: filtro === 'todos' ? '#3498db' : '#eee', color: filtro === 'todos' ? '#fff' : '#222' }}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltro('tecnologia')}
          style={{ marginRight: '8px', background: filtro === 'tecnologia' ? '#3498db' : '#eee', color: filtro === 'tecnologia' ? '#fff' : '#222' }}
        >
          Tecnología
        </button>
        <button
          onClick={() => setFiltro('ropa')}
          style={{ background: filtro === 'ropa' ? '#3498db' : '#eee', color: filtro === 'ropa' ? '#fff' : '#222' }}
        >
          Ropa
        </button>
      </div>
      {productosFiltrados.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        productosFiltrados.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '12px', margin: '10px 0', display: 'flex', alignItems: 'center' }}>
            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '16px' }}
              />
            )}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 8px 0' }}>{p.title}</h3>
              <p style={{ margin: '0 0 4px 0' }}><strong>Precio:</strong> ${p.price}</p>
              <p style={{ margin: '0 0 4px 0' }}><strong>Categoría:</strong> {p.category}</p>
              <p style={{ margin: '0 0 8px 0' }}>{p.description}</p>
              <button onClick={() => navigate(`/product/${p.id}`)} style={{
                marginRight: '8px',
                padding: '6px 12px',
                backgroundColor: '#3498db',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>Detalles</button>
              <label style={{ marginLeft: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '1rem' }}>
                <input
                  type="checkbox"
                  checked={favoritos.includes(p.id)}
                  onChange={() => toggleFavorito(p.id)}
                  style={{ verticalAlign: 'middle' }}
                /> Mis Favoritos
              </label>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default Productos;
// Este componente muestra todos los productos disponibles y permite al usuario ver detalles de cada producto y marcarlo como favorito.
