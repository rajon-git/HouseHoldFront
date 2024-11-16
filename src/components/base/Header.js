import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../App.css";
import { Dropdown } from 'react-bootstrap';
import { BsCartCheck } from "react-icons/bs";
import { useGetCartQuery } from '../../features/auth/apiSlice';
import { CgProfile } from "react-icons/cg";

export default function Header({ isAuthenticated, handleLogout }) {
  const [cartItemCount, setCartItemCount] = useState(0);
  
  const { data: cartData } = useGetCartQuery();

  useEffect(() => {
    if (cartData && cartData.items) {
      setCartItemCount(cartData?.items?.length);
    }
  }, [cartData]);

  const user = localStorage.getItem('user_id');

console.log(user?.username)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container-xxl">
        <Link className="navbar-brand" to="/">Brand</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle className="nav-link" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', color: '#ffffff' }}>
                  <CgProfile style={{ fontSize: '1.5rem' }}/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {isAuthenticated ? (
                    <>
                      <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/orders">My Orders</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
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
        </div>
      </div>
    </nav>
  );
};
