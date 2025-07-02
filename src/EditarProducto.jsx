import React, { useContext, useState, useEffect } from 'react';
import { ProductosContext } from './context/ProductosContext';
import { useNavigate, useParams } from 'react-router-dom';

const EditarProducto = () => {
  const { productos, editProducto } = useContext(ProductosContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = productos.find(p => p.id === parseInt(id));

