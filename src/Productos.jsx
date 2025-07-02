import React, { useContext } from 'react';
import { ProductosContext } from './context/ProductosContext';
import { useNavigate } from 'react-router-dom';

const Productos = () => {
  const { productos, favoritos, toggleFavorito } = useContext(ProductosContext);
  const navigate = useNavigate();
  return (
    <div>
      <h2>Todos los Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        productos.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '12px', margin: '10px 0', display: 'flex', alignItems: 'center' }}>
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '16px' }}
              />
            )}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 8px 0' }}>{p.name}</h3>
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
              <label style={{ marginLeft: '8px' }}>
                <input
                  type="checkbox"
                  checked={favoritos.includes(p.id)}
                  onChange={() => toggleFavorito(p.id)}
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