import React from 'react';

const AcercaDe = () => (
  <div style={{ padding: '20px' }}>
    <h2>Nosotros</h2>
    <p>Esta SPA de gestión de productos está hecha con React, Vite, React Router y Context API.</p>
    <p>Equipo:</p>
    <ul>
      <li>Desarrollador A - rol/email</li>
      <li>Desarrollador B - rol/email</li>
      {/* Agrega más miembros si aplica */}
    </ul>
    <p>Funcionalidades:</p>
    <ul>
      <li>Listado de productos</li>
      <li>Agregar / Editar / Borrar (con papelera y restauración)</li>
      <li>Marcar productos como favoritos</li>
      <li>Detalle de producto con imagen vía URL</li>
      <li>Autenticación básica (login/logout)</li>
    </ul>
    <p>Puedes incluir aquí capturas de pantalla o enlaces si lo deseas.</p>
  </div>
);

export default AcercaDe;
