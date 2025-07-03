import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductosContext } from './context/ProductosContext';
import { AuthContext } from './context/AuthContext';

const Papelera = () => {
  const { papelera, restoreProducto } = useContext(ProductosContext);
  const { user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAdmin) {
    return <p style={{ color: '#e74c3c' }}>Acceso solo para administradores.</p>;
  }

  return (
    <div>
      <h2>Papelera</h2>
      {papelera.length === 0 ? (
        <p>No hay productos en papelera.</p>
      ) : (
        papelera.map(entry => {
          const p = entry.producto;
          return (
            <div key={p.id} style={{ border: '1px dashed #e74c3c', padding: '10px', margin: '10px 0', display: 'flex', alignItems: 'center' }}>
              {p.image && (
                <img src={p.image} alt={p.name || p.title || 'Sin nombre'} style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '16px' }} />
              )}
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#2d3436', fontWeight: 'bold', margin: '0 0 4px 0' }}>{p.name && p.name.trim() ? p.name : (p.title && p.title.trim() ? p.title : 'Sin nombre')}</h3>
                <p style={{ margin: '0 0 4px 0' }}><strong>Categoría:</strong> {p.category}</p>
              </div>
              <div>
                <button onClick={() => restoreProducto(p.id)} style={{
                  marginRight: '8px',
                  padding: '6px 12px',
                  backgroundColor: '#2ecc71',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Restaurar
                </button>
                <button onClick={() => navigate(`/product/${p.id}`)} style={{
                  padding: '6px 12px',
                  backgroundColor: '#3498db',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Ver Detalles
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Papelera;