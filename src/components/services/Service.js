import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

const Service = ({ service }) => {
    const { id, is_available, service_fee, category, description, image, title } = service;

    return (
        <div className="card shadow-lg service-card">
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    {description.split(' ').slice(0, 10).join(' ')}
                    {description.split(' ').length > 10 ? '...' : ''}
                </p>
                <Link to={`/services/${id}`} className="btn btn-primary">Details</Link>
            </div>
        </div>
    );
};

export default Service;
