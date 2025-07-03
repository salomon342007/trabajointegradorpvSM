import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import logo from './pictures/logo.jpg'; // importa el logo

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [generalMsg, setGeneralMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    setUserMsg('');
    setPassMsg('');
    setGeneralMsg('');
    if (!username.trim()) {
      setUserMsg('El campo usuario es obligatorio: rellénalo.');
      hasError = true;
    }
    if (!password.trim()) {
      setPassMsg('El campo contraseña es obligatorio: rellénalo.');
      hasError = true;
    }
    if (hasError) return;
    const ok = login(username, password);
    if (ok) {
      setUserMsg('');
      setPassMsg('');
      setGeneralMsg('');
      navigate('/');
    } else {
      setGeneralMsg('Usuario o contraseña incorrectos');
    }
  };

  useEffect(() => {
    if (userMsg || passMsg || generalMsg) {
      const timer = setTimeout(() => {
        setUserMsg('');
        setPassMsg('');
        setGeneralMsg('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [userMsg, passMsg, generalMsg]);

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ height: '120px', marginBottom: '12px', borderRadius: '12px' }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: "'Times New Roman', Times, serif" }}>BizBay</span>
      </div>
      <h2>Login</h2>
      {generalMsg && (
        <div style={{
          background: '#fdecea',
          color: '#e74c3c',
          border: '1px solid #e74c3c',
          borderRadius: '4px',
          padding: '10px',
          marginBottom: '12px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>{generalMsg}</div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <input
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ padding: '8px', fontSize: '1rem' }}
          />
          {userMsg && (
            <span style={{ color: '#e74c3c', fontSize: '0.95rem', marginTop: '2px', textAlign: 'left' }}>{userMsg}</span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '8px', fontSize: '1rem' }}
          />
          {passMsg && (
            <span style={{ color: '#e74c3c', fontSize: '0.95rem', marginTop: '2px', textAlign: 'left' }}>{passMsg}</span>
          )}
        </div>
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
