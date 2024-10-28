import React from 'react';
import { Link } from 'react-router-dom';
import "../../App.css";
import { Dropdown } from 'react-bootstrap';

export default function Header({ isAuthenticated, handleLogout }) {
    console.log("Is Authenticated in Header:", isAuthenticated);
 
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
                  Profile
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {isAuthenticated ? (
                    <>
                      <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
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
              <Link className="nav-link" to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
