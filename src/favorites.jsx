import { useContext } from 'react';
import { ProductContext } from '/src/ProductContext';
import { useNavigate } from 'react-router-dom'; 

const Favorites = () => {
  const { products, favorites } = useContext(ProductContext); // Obtiene productos y lista de IDs favoritos desde el contexto
  const navigate = useNavigate(); // Permite redirigir a otras páginas

  // Filtra los productos para mostrar sólo aquellos cuyo id está en la lista de favoritos
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div>
      <h2>Productos Favoritos</h2>
      {favoriteProducts.length === 0 ? (  // Si no hay favoritos muestra un mensaje
        <p>No hay productos marcados como favoritos.</p>
      ) : (
        favoriteProducts.map(product => (   // Mapea cada producto favorito para mostrarlo
          <div key={product.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
            <img src={product.image} alt={product.name} width="100" />
            <h3>{product.name}</h3>
            <p>Precio: ${product.price}</p>
            <p>Categoría: {product.category}</p>
            <button onClick={() => navigate(`/product/${product.id}`)}>Ver Detalles</button> {/* Botón para ver detalles del producto */}
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
