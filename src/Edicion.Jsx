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

  // Mensajes personalizados
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [confirmarBorrado, setConfirmarBorrado] = useState({ mostrar: false, id: null, nombre: '' });

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
    if (name === 'price') {
      // Permitir números, puntos y comas
      let val = value.replace(/[^0-9.,]/g, '');
      setForm(prev => ({ ...prev, [name]: val }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar campos básicos no vacíos
    if (!form.name.trim() && !form.price.trim()) {
      setMensaje({ tipo: 'error', texto: 'El campo nombre es obligatorio: rellénalo. El campo precio es obligatorio: rellénalo.' });
      return;
    }
    if (!form.name.trim()) {
      setMensaje({ tipo: 'error', texto: 'El campo nombre es obligatorio: rellénalo.' });
      return;
    }
    if (!form.price.trim()) {
      setMensaje({ tipo: 'error', texto: 'El campo precio es obligatorio: rellénalo.' });
      return;
    }
    // Validar que el precio sea numérico y mayor a 0 (aceptando . y ,)
    const precioStr = form.price.replace(',', '.');
    const precioNum = parseFloat(precioStr);
    if (isNaN(precioNum) || precioNum <= 0) {
      setMensaje({ tipo: 'error', texto: 'El precio debe ser un número positivo.' });
      return;
    }
    // Construir objeto producto
    const productoData = {
      id: form.id,
      name: form.name.trim(),
      price: precioNum,
      category: form.category.trim(),
      image: form.image.trim(),
      description: form.description.trim()
    };
    if (form.id) {
      editProducto(productoData);
      setMensaje({ tipo: 'exito', texto: 'Producto editado correctamente.' });
    } else {
      addProducto(productoData);
      setMensaje({ tipo: 'exito', texto: 'Producto agregado correctamente.' });
    }
    // Limpiar form
    setForm({ id: null, name: '', price: '', category: '', image: '', description: '' });
  };

  const handleDelete = (id, nombre) => {
    setConfirmarBorrado({ mostrar: true, id, nombre });
  };

  const confirmarEliminar = () => {
    deleteProducto(confirmarBorrado.id);
    setMensaje({ tipo: 'exito', texto: `Producto "${confirmarBorrado.nombre}" eliminado correctamente.` });
    setConfirmarBorrado({ mostrar: false, id: null, nombre: '' });
  };

  const cancelarEliminar = () => {
    setConfirmarBorrado({ mostrar: false, id: null, nombre: '' });
  };

  // Limpiar mensajes después de 3 segundos
  useEffect(() => {
    if (mensaje.texto) {
      const timer = setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  return (
    <div>
      <h2>Edición de Productos</h2>
      {mensaje.texto && (
        <div style={{
          background: mensaje.tipo === 'error' ? '#fdecea' : '#eafaf1',
          color: mensaje.tipo === 'error' ? '#e74c3c' : '#27ae60',
          border: `1px solid ${mensaje.tipo === 'error' ? '#e74c3c' : '#27ae60'}`,
          borderRadius: '4px',
          padding: '10px',
          marginBottom: '12px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>{mensaje.texto}</div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Título"
          style={{ flex: '1 1 200px', padding: '8px' }}
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
          style={{ flex: '1 1 100px', padding: '8px' }}
          type="text"
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
        <div key={p.id} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '12px', margin: '10px 0', display: 'flex', flexDirection: 'column' }}>
          {confirmarBorrado.mostrar && confirmarBorrado.id === p.id && (
            <div style={{
              background: '#fffbe6',
              color: '#b26a00',
              border: '1px solid #f1c40f',
              borderRadius: '4px',
              padding: '16px',
              marginBottom: '10px',
              textAlign: 'center',
              fontWeight: 'bold',
              zIndex: 10
            }}>
              <p>¿Seguro que deseas borrar el producto "{confirmarBorrado.nombre}"?</p>
              <button onClick={confirmarEliminar} style={{
                marginRight: '12px',
                padding: '8px 16px',
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>Sí, borrar</button>
              <button onClick={cancelarEliminar} style={{
                padding: '8px 16px',
                backgroundColor: '#3498db',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>Cancelar</button>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {p.image && (
              <img src={p.image} alt={p.name} style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '16px' }} />
            )}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 4px 0', color: '#2d3436', fontWeight: 'bold' }}>
                {p.name && p.name.trim() ? p.name : (p.title && p.title.trim() ? p.title : 'Sin nombre')}
              </h3>
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
              <button onClick={() => handleDelete(p.id, p.name && p.name.trim() ? p.name : (p.title && p.title.trim() ? p.title : 'Sin nombre'))} style={{
                padding: '6px 12px',
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>Borrar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Edicion;
