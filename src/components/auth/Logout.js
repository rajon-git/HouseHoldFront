import React from 'react';
import { useLogoutMutation } from './apiSlice'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); 
    localStorage.removeItem('token'); 
    localStorage.removeItem('user_id'); 
    navigate('/'); 
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
