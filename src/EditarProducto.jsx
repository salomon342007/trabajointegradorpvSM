import React, { useContext, useState, useEffect } from 'react';
import { ProductosContext } from './context/ProductosContext';
import { useNavigate, useParams } from 'react-router-dom';

const EditarProducto = () => {
  const { productos, editProducto } = useContext(ProductosContext);
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

  