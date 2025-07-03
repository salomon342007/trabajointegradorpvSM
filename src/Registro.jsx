import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './pictures/logo.jpg'; // importa el logo

const Registro = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim() || !confirm.trim()) {
      setMsg('Completa todos los campos');
      return;
    }
    if (password.length < 6) {
      setMsg('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (password !== confirm) {
      setMsg('Las contraseñas no coinciden');
      return;
    }

    // Leer usuarios existentes
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    // Verificar si el usuario ya existe
    if (usuarios.some(u => u.username === username)) {
      setMsg('El usuario ya existe. Elige otro nombre.');
      return;
    }
    // Agregar nuevo usuario
    usuarios.push({ username, password });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    setMsg('¡Registro exitoso! Ahora puedes iniciar sesión.');
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ height: '120px', marginBottom: '12px', borderRadius: '12px' }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: "'Times New Roman', Times, serif" }}>BizBay</span>
      </div>
      <h2>Registro</h2>
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
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
          style={{ padding: '8px', fontSize: '1rem' }}
        />
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
      {msg && <p style={{ marginTop: '16px', color: msg.includes('exitoso') ? '#2ecc71' : '#e74c3c' }}>{msg}</p>}
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