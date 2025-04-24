import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'; 
import AdminDashboard from './pages/Tournament_Admin/AdminDashboard';
import AddTournament from './pages/Tournament_Admin/AddTournament'; 
import GuestDashboard from './pages/guest/GuestDashboard';
import AssignCaptain from './pages/Tournament_Admin/AssignCaptain';
import BrowsePlayerHighestGoal from './pages/guest/BrowsePlayerHighestGoal';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/admin" element={<AdminDashboard />} /> 
          <Route path="/admin/add-tournament" element={<AddTournament />} />
          <Route path="/admin/assign-captain" element={<AssignCaptain />} />
          <Route path="/guest" element={<GuestDashboard />} />
          <Route path="/guest/top-scorers" element={<BrowsePlayerHighestGoal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

