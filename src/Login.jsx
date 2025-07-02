import React, { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    navigate('/'); // al login redirige a Inicio
  };
  return (
    <div style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ padding: '8px', fontSize: '1rem' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: '8px', fontSize: '1rem' }}
        />
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#2ecc71',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
