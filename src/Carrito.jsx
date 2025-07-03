import React, { useContext } from 'react';
import { CarritoContext } from './context/CarritoContext';

const Carrito = () => {
  const { carrito, removeFromCarrito, clearCarrito } = useContext(CarritoContext);

  const total = carrito.reduce((acc, p) => acc + p.price, 0);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          {carrito.map(p => (
            <div key={p.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
              <h3>{p.title}</h3>
              <p>Precio: ${p.price}</p>
              <button
                onClick={() => removeFromCarrito(p.id)}
                style={{
                  backgroundColor: '#e74c3c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  cursor: 'pointer'
                }}
              >
                Eliminar
              </button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button
            onClick={clearCarrito}
            style={{
              backgroundColor: '#2ecc71',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 16px',
              cursor: 'pointer'
            }}
          >
            Comprar todos los productos
          </button>
        </div>
      )}
    </div>
  );
};

export default Carrito;