import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'; 
import AdminDashboard from './pages/Tournament_Admin/AdminDashboard';
import AddTournament from './pages/Tournament_Admin/AddTournament'; 
import GuestDashboard from './pages/guest/GuestDashboard';
import AssignCaptain from './pages/Tournament_Admin/AssignCaptain';
import BrowsePlayerHighestGoal from './pages/guest/BrowsePlayerHighestGoal';
import ApprovePlayer from './pages/Tournament_Admin/ApprovePlayer'; 
import AddTeam from './pages/Tournament_Admin/AddTeam';
import ScheduleMatch from './pages/Tournament_Admin/ScheduleMatch';
import EnterMatchResults from './pages/Tournament_Admin/EnterMatchResults';
import CardManagement from './pages/Tournament_Admin/CardManagement';
import Fields from './pages/Tournament_Admin/Fields';
import TeamMembers from './pages/guest/TeamMembers';
import MatchResults from './pages/guest/MatchResults';
import RedCards from './pages/guest/RedCards';

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
          <Route path="/admin/approve-player" element={<ApprovePlayer />} />
          <Route path="/admin/add-team" element={<AddTeam />} />
          <Route path="/admin/schedule-match" element={<ScheduleMatch />} />
          <Route path="/admin/enter-results" element={<EnterMatchResults />} />
          <Route path="/admin/card-management" element={<CardManagement />} />
          <Route path="/admin/fields" element={<Fields />} />
          <Route path="/guest/teams-players" element={<TeamMembers />} /> 
          <Route path="/guest/match-results" element={<MatchResults />} /> 
          <Route path="/guest/red-cards" element={<RedCards />} /> 

          

        </Routes>
      </div>
    </Router>
  );
}

export default App;

