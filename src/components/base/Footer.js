import React from 'react'
import { Link } from 'react-router-dom'
import "../../App.css";

export default function Footer() {
  return (
    <div>
        <footer className="text-center mt-auto" style={{ backgroundColor: '#343a40', color: '#ffffff', padding: '20px 0' }}>
            <div className="container">
                <p style={{ margin: 0 }}>&copy; 2024 Your Company. All rights reserved.</p>
                <div className="social-icons">
                    <Link to="#">Facebook</Link>
                    <Link to="#">Twitter</Link>
                    <Link to="#">Instagram</Link>
                </div>
            </div>
        </footer>
    </div>
  )
}
