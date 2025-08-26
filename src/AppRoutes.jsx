import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Inicio from './Inicio';
import Productos from './Productos';
import Favoritos from './Favoritos';
import Edicion from './Edicion';
import VerDetalles from './VerDetalles';
import NuevoProducto from './NuevoProducto';
import EditarProducto from './EditarProducto';
import Papelera from './Papelera';
import AcercaDe from './AcercaDe';
import Carrito from './Carrito';
import NotFound from './NotFound';
import Login from './Login';
import Registro from './Registro';
import AdminRoute from './routes/AdminRoute';

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Inicio />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/acerca" element={<AcercaDe />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/product/:id" element={<VerDetalles />} />

      {/* Solo las rutas de admin van protegidas */}
      <Route element={<AdminRoute />}>
        <Route path="/edicion" element={<Edicion />} />
        <Route path="/nuevo" element={<NuevoProducto />} />
        <Route path="/editar/:id" element={<EditarProducto />} />
        <Route path="/papelera" element={<Papelera />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
