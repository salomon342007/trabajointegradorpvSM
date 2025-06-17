import { useContext } from 'react';
import { ProductContext } from '/src/ProductContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { products, toggleFavorite, favorites } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Productos</h2>
      {products.map(product => (
        <div key={product.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <img src={product.image} alt={product.name} width="100" />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <p>{product.description}</p>
          <p>Categoría: {product.category}</p>
          <button onClick={() => navigate(`/product/${product.id}`)}>Ver más</button>
          <input 
            type="checkbox" 
            checked={favorites.includes(product.id)} 
            onChange={() => toggleFavorite(product.id)}
          /> Favorito
        </div>
      ))}
    </div>
  );
};
export default Home;
