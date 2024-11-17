import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVerifyCodeMutation } from '../../features/auth/apiSlice';
import toast from 'react-hot-toast';

const VerifyCode = () => {
  const [verifyCode, { isLoading }] = useVerifyCodeMutation(); // Access `isLoading` state from the mutation hook
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('userEmail');
    try {
      await verifyCode({ email, code }).unwrap();
      toast.success('Welcome To Household Service Family. Please Login');
      localStorage.removeItem('userEmail');
      navigate('/login');
    } catch (error) {
      setMessage(error.data?.error || 'Verification failed.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container text-center" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4">Verify Your Code</h2>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <input
              type="text"
              name="code"
              className="form-control"
              placeholder="Verification Code"
              value={code}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Verifying...' : 'Verify Code'} {/* Dynamic button text */}
          </button>
          {isLoading && (
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          {message && <p className="mt-3 text-danger text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
