import React from 'react';

const AcercaDe = () => (
  <div style={{ padding: '20px' }}>
    <h2>Nosotros</h2>
    <p>Esta SPA de gestión de productos está hecha con React, Vite, React Router  Context API.</p>
    <p>Equipo:</p>
    <ul>
      <li>Desarrollador A - rol/email</li>
      <li>Desarrollador B - rol/email</li>
    </ul>
    <p>Funcionalidades:</p>
    <ul>
      <li>Listado de productos</li>
      <li>Agregar / Editar / Borrar (con papelera y restauración)</li>
      <li>Marcar productos como favoritos</li>
      <li>Detalle de producto con imagen vía URL</li>
      <li>Autenticación básica (login/logout)</li>
    </ul>
    <p>Incluye tus carpetas si quieres AQUI¡.</p>
  </div>
);
export default AcercaDe;