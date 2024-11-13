import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAddCartItemMutation, useGetServiceQuery } from '../../features/auth/apiSlice';
import '../../App.css';
import toast from 'react-hot-toast';

const ServiceDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: service, isLoading, isError, error } = useGetServiceQuery(id);
    
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');

    const [addCartItem] = useAddCartItemMutation();

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (reviewText) {
            setReviews([...reviews, reviewText]);
            setReviewText('');
        }
    };
    const handleAddToCart = async (serviceId, quantity) => {
        try {
          const sessionKey = sessionStorage.getItem('sessionid');
          const payload = {
            service_id: service.id,
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

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        console.error('Error details:', error); 
        return <p>Error fetching service details: {error.message}</p>;
    }

    if (!service) {
        return <p>No service found.</p>;
    }

    return (
        <div className="container-xxl" style={{ marginTop: '90px' }}>
            <h2 className="text-center mb-4">{service.title}</h2>
            <div className="row">
                <div className="col-md-6">
                    <img src={service?.image} alt={service?.title} className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <h5>Description</h5>
                    <p>{service?.description}</p>
                    <h5>Service Fee</h5>
                    <p>${service?.service_fee}</p>
                    <h5>Availability</h5>
                    <p>{service?.is_available ? "Available" : "Not Available"}</p>
                    <button className="btn btn-primary mt-3" onClick={handleAddToCart}>Add to cart</button>
                    <button className="btn btn-primary mx-4 mt-3">
                        <Link className='text-white text-decoration-none' to="/services">
                            View Services
                        </Link>
                    </button>
                </div>
            </div>

            <div className="mt-5">
                <h3>Reviews</h3>
                <form onSubmit={handleReviewSubmit} className="review-form mb-4">
                    <textarea 
                        value={reviewText} 
                        onChange={(e) => setReviewText(e.target.value)} 
                        placeholder="Write your review here..."
                        className="form-control" 
                        rows="4"
                        required
                    />
                    <button type="submit" className="btn btn-primary mt-2">Submit Review</button>
                </form>

                <div className="reviews">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review-card mb-2">
                                <p>{review}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
