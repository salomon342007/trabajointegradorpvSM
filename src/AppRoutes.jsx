import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import Login from './Login';
import Registro from './Registro';
import AdminRoute from './routes/AdminRoute';
import Carrito from './Carrito';
import NotFound from './NotFound';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/registro" element={<Registro />} />
    <Route element={<AdminRoute />}>
    <Route element={<Layout />}>
    <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/edicion" element={<Edicion />} />
        <Route path="/nuevo" element={<NuevoProducto />} />
        <Route path="/editar/:id" element={<EditarProducto />} />
        <Route path="/product/:id" element={<VerDetalles />} />
        <Route path="/papelera" element={<Papelera />} />
        <Route path="/acerca" element={<AcercaDe />} />
        <Route path="/carrito" element={<Carrito />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
