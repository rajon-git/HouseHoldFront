import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/apiSlice';

const Logout = () => {
  const [logout] = useLoginMutation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = async () => {
    await logout(); 
    localStorage.removeItem('token');
    setIsAuthenticated(false); 
    navigate('/login'); 
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
