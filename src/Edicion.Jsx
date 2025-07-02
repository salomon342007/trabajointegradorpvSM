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

 