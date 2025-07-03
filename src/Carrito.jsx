import React, { useContext, useState } from 'react';
import { CarritoContext } from './context/CarritoContext';

const Carrito = () => {
  const { carrito, removeFromCarrito, clearCarrito } = useContext(CarritoContext);
  const [compraExitosa, setCompraExitosa] = useState(false);

  const total = carrito.reduce((acc, p) => acc + (p.price * (p.cantidad || 1)), 0);

  const handleComprar = () => {
    setCompraExitosa(true);
    clearCarrito();
    setTimeout(() => setCompraExitosa(false), 3500);
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {compraExitosa && (
        <div style={{
          background: 'linear-gradient(90deg, #f9d423 0%, #ff4e50 100%)',
          color: '#fff',
          border: '3px solid #e67e22',
          borderRadius: '8px',
          padding: '18px',
          margin: '18px 0',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.3rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
        }}>
          ¡Compra realizada con éxito! 🎉<br />¡Gracias por tu compra!
        </div>
      )}
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          {carrito.map(p => (
            <div key={p.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              {p.image && (
                <img src={p.image} alt={p.title} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px' }} />
              )}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{p.title}</h3>
                <p style={{ margin: '4px 0' }}>Precio: ${p.price}</p>
                <p style={{ margin: '4px 0' }}>Cantidad: {p.cantidad || 1}</p>
              </div>
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
            onClick={handleComprar}
            style={{
              backgroundColor: '#2ecc71',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '12px 18px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              marginTop: '10px',
              boxShadow: '0 2px 8px rgba(46,204,113,0.15)'
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