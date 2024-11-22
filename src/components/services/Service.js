import React from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAddCartItemMutation } from '../../features/auth/apiSlice';
import { toast } from 'react-toastify';

const Service = ({ service }) => {
    const navigate =  useNavigate();
    const { id, is_available, service_fee, category, description, image, title } = service;
    const [addCartItem] = useAddCartItemMutation();

    const handleAddToCart = async () => {
        try {
            const sessionKey = sessionStorage.getItem('sessionid');
            const payload = {
                service_id: id,
                quantity: 1,
                session_key: sessionKey || undefined,
            };
            const response = await addCartItem(payload).unwrap();
            if (response.session_key) {
                sessionStorage.setItem('session_key', response.session_key);
            }

            toast.success('Item added to cart!');
            navigate('/cart');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add item to cart.');
        }
    };

    return (
        <div className="card shadow-lg service-card">
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                   {service_fee} BDT
                </p>
                
            </div>
            <div className='d-flex justify-content-between'>
                <button onClick={handleAddToCart} className="btn btn-primary">
                    Add to Cart
                </button>
                <Link to={`/services/${id}`} className="btn btn-primary">Details</Link>
            </div>
        </div>
    );
};

export default Service;
