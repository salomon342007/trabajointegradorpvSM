import { useContext, useState, useEffect } from 'react';
import { ProductContext } from '/src/ProductContext';
import { useNavigate, useParams } from 'react-router-dom';


const ProductForm = () => {
  const { addProduct, editProduct, products } = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const editingProduct = products.find(p => p.id === parseInt(id));

  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      editProduct(form);
    } else {
      addProduct(form);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Precio" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Categoría" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="URL Imagen" required />
      <button type="submit">{id ? 'Editar' : 'Crear'}</button>
    </form>
  );
};
export default ProductForm;
