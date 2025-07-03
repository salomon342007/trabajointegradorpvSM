import React from 'react';
import logo from './pictures/logo.jpg'; // importa el logo

const Inicio = () => {
    return (
    <div style={{ textAlign: 'center', marginTop: '40px', fontFamily: "'Times New Roman', Times, serif" }}>
      <img src={logo} alt="Logo" style={{ height: '200px', marginBottom: '24px', borderRadius: '16px' }} />
      <h1 style={{ fontFamily: "'Times New Roman', Times, serif" }}>Bienvenido a BizBay</h1>
      <p>Explora nuestros productos, marca favoritos y gestiona tu inventario.</p>
      <p>Usa el menú para navegar: Productos, Mis Favoritos, Edición o Nosotros.</p>
    </div>
  );
};

export default Inicio;