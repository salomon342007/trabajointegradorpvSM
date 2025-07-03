import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Busca el usuario en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const userFound = usuarios.find(u => u.username === username && u.password === password);
    if (userFound) {
      // Si el usuario es 'admin', es administrador
      const isAdmin = userFound.username === 'admin';
      setUser({ username: userFound.username, isAdmin });
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  // isAdmin ahora depende del campo en el usuario
  const isAdmin = user && user.isAdmin;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};


