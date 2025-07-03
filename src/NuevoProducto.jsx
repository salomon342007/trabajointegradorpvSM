import React, { useContext, useState, useEffect } from 'react';
import { ProductosContext } from './context/ProductosContext';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NuevoProducto = () => {
  const { addProducto } = useContext(ProductosContext);
  const { user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      // Solo permitir números (sin letras, puntos ni símbolos)
      let val = value.replace(/[^0-9]/g, '');
      setForm(prev => ({ ...prev, [name]: val }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    // Validar que el precio sea estrictamente numérico y mayor a 0
    if (!/^[0-9]+$/.test(form.price) || parseInt(form.price, 10) <= 0) {
      setMensaje({ tipo: 'error', texto: 'El precio debe ser un número entero positivo.' });
      return;
    }
    const priceInt = parseInt(form.price, 10);
    addProducto({
      name: form.name.trim(),
      price: priceInt,
      category: form.category.trim(),
      image: form.image.trim(),
      description: form.description.trim()
    });
    setMensaje({ tipo: 'exito', texto: 'Producto agregado correctamente.' });
    setForm({ name: '', price: '', category: '', image: '', description: '' });
    setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000);
    navigate('/edicion');
  };

  useEffect(() => {
    if (mensaje.texto && mensaje.tipo === 'error') {
      const timer = setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  if (!isAdmin) {
    return <p style={{color:'#e74c3c'}}>Acceso solo para administradores.</p>;
  }

  return (
    <div>
      <h2>Nuevo Producto</h2>
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
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Título" style={{ padding: '8px' }} />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Precio" style={{ padding: '8px' }} type="text" inputMode="numeric" pattern="[0-9]*" minLength={1} />
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
// Este componente permite al usuario agregar un nuevo producto mediante un formulario. Solo los administradores pueden acceder a esta función.