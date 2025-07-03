import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Recuperar usuario de localStorage al iniciar
  useEffect(() => {
    const userLS = JSON.parse(localStorage.getItem('user'));
    if (userLS) setUser(userLS);
  }, []);

  const login = (username, password) => {
    // Busca el usuario en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const userFound = usuarios.find(u => u.username === username && u.password === password);
    if (userFound) {
      // Si el usuario es 'admin', es administrador
      const isAdmin = userFound.username === 'admin';
      const userObj = { username: userFound.username, isAdmin };
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // isAdmin ahora depende del campo en el usuario
  const isAdmin = user && user.isAdmin;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};


