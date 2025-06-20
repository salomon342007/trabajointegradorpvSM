import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductosProvider } from './context/ProductosContext';
import AppRoutes from './AppRoutes';
import './App.css'; // estilos de navegación, main, etc.

function App() {
  return (
    <AuthProvider>
      <ProductosProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ProductosProvider>
    </AuthProvider>
  );
}

export default App;