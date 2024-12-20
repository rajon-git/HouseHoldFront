import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import VerifyCode from './components/auth/VerifyCode';
import SendVerificationCode from './components/auth/PasswordVerificationCode';
import ResetPassword from './components/auth/ResetPassword ';
import './App.css';
import ProfileView from './components/auth/ProfileView';
import ProfileUpdate from './components/auth/ProfileUpdate ';
import Homepage from './components/base/Homepage';
import Header from './components/base/Header';
import Footer from './components/base/Footer';
import Services from './components/services/Services';
import ServiceDetail from './components/services/ServiceDetail';
import ProtectedRoute from './components/middleware/ProtectedRoute';
import Cart from './components/Order/Cart';
import NotFound from './components/base/NotFound';
import OrdersPage from './components/Order/OrdersPage';
import ChangePassword from './components/auth/ChangePassword';
import OrderDetailsPage from './components/Order/OrderDetailsPage';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div id="root">
        <Header isAuthenticated={isAuthenticated}/>
        <main>
          <Routes>
            <Route path="/" element={<Homepage isAuthenticated={isAuthenticated}/>} />
            <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/send-verification-code" element={<SendVerificationCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ProfileView />} />} />
            <Route path="/change_password" element={<ChangePassword isAuthenticated={isAuthenticated} element={<ChangePassword />} />} />
            <Route path="/edit-profile" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ProfileUpdate />} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

