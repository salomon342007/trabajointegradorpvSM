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
import Login from './Login';
import AdminRoute from './routes/AdminRoute';
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<AdminRoute />}>