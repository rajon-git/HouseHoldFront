import React, { useState } from 'react';
import { useRegisterMutation } from '../../features/auth/apiSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData).unwrap();
      toast.success('Registration successful! Please check your email to verify your account.'); 
      localStorage.setItem('userEmail', response.email);
      setTimeout(() => {
        navigate('/verify-code');
      }, 2000);
    } catch (error) {
      toast.error(error.data?.error || 'Registration failed.'); 
    }
  };

  return (
    <>
    <div className="container" style={{ marginTop: '100px' }}>
      <h2 className="text-center mb-4">Register</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
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
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="confirm_password"
                className="form-control"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
