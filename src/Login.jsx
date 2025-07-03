import React, { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import logo from './pictures/logo.jpg'; // importa el logo

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(username, password);
    if (ok) {
      navigate('/');
    } else {
      setMsg('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ height: '120px', marginBottom: '12px', borderRadius: '12px' }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: "'Times New Roman', Times, serif" }}>BizBay</span>
      </div>
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
      {msg && <p style={{ marginTop: '16px', color: '#e74c3c' }}>{msg}</p>}
      <div style={{ marginTop: '18px', textAlign: 'center' }}>
        <span>¿No tienes cuenta? </span>
        <Link to="/registro" style={{ color: '#3498db', textDecoration: 'underline', cursor: 'pointer' }}>
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default Login;
