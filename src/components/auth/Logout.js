import React from 'react';
import { useLogoutMutation } from './apiSlice'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // Call logout API
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/'); // Redirect to login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
