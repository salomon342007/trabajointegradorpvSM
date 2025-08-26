import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductosContext } from './context/ProductosContext';
import { AuthContext } from './context/AuthContext';

const VerDetalles = () => {
  const { id } = useParams();
  const { productos, favoritos, toggleFavorito, papelera } = useContext(ProductosContext);
  const { user } = useContext(AuthContext);

  let p = productos.find(item => item.id === parseInt(id));
  let enPapelera = false;
  // Si no se encuentra en productos, buscar en papelera
  if (!p && papelera) {
    const entry = papelera.find(entry => entry.producto.id === parseInt(id));
    if (entry) {
      p = entry.producto;
      enPapelera = true;
    }
  }
  if (!p) return <p>Producto no encontrado.</p>;

  return (
    <div>
      <h2>Detalle: {p.name && p.name.trim() ? p.name : (p.title && p.title.trim() ? p.title : 'Sin nombre')}</h2>
      {p.image && <img src={p.image} alt={p.name || p.title || 'Sin nombre'} style={{ width: '200px', objectFit: 'cover', marginBottom: '12px' }} />}
      <p><strong>Descripción:</strong> {p.description}</p>
      <p><strong>Precio:</strong> ${p.price}</p>
      <p><strong>Categoría:</strong> {p.category}</p>
      {!enPapelera && (
        <label style={{ display: 'block', marginTop: '12px' }}>
          <input
            type="checkbox"
            checked={favoritos.includes(p.id)}
            onChange={() => {
              if (!user) {
                alert("Debes iniciar sesión para marcar favoritos.");
                return;
              }
              toggleFavorito(p.id);
            }}
          /> Marcar como Favorito
        </label>
      )}
    </div>
  );
};

export default VerDetalles;
