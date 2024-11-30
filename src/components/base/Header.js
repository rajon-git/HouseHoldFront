import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../App.css";
import { BsCartCheck } from "react-icons/bs";
import { useGetCartQuery } from '../../features/auth/apiSlice';
import { CgProfile } from "react-icons/cg";

export default function Header({ isAuthenticated }) {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { data: cartData, refetch  } = useGetCartQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  useEffect(() => {
    if (cartData) {
      if (cartData.total_items !== undefined) {
        setCartItemCount(cartData.total_items); 
      } else if (cartData.items) {
        const count = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartItemCount(count);
      }
    }
  }, [cartData]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/services?search=${searchTerm.trim()}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container-xxl">
        <Link className="navbar-brand" to="/">Household</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <Link to="/profile" className="nav-link text-white">
                  <CgProfile style={{ fontSize: '1.5rem', color: 'white' }} />
                </Link>
              ) : (
                <div className="d-flex align-items-center">
                  <Link to="/login" className="nav-link text-white fs-7">
                    Login
                  </Link>
                  <span className="text-white fs-5">|</span>
                  <Link to="/register" className="nav-link text-white fs-7">
                    Register
                  </Link>
                </div>
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <BsCartCheck style={{ fontSize: '1.5rem' }} />
                  {cartItemCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.6rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          </ul>
          <form className="d-flex ms-3" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search services"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
