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
