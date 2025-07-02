import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <header style={{
        padding: '10px',
        backgroundColor: '#ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo e nombre */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold', marginRight: '20px' }}>
            {/* Aquí podrías poner una img de logo */}
            ShoppiNine
          </Link>
          {/* Links de navegación */}
          <nav>
            <Link to="/" style={{ margin: '0 8px' }}>Inicio</Link>
            <Link to="/productos" style={{ margin: '0 8px' }}>Productos</Link>
            <Link to="/favoritos" style={{ margin: '0 8px' }}>Mis Favoritos</Link>
            <Link to="/edicion" style={{ margin: '0 8px' }}>Edición</Link>
            <Link to="/acerca" style={{ margin: '0 8px' }}>Nosotros</Link>
          </nav>
        </div>

