import React, { useState } from 'react';
import { useSendVerificationCodeMutation } from '../../features/auth/apiSlice';
import { useNavigate } from 'react-router-dom';

const SendVerificationCode = () => {
  const [sendCode] = useSendVerificationCodeMutation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      setMessage('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await sendCode(email).unwrap();
      setMessage(response.message);
      localStorage.setItem('userEmail', response.email);
      navigate('/reset-password');
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.data?.error || 'Failed to send verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{marginBottom: '360px'}}>
      <h2 className="text-center mb-4">Send Verification Code</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Sending...' : 'Send Verification Code'}
        </button>
        {message && <p className="mt-3 text-danger text-center">{message}</p>}
      </form>
    </div>
  );
};

export default SendVerificationCode;
