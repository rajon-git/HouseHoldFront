import React from 'react';
import '../../App.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Oops! The page you are looking for does not exist.</p>
            <a href="/" className="not-found-link">Go back to Homepage</a>
            <img src="https://www.pngmart.com/files/7/404-Error-Page-PNG-Transparent-Image.png" alt="Not Found" className="not-found-image" />

        </div>
    );
};

export default NotFound;
