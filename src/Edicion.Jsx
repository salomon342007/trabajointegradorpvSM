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
    