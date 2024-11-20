import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../features/auth/apiSlice';

const Sidebar = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); 
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    navigate('/login'); 
    window.location.reload();
  };

  return (
    <div className="d-flex vh-100 bg-light">
      <div className="sidebar bg-gradient p-4" style={{ width: '250px', marginTop: '60px', height: '100vh', boxShadow: '2px 0 15px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="text-center text-black mb-4">Dashboard</h3>
        <ul className="nav flex-column">
            <li className="nav-item mb-3">
                <Link
                to="/orders"
                className="text-black d-flex align-items-center text-decoration-none hover-bg-color"
                >
                <i className="fas fa-box me-2"></i> My Orders
                </Link>
            </li>
            <li className="nav-item mb-3">
                <Link
                to="/profile"
                className="text-black d-flex align-items-center text-decoration-none hover-bg-color"
                >
                <i className="fas fa-user me-2"></i> Profile
                </Link>
            </li>
            <li className="nav-item mb-3">
                <Link
                to="/change_password"
                className="text-black d-flex align-items-center text-decoration-none hover-bg-color"
                >
                <i className="fas fa-user me-2"></i> Change Password
                </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                to="/logout"
                className="text-black d-flex align-items-center text-decoration-none hover-bg-color"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-2"></i> Logout
              </Link>
            </li>
        </ul>
      </div>

    </div>
  );
};

export default Sidebar;
