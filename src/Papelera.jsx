import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductosContext } from './context/ProductosContext';

const Papelera = () => {
  const { papelera, restoreProducto } = useContext(ProductosContext);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Papelera</h2>
      {papelera.length === 0 ? (
        <p>No hay productos en papelera.</p>
      ) : (
