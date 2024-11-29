import React, { useState } from 'react';
import { useLoginMutation, useGetCartQuery } from '../../features/auth/apiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ handleLogin, refreshCart }) => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation(); 
  const { refetch: refetchCart } = useGetCartQuery();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials).unwrap();
      localStorage.setItem('token', response.token);
      localStorage.setItem('user_id', response.user.id);
      toast.success('Welcome!');
      handleLogin();
      if (refreshCart) await refetchCart();
      // Remove sessionid from cookies
      document.cookie = "sessionid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      // Remove session_key from sessionStorage
      sessionStorage.removeItem('session_key');
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.data?.error || 'Login failed.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container text-center" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
            disabled={isLoading} 
          >
            {isLoading ? (
              <div className="spinner-border text-light" role="status" style={{ width: '1.2rem', height: '1.2rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
          <Link to="/send-verification-code" className="d-block mt-3 link-primary">
            Forgot Password?
          </Link>
          {message && <p className="mt-3 text-danger text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
