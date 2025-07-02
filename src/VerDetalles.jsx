import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductosContext } from './context/ProductosContext';

const VerDetalles = () => {
  const { id } = useParams();
  const { productos, favoritos, toggleFavorito } = useContext(ProductosContext);
  const p = productos.find(item => item.id === parseInt(id));
  if (!p) return <p>Producto no encontrado.</p>;

  return (
    <div>
      <h2>Detalle: {p.name}</h2>
<<<<<<< HEAD
      {p.image && <img src={p.image} alt={p.name} style={{ width: '200px', objectFit: 'cover', marginBottom: '12px' }} />}
=======
      {p.image && (
        <img
          src={p.image}
          alt={p.name}
          style={{ width: '200px', objectFit: 'cover', marginBottom: '12px' }}
        />
      )}
>>>>>>> a63aeae09ddaeea0e58ecc605530e8503a0ae05b
      <p><strong>Descripción:</strong> {p.description}</p>
      <p><strong>Precio:</strong> ${p.price}</p>
      <p><strong>Categoría:</strong> {p.category}</p>
      <label style={{ display: 'block', marginTop: '12px' }}>
        <input
          type="checkbox"
          checked={favoritos.includes(p.id)}
          onChange={() => toggleFavorito(p.id)}
        /> Marcar como Favorito
      </label>
    </div>
  );
};

export default VerDetalles;
<<<<<<< HEAD
=======
// Este componente muestra los detalles de un producto específico, incluyendo su imagen, descripción, precio y categoría.
>>>>>>> a63aeae09ddaeea0e58ecc605530e8503a0ae05b
