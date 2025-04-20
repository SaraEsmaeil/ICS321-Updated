import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Login.css';
import bgImage from '../assets/stadium-bg.png'; 


import { FaUser, FaLock, FaArrowLeft, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = new URLSearchParams(location.search).get('role');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'tournament' && password === 'tournament') {
      navigate(role === 'admin' ? '/admin' : '/guest');
    } else {
      setError('Invalid credentials. Try again.');
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <div className="login-overlay">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-header">
          <img src={require('../assets/LogoBlue.png')} alt="Tournament Logo" className="login-icon" />

            <h2>Tournament Hub</h2>
            <span>{role === 'admin' ? 'Admin Login' : 'Guest Login'}</span>
          </div>

          <div className="input-group">
  <span className="input-icon">
    <FaUser />
  </span>
  <input
    type="Username"
    placeholder="Enter your username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    autoComplete="off"
    required
  />
</div>

<div className="input-group">
  <span className="input-icon">
    <FaLock />
  </span>
  <input
    type="password"
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    autoComplete="off"
    required
  />
</div>


          <button type="submit" className="login-btn">
            <FaSignInAlt style={{ marginRight: '6px' }} /> Login
          </button>

          {error && <p className="error">{error}</p>}

          <Link to="/" className="back-link">
            <FaArrowLeft /> Back to Home
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
