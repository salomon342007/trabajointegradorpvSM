import React, { useContext, useState } from 'react';
import { ProductosContext } from './context/ProductosContext';
import { useNavigate } from 'react-router-dom';

const NuevoProducto = () => {
  const { addProducto } = useContext(ProductosContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price.trim()) {
      alert('Nombre y precio son obligatorios');
      return;
    }
    addProducto({
      name: form.name.trim(),
      price: form.price.trim(),
      category: form.category.trim(),
      image: form.image.trim(),
      description: form.description.trim()
    });
    navigate('/edicion');
  };

  return (
    <div>
      <h2>Nuevo Producto</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Título" required style={{ padding: '8px' }} />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Precio" required style={{ padding: '8px' }} />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Categoría" style={{ padding: '8px' }} />
        <input name="image" value={form.image} onChange={handleChange} placeholder="URL de imagen" style={{ padding: '8px' }} />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción" style={{ padding: '8px' }} rows={3} />
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#2ecc71',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default NuevoProducto;
// Este componente permite al usuario agregar un nuevo producto mediante un formulario.