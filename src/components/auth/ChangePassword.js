import React, { useState } from 'react';
import { useChangePasswordMutation } from '../../features/auth/apiSlice';
import Sidebar from '../dashboard/SideBar';

const ChangePassword = () => {
  const [credentials, setCredentials] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [message, setMessage] = useState('');
  const [changePassword, { isLoading, isSuccess, isError, error }] = useChangePasswordMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await changePassword({
        old_password: credentials.oldPassword,
        new_password: credentials.newPassword,
      }).unwrap();
      setCredentials({ oldPassword: '', newPassword: '' });
      setMessage('Password changed successfully!');
    } catch (err) {
      console.error('Failed to change password:', err);
      setMessage(error?.data?.message || 'Failed to change password.');
    }
  };

  return (
    <div className="d-flex vh-100 bg-light">
      <Sidebar />
      <div className="container flex-grow-1 p-5">
        <div className="card shadow-lg p-4 border-0 rounded-4">
          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ fontSize: '2.5rem', color: '#4a4a4a' }}>
              Change Password
            </h2>
            <p className="text-muted">Keep your account secure by updating your password.</p>
          </div>

          {/* Form */}
          <form className="row g-4" onSubmit={handleSubmit}>
            {/* Success/Failure Message */}
            {message && (
              <div className={`col-12 text-center fw-bold ${isSuccess ? 'text-success' : 'text-danger'}`}>
                {message}
              </div>
            )}

            {/* Old Password */}
            <div className="col-12">
              <label htmlFor="oldPassword" className="form-label" style={{ fontWeight: '500', color: '#555' }}>
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="form-control"
                placeholder="Enter old password"
                value={credentials.oldPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* New Password */}
            <div className="col-12">
              <label htmlFor="newPassword" className="form-label" style={{ fontWeight: '500', color: '#555' }}>
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="form-control"
                placeholder="Enter new password"
                value={credentials.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-12 text-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg px-5 d-flex justify-content-center align-items-center"
                disabled={isLoading}
                style={{ borderRadius: '8px' }}
              >
                {isLoading ? (
                  <div
                    className="spinner-border text-light"
                    role="status"
                    style={{ width: '1.5rem', height: '1.5rem' }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  'Change Password'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
