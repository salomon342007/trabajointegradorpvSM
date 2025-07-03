import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './pictures/logo.jpg'; // importa el logo

const Registro = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [confirmMsg, setConfirmMsg] = useState('');
  const [generalMsg, setGeneralMsg] = useState('');
  const [msgType, setMsgType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    setUserMsg('');
    setPassMsg('');
    setConfirmMsg('');
    setGeneralMsg('');
    setMsgType('');
    if (!username.trim()) {
      setUserMsg('El campo usuario es obligatorio: rellénalo.');
      hasError = true;
    }
    if (!password.trim()) {
      setPassMsg('El campo contraseña es obligatorio: rellénalo.');
      hasError = true;
    }
    if (!confirm.trim()) {
      setConfirmMsg('Debes confirmar la contraseña.');
      hasError = true;
    }
    if (password && password.length < 6) {
      setPassMsg('La contraseña debe tener al menos 6 caracteres');
      hasError = true;
    }
    if (password && confirm && password !== confirm) {
      setConfirmMsg('Las contraseñas no coinciden');
      hasError = true;
    }
    if (hasError) return;
    // Leer usuarios existentes
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.some(u => u.username === username)) {
      setGeneralMsg('El usuario ya existe. Elige otro nombre.');
      setMsgType('error');
      return;
    }
    usuarios.push({ username, password });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    setGeneralMsg('¡Registro exitoso! Ahora puedes iniciar sesión.');
    setMsgType('exito');
    setTimeout(() => navigate('/login'), 1500);
  };

  useEffect(() => {
    if (userMsg || passMsg || confirmMsg || generalMsg) {
      const timer = setTimeout(() => {
        setUserMsg('');
        setPassMsg('');
        setConfirmMsg('');
        setGeneralMsg('');
        setMsgType('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [userMsg, passMsg, confirmMsg, generalMsg]);

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ height: '120px', marginBottom: '12px', borderRadius: '12px' }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: "'Times New Roman', Times, serif" }}>BizBay</span>
      </div>
      <h2>Registro</h2>
      {generalMsg && (
        <div style={{
          background: msgType === 'error' ? '#fdecea' : '#eafaf1',
          color: msgType === 'error' ? '#e74c3c' : '#27ae60',
          border: `1px solid ${msgType === 'error' ? '#e74c3c' : '#27ae60'}`,
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            style={{ padding: '8px', fontSize: '1rem' }}
          />
          {confirmMsg && (
            <span style={{ color: '#e74c3c', fontSize: '0.95rem', marginTop: '2px', textAlign: 'left' }}>{confirmMsg}</span>
          )}
        </div>
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#3498db',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Registrarse
        </button>
      </form>
      <button
        onClick={() => navigate('/login')}
        style={{
          marginTop: '16px',
          padding: '10px',
          backgroundColor: '#2ecc71',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Volver a Login
      </button>
    </div>
  );
};

export default Registro;