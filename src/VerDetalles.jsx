import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductosContext } from './context/ProductosContext';

const VerDetalles = () => {
  const { id } = useParams();
  const { productos, favoritos, toggleFavorito } = useContext(ProductosContext);
  const p = productos.find(item => item.id === parseInt(id));
  if (!p) return <p>Producto no encontrado.</p>;
