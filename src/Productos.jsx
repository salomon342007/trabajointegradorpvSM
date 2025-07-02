import React, { useContext } from 'react';
import { ProductosContext } from './context/ProductosContext';
import { useNavigate } from 'react-router-dom';

const Productos = () => {
  const { productos, favoritos, toggleFavorito } = useContext(ProductosContext);
  const navigate = useNavigate();
}