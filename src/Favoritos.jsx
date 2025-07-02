import React from 'react';

const Favoritos = () => {
  return (
    <div>
      <h2>Mis Favoritos</h2>
      <p>No has marcado ningún producto como favorito.</p>
    </div>
  );
};


export default Favoritos;
import React, { useContext } from 'react';
import { ProductosContext } from './context/ProductosContext';

const Favoritos = () => {
  const { productos, favoritos } = useContext(ProductosContext);
  const favs = productos.filter(p => favoritos.includes(p.id));

  return (
    <div>
      <h2>Mis Favoritos</h2>
      {favs.length === 0 ? (
        <p>No has marcado ningún producto como favorito.</p>
      ) : (
        favs.map(p => (
          <div key={p.id}>
            <h3>{p.name}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default Favoritos;
import React, { useContext } from 'react';
import { ProductosContext } from './context/ProductosContext';

const Favoritos = () => {
  const { productos, favoritos } = useContext(ProductosContext);
  const favs = productos.filter(p => favoritos.includes(p.id));

  return (
    <div>
      <h2>Mis Favoritos</h2>
      {favs.length === 0 ? (
        <p>No has marcado ningún producto como favorito.</p>
      ) : (
        favs.map(p => (
          <div key={p.id}>
            <h3>{p.name}</h3>
            <p><strong>Precio:</strong> ${p.price}</p>
            <p><strong>Categoría:</strong> {p.category}</p>
            <p>{p.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Favoritos;
import React, { useContext } from 'react';
import { ProductosContext } from './context/ProductosContext';

const Favoritos = () => {
  const { productos, favoritos } = useContext(ProductosContext);
  const favs = productos.filter(p => favoritos.includes(p.id));

  return (
    <div>
      <h2>Mis Favoritos</h2>
      {favs.length === 0 ? (
        <p>No has marcado ningún producto como favorito.</p>
      ) : (
        favs.map(p => (
          <div key={p.id} style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '12px',
            margin: '10px 0',
            display: 'flex',
            alignItems: 'center'
          }}>
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '16px' }}
              />
            )}
            <div>
              <h3>{p.name}</h3>
              <p><strong>Precio:</strong> ${p.price}</p>
              <p><strong>Categoría:</strong> {p.category}</p>
              <p>{p.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Favoritos;
