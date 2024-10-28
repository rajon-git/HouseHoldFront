import React, { useState } from 'react';
import { useResetPasswordMutation } from '../../features/auth/apiSlice';

const ResetPassword = () => {
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
      // Spread formData to send it as part of the request
      const response = await resetPassword({ email, ...formData }).unwrap();
      setMessage(response.message);
    } catch (error) {
      setMessage(error.data?.error || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{marginBottom: '307px'}}>
      <h2 className="text-center mb-4">Reset Your Password</h2>
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
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        {message && <p className="mt-3 text-danger text-center">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
