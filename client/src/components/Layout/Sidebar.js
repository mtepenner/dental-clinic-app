import React from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Staff Portal</h3>
      </div>
      <nav className="sidebar-nav">
        {/* NavLink automatically adds an "active" class when the route matches */}
        <NavLink to="/staff/dashboard" className="sidebar-link">
          Daily Dashboard
        </NavLink>
        <NavLink to="/staff/patients" className="sidebar-link">
          Patient Directory
        </NavLink>
        <NavLink to="/staff/settings" className="sidebar-link">
          Clinic Settings
        </NavLink>
      </nav>
    </aside>
  );
}
