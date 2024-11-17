import React, { useState } from 'react';
import { useSendVerificationCodeMutation } from '../../features/auth/apiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
      toast.success('Verification code sent successfully!');
      navigate('/reset-password');
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.data?.error || 'Failed to send verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container text-center" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4">Send Verification Code</h2>
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
                <span className="ms-2">Sending...</span>
              </>
            ) : (
              'Submit'
            )}
          </button>
          {message && <p className="mt-3 text-danger text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SendVerificationCode;
