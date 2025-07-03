import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Busca el usuario en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const userFound = usuarios.find(u => u.username === username && u.password === password);
    if (userFound) {
      setUser({ username });
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


