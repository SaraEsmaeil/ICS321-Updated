import React from 'react';
import SidebarNav from '../../components/AdminSidebarNav';
import AdminStatsCards from '../../components/AdminStatsCards';
import RecentTournaments from '../../components/RecentTournaments';
import MatchSummary from '../../components/MatchSummary';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-layout">
      <SidebarNav />
      <main className="admin-main">
        <AdminStatsCards />
        <RecentTournaments />
        <MatchSummary />
      </main>
    </div>
  );
};

export default AdminDashboard;
