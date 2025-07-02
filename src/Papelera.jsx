import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductosContext } from './context/ProductosContext';

const Papelera = () => {
  const { papelera, restoreProducto } = useContext(ProductosContext);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Papelera</h2>
      {papelera.length === 0 ? (
        <p>No hay productos en papelera.</p>
      ) : (
        papelera.map(entry => {
          const p = entry.producto;
          return (
            <div key={p.id} style={{ border: '1px dashed #e74c3c', padding: '10px', margin: '10px 0' }}>
              <h3>{p.name}</h3>
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
          );
        })
      )}
    </div>
  );
};
export default Papelera;