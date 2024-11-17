import React, { useState } from 'react';
import { useResetPasswordMutation } from '../../features/auth/apiSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const navigate = useNavigate()
  const [resetPassword] = useResetPasswordMutation();
  const [formData, setFormData] = useState({
    code: '',
    new_password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('userEmail');
    setMessage('');
    setLoading(true);

    try {
      const response = await resetPassword({ email, ...formData }).unwrap();
      navigate('/login')
      toast.success(response.message)
    } catch (error) {
      toast.error(error.data?.error || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container text-center" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <input
              type="text"
              name="code"
              className="form-control"
              placeholder="Verification Code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="new_password"
              className="form-control"
              placeholder="New Password"
              value={formData.new_password}
              onChange={handleChange}
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-100 d-flex justify-content-center align-items-center" 
            disabled={loading}
            style={{ position: 'relative' }}
          >
            {loading ? (
              <>
                <div className="spinner-border text-light" role="status" style={{ width: '1.2rem', height: '1.2rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span className="ms-2">Resetting...</span>
              </>
            ) : (
              'Reset Password'
            )}
          </button>
          {message && <p className="mt-3 text-danger text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
