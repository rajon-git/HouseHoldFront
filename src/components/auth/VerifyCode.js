import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVerifyCodeMutation } from '../../features/auth/apiSlice';

const VerifyCode = () => {
  const [verifyCode] = useVerifyCodeMutation();
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
      setMessage('Verification successful!');
      localStorage.removeItem('userEmail');
      navigate('/login'); 
    } catch (error) {
      setMessage(error.data.error || 'Verification failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Verify Your Code</h2>
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
        <button type="submit" className="btn btn-primary w-100">
          Verify Code
        </button>
        {message && <p className="mt-3 text-danger text-center">{message}</p>}
      </form>
    </div>
  );
};

export default VerifyCode;
