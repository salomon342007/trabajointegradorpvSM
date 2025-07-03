import React, { useContext, useState, useMemo } from 'react';
import { ProductosContext } from './context/ProductosContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { CarritoContext } from './context/CarritoContext';
import Login from './Login'; // Asegúrate de importar el componente Login

const Productos = () => {
  const { productos, favoritos, toggleFavorito } = useContext(ProductosContext);
  const [filtro, setFiltro] = useState('todos');
  const [cantidades, setCantidades] = useState({});
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
    if (filtro === 'joyeria') {
      return productos.filter(p =>
        p.category && p.category.toLowerCase().includes('jewel')
      );
    }
    return productos;
  }, [productos, filtro]);

  const handleCantidadChange = (id, value) => {
    const val = Math.max(1, parseInt(value) || 1);
    setCantidades(prev => ({ ...prev, [id]: val }));
  };

  const handleAgregarCarrito = (p) => {
    const cantidad = cantidades[p.id] || 1;
    addToCarrito({ ...p, cantidad });
  };

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
          onClick={() => setFiltro('joyeria')}
          style={{ background: filtro === 'joyeria' ? '#3498db' : '#eee', color: filtro === 'joyeria' ? '#fff' : '#222', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Joyería
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
            <div key={p.id} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '12px', margin: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '260px', minHeight: '420px', background: '#fafafa', position: 'relative' }}>
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: '120px', height: '120px', objectFit: 'cover', marginBottom: '12px' }}
                />
              )}
              <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>{p.title}</h3>
                <p style={{ margin: '0 0 4px 0' }}><strong>Precio:</strong> ${p.price}</p>
                <p style={{ margin: '0 0 4px 0' }}><strong>Categoría:</strong> {p.category}</p>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#555' }}>{p.description}</p>
                {/* Controles agrupados en la parte baja */}
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label htmlFor={`cantidad-${p.id}`}>Cantidad:</label>
                    <input
                      id={`cantidad-${p.id}`}
                      type="number"
                      min={1}
                      value={cantidades[p.id] || 1}
                      onChange={e => handleCantidadChange(p.id, e.target.value)}
                      style={{ width: '60px', padding: '4px', fontSize: '1rem' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                    <button onClick={() => navigate(`/product/${p.id}`)} style={{
                      padding: '6px 12px',
                      backgroundColor: '#3498db',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      flex: 1
                    }}>Detalles</button>
                    <button
                      onClick={() => handleAgregarCarrito(p)}
                      style={{
                        backgroundColor: '#27ae60',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '1rem', marginTop: '4px' }}>
                    <input
                      type="checkbox"
                      checked={favoritos.includes(p.id)}
                      onChange={() => toggleFavorito(p.id)}
                      style={{ verticalAlign: 'middle' }}
                    /> Mis Favoritos
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Fin de productos */}
    </div>
  );
}
export default Productos;
// Este componente muestra todos los productos disponibles y permite al usuario ver detalles de cada producto y marcarlo como favorito.
