import React, { useContext, useState, useEffect } from 'react';
import { ProductosContext } from './context/ProductosContext';
import { useNavigate } from 'react-router-dom';

const Edicion = () => {
  const { productos, addProducto, editProducto, deleteProducto } = useContext(ProductosContext);
  const navigate = useNavigate();

  // Estado de formulario
  const [form, setForm] = useState({
    id: null,
    name: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });


  // Cuando se hace click en "Editar" de un producto de la lista, pre-cargar en el form
  const handlePreload = (p) => {
    setForm({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category,
      image: p.image,
      description: p.description
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar campos básicos no vacíos
    if (!form.name.trim() || !form.price.trim()) {
      alert('Nombre y precio son obligatorios');
      return;
    }
    // Construir objeto producto
    const productoData = {
      id: form.id,
      name: form.name.trim(),
      price: form.price.trim(),
      category: form.category.trim(),
      image: form.image.trim(),
      description: form.description.trim()
    };
    if (form.id) {
      editProducto(productoData);
      alert('Producto editado');
    } else {
      addProducto(productoData);
      alert('Producto agregado');
    }
   
    // Limpiar form
    setForm({ id: null, name: '', price: '', category: '', image: '', description: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas borrar este producto?')) {
      deleteProducto(id);
    }
  };

  return (
    <div>
      <h2>Edición de Productos</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Título"
          style={{ flex: '1 1 200px', padding: '8px' }}
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
          style={{ flex: '1 1 100px', padding: '8px' }}
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Categoría"
          style={{ flex: '1 1 150px', padding: '8px' }}
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="URL de imagen"
          style={{ flex: '1 1 200px', padding: '8px' }}
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
          style={{ flex: '1 1 100%', padding: '8px' }}
          rows={3}
        />
        <button type="submit" style={{
          padding: '10px 16px',
          backgroundColor: '#2ecc71',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          {form.id ? 'Guardar Cambios' : 'Agregar Producto'}
        </button>
      </form>

      <h3>Productos existentes</h3>
      {productos.length === 0 && <p>No hay productos cargados.</p>}
      {productos.map(p => (
        <div key={p.id} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '12px', margin: '10px 0', display: 'flex', alignItems: 'center' }}>
          {p.image && (
            <img src={p.image} alt={p.name} style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '16px' }} />
          )}
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 4px 0' }}>{p.name}</h4>
            <p style={{ margin: '0 0 4px 0' }}><strong>Precio:</strong> ${p.price}</p>
            <p style={{ margin: '0 0 4px 0' }}><strong>Categoría:</strong> {p.category}</p>
            <p style={{ margin: '0 0 8px 0' }}>{p.description}</p>
          </div>
          <div>
            <button onClick={() => handlePreload(p)} style={{
              marginRight: '8px',
              padding: '6px 12px',
              backgroundColor: '#3498db',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>Editar</button>
            <button onClick={() => handleDelete(p.id)} style={{
              padding: '6px 12px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>Borrar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Edicion;
