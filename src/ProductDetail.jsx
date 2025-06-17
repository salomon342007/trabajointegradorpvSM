import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '/src/ProductContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, toggleFavorite, favorites } = useContext(ProductContext);
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <p>Producto no encontrado</p>;

  
  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} width="200" />
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Categoría: {product.category}</p>
      <input 
        type="checkbox" 
        checked={favorites.includes(product.id)} 
        onChange={() => toggleFavorite(product.id)}
      /> Favorito
    </div>
  );
};
export default ProductDetail;