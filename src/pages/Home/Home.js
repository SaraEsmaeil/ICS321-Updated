import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import bgImage from '../assets/stadium-bg.png'; 
import { FaLock, FaUser } from 'react-icons/fa';
import logo from '../assets/LogoHome.png'; 


const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: '#fff',
      }}
    >
      <div className="overlay">
        <div className="home-content">
        <img src={logo} alt="KFUPM Logo" className="home-logo" />
          <h1>
            <span className="logo-icon"></span> Tournament Hub
          </h1>
          <p>Manage and view university soccer tournaments in one place.</p>
          <div className="button-group">
          <div className="button-group">
  <button className="btn-admin" onClick={() => navigate('/login?role=admin')}>
    <FaLock /> Admin Login
  </button>
  <button className="btn-guest" onClick={() => navigate('/guest')}>
    <FaUser /> Guest View
  </button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
