import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAddCartItemMutation, useCreateReviewMutation, useGetReviewsByServiceQuery, useGetServiceQuery } from '../../features/auth/apiSlice';
import '../../App.css';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';

const ServiceDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: service, isLoading, isError, error } = useGetServiceQuery(id);
    const { data: reviews } = useGetReviewsByServiceQuery(id);

    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [rateColor, setRateColor] = useState(null);
    const [createReview] = useCreateReviewMutation();
    const [addCartItem] = useAddCartItemMutation();
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddToCart = async () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate review text and rating before submission
        if (!reviewText || rating <= 0) {
            setErrorMessage('Please enter both a review and a rating.');
            return;
        }

        try {
            const reviewData = {
                service: service.id,
                comment: reviewText,
                rating: rating,
            };

            await createReview(reviewData).unwrap();
            toast.success('Review submitted successfully!');
            setReviewText('');
            setRating(0); // Reset rating after submission
        } catch (error) {
            toast.error('Login required');
            navigate("/login")
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
                    <button className="btn btn-secondary mx-4 mt-3">
                        <Link className="text-white text-decoration-none" to="/services">
                            View Services
                        </Link>
                    </button>
                </div>
            </div>

            <div className=" my-2">
                <div className="row">
                    <div className="col-md-6">
                        
                        <h3>Leave a Review</h3>
                        <form onSubmit={handleSubmit} className="review-form">
                            <div className="star-rating mt-3">
                                <p>Rate the service:</p><br />
                                <div className="stars">
                                    {[...Array(5)].map((star, index) => {
                                        const currentRate = index + 1;
                                        return (
                                            <FaStar
                                                key={currentRate}
                                                size={30}
                                                color={currentRate <= (rateColor || rating) ? "yellow" : "grey"}
                                                onClick={() => setRating(currentRate)}
                                                style={{ cursor: "pointer", marginRight: "10px" }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="form-group">
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Write your review here..."
                                    className="form-control"
                                    rows="2"
                                    required
                                />
                            </div>

                            {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}

                            <button type="submit" className="btn btn-primary mt-3">
                                Submit Review
                            </button>
                        </form>

                        <div className=''>
                            <h3>Reviews for Service</h3>
                            <ul className="list-group">
                                {reviews && reviews?.map((review) => (
                                    <li key={review.id} className="list-group-item">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                {[...Array(5)].map((star, index) => {
                                                    return (
                                                        <FaStar
                                                            key={index}
                                                            size={15}
                                                            color={index < review.rating ? "yellow" : "grey"}
                                                            style={{ marginRight: "5px" }}
                                                        />
                                                    );
                                                })}
                                                <p>
                                                    {review?.user?.first_name} {review?.user?.last_name}
                                                </p>
                                            </div>
                                            
                                            <span>{new Date(review.created).toLocaleDateString()}</span>
                                        </div>
                                        <p>{review?.comment}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                    </div>
                    <div className="col-md-6">
                        Hello
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ServiceDetail;
