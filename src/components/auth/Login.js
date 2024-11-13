// import React, { useState } from 'react';
// import { useLoginMutation } from '../../features/auth/apiSlice';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Login = ({ handleLogin }) => {
//   const navigate = useNavigate();
//   const [login] = useLoginMutation();
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: '',
//   });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await login(credentials).unwrap();
//       console.log('Login response:', response); 
  
    
//       localStorage.setItem('user_id', response.user.id);
//       localStorage.setItem('token', response.token); 
//       toast.success('Welcome!');
//       handleLogin(); 
//       navigate('/profile');
//     } catch (error) {
//       console.error('Login error:', error); 
//       setMessage(error.data?.error || 'Login failed.'); 
//     }
//   };
  
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await login(credentials).unwrap();
//   //     localStorage.setItem('token', response.token); 
//   //     localStorage.setItem('user_id', response.user.id);
//   //     setMessage('Login successful!');
//   //     handleLogin();
//   //     navigate('/profile');
//   //   } catch (error) {
//   //     setMessage(error.data.error || 'Login failed.');
//   //   }
//   // };

//   return (
//     <div className="container w-50" style={{ marginTop: '100px' }}>
//       <h2 className="text-center mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//         <div className="mb-3">
//           <input
//             type="email"
//             name="email"
//             className="form-control"
//             placeholder="Email"
//             value={credentials.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             placeholder="Password"
//             value={credentials.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="d-flex justify-content-between align-items-center">
//           <button type="submit" className="btn btn-primary w-45">
//             Login
//           </button>
//           <Link to="/send-verification-code" className="link-primary">
//             Forgot Password?
//           </Link>
//         </div>
//         {message && <p className="mt-3 text-danger text-center">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useLoginMutation, useGetCartQuery } from '../../features/auth/apiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ handleLogin, refreshCart }) => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
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
      console.log('Login response:', response);
  
      localStorage.setItem('user_id', response.user.id);
      localStorage.setItem('token', response.token);
      toast.success('Welcome!');

      handleLogin();

      // Trigger cart refetch after login
      if (refreshCart) await refetchCart();

      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.data?.error || 'Login failed.');
    }
  };

  return (
    <div className="container w-50" style={{ marginTop: '100px' }}>
      <h2 className="text-center mb-4">Login</h2>
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
        <div className="d-flex justify-content-between align-items-center">
          <button type="submit" className="btn btn-primary w-45">
            Login
          </button>
          <Link to="/send-verification-code" className="link-primary">
            Forgot Password?
          </Link>
        </div>
        {message && <p className="mt-3 text-danger text-center">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
