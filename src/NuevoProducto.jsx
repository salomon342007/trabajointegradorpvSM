import React, { useContext, useState } from 'react';
import { ProductosContext } from './context/ProductosContext';
import { useNavigate } from 'react-router-dom';

const NuevoProducto = () => {
  const { addProducto } = useContext(ProductosContext);
  const navigate = useNavigate();
