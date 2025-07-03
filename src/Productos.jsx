import React, { useContext, useState, useMemo } from 'react';
import { ProductosContext } from './context/ProductosContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { CarritoContext } from './context/CarritoContext';

const Productos = () => {
  const { productos, favoritos, toggleFavorito } = useContext(ProductosContext);
  const [filtro, setFiltro] = useState('todos');
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const { addToCarrito } = useContext(CarritoContext);

  const productosFiltrados = useMemo(() => {
    if (filtro === 'tecnologia') {
      return productos.filter(p =>
        p.category && p.category.toLowerCase().includes('electronics')
      );
    }
    if (filtro === 'ropa') {
      return productos.filter(p =>
        p.category && p.category.toLowerCase().includes('clothing')
      );
    }
    return productos;
  }, [productos, filtro]);

  return (
    <div>
      <h2>Todos los Productos</h2>
      <div style={{ marginBottom: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <button
          onClick={() => setFiltro('todos')}
          style={{ background: filtro === 'todos' ? '#3498db' : '#eee', color: filtro === 'todos' ? '#fff' : '#222', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltro('tecnologia')}
          style={{ background: filtro === 'tecnologia' ? '#3498db' : '#eee', color: filtro === 'tecnologia' ? '#fff' : '#222', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Tecnología
        </button>
        <button
          onClick={() => setFiltro('ropa')}
          style={{ background: filtro === 'ropa' ? '#3498db' : '#eee', color: filtro === 'ropa' ? '#fff' : '#222', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Ropa
        </button>
        <button
          onClick={() => navigate('/carrito')}
          style={{ background: '#2ecc71', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: 'auto' }}
        >
          Ver Carrito
        </button>
      </div>
      {productosFiltrados.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {productosFiltrados.map(p => (
            <div key={p.id} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '12px', margin: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '260px', minHeight: '420px', background: '#fafafa' }}>
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: '120px', height: '120px', objectFit: 'cover', marginBottom: '12px' }}
                />
              )}
              <div style={{ flex: 1, width: '100%' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>{p.title}</h3>
                <p style={{ margin: '0 0 4px 0' }}><strong>Precio:</strong> ${p.price}</p>
                <p style={{ margin: '0 0 4px 0' }}><strong>Categoría:</strong> {p.category}</p>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#555' }}>{p.description}</p>
                <button onClick={() => navigate(`/product/${p.id}`)} style={{
                  marginRight: '8px',
                  padding: '6px 12px',
                  backgroundColor: '#3498db',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginBottom: '8px'
                }}>Detalles</button>
                <button
                  onClick={() => addToCarrito(p)}
                  style={{
                    backgroundColor: '#27ae60',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    width: '100%',
                    marginBottom: '8px'
                  }}
                >
                  Agregar al carrito
                </button>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '1rem' }}>
                  <input
                    type="checkbox"
                    checked={favoritos.includes(p.id)}
                    onChange={() => toggleFavorito(p.id)}
                    style={{ verticalAlign: 'middle' }}
                  /> Mis Favoritos
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Productos;
// Este componente muestra todos los productos disponibles y permite al usuario ver detalles de cada producto y marcarlo como favorito.
