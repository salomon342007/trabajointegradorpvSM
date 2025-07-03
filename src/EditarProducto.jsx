import React, { useContext, useState, useEffect } from 'react';
import { ProductosContext } from './context/ProductosContext';
import { AuthContext } from './context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const EditarProducto = () => {
  const { productos, editProducto } = useContext(ProductosContext);
  const { user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = productos.find(p => p.id === parseInt(id));

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        price: editing.price,
        category: editing.category,
        image: editing.image,
        description: editing.description
      });
    }
  }, [editing]);

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
    editProducto({
      id: editing.id,
      name: form.name.trim(),
      price: form.price.trim(),
      category: form.category.trim(),
      image: form.image.trim(),
      description: form.description.trim()
    });
    navigate('/edicion');
  };

  if (!editing) {
    return <p>Producto no encontrado para editar.</p>;
  }

  if (!isAdmin) {
    return <p style={{ color: '#e74c3c' }}>Acceso solo para administradores.</p>;
  }

  return (
    <div>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Título" required style={{ padding: '8px' }} />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Precio" required style={{ padding: '8px' }} />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Categoría" style={{ padding: '8px' }} />
        <input name="image" value={form.image} onChange={handleChange} placeholder="URL de imagen" style={{ padding: '8px' }} />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción" style={{ padding: '8px' }} rows={3} />
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#3498db',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarProducto;
