import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useAddOrderItemMutation,
  useClearCartMutation,
  useDecrementCartItemMutation,
  useDeleteCartItemMutation,
  useGetCartQuery,
  useIncrementCartItemMutation,
} from '../../features/auth/apiSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Cart() {
  const session_key = localStorage.getItem('session_key');
  const { data: cart, isLoading, isError, error, refetch } = useGetCartQuery(session_key);
  const [clearCart] = useClearCartMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [addOrderItem, { isLoading: isOrderLoading }] = useAddOrderItemMutation();
  const navigate = useNavigate();
  const [incrementCartItem] = useIncrementCartItemMutation();
  const [decrementCartItem] = useDecrementCartItemMutation();

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    house: '',
    road: '',
    ward: '',
    city: '',
    state: '',
  });
  const [paymentType, setPaymentType] = useState('cash'); // Default to 'cash'

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handleRemoveItem = async (id) => {
    try {
      await deleteCartItem(id).unwrap();
      toast.success('Item removed from cart!');
      refetch();
    } catch (error) {
      toast.error('Failed to remove item from cart.');
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart(session_key).unwrap();
      toast.success('Cart cleared successfully!');
      refetch();
    } catch (error) {
      if (error.status === 404) {
        toast.info('No active cart to clear.');
      } else {
        toast.error('Failed to clear cart.');
      }
    }
  };

  const handleIncrement = async (itemId) => {
    try {
      await incrementCartItem(itemId).unwrap();
      refetch(); 
      toast.success('Quantity increased!');
    } catch (error) {
      toast.error('Failed to increase quantity.');
    }
  };

  const handleDecrement = async (itemId) => {
    try {
      await decrementCartItem(itemId).unwrap();
      refetch(); 
      toast.success('Quantity decreased!');
    } catch (error) {
      toast.error('Failed to decrease quantity.');
    }
  };

  const handleSubmit = async () => {
    const orderData = {
      cart: cart?.id,
      items: cart?.items?.map((item) => ({
        service: item?.service.id,
        quantity: item?.quantity,
      })),
      name: address.name,
      phone: address.phone,
      house: address.house,
      road: address.road,
      ward: address.ward,
      city: address.city,
      state: address.state,
      payment_type: paymentType,
    };

    try {
      await addOrderItem(orderData).unwrap();
      toast.success('Order placed successfully!');
      navigate('/orders');
      refetch();
    } catch (error) {
      toast.error('Failed to place order.');
    }
  };

  const totalServiceFees = cart?.items?.reduce((total, item) => {
    const serviceFee = item.service?.service_fee || 0;
    return total + (serviceFee * item.quantity);
  }, 0);


  if (isLoading) return (
    <div className="spinner-border text-light" role="status" style={{ width: '1.2rem', height: '1.2rem' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  if (isError) {
    const errorMessage =
      error?.data?.detail === 'Cart not found for authenticated user.'
        ? 'Cart not found. Please add items to your cart.'
        : 'Error fetching cart items.';
    return <p className="text-center">{errorMessage}</p>;
  }

  return (
    <div className="container-xxl" style={{ marginTop: '100px' }}>
      <h1 className="mb-4 text-center">Service Cart</h1>
      <div className="row">
        <div className="col-md-8">
          {cart?.items && cart.items.length > 0 ? (
            <>
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Items</th>
                    <th scope="col">Service Fees</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={item.id}>
                      <td className="cart-item d-flex align-items-center">
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}${item.service?.image}`}
                          alt={item?.service?.title}
                          className="rounded mr-3"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                        <span>{item.service?.title}</span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="btn btn-outline-danger btn-sm mx-2"
                          style={{ padding: '5px 15px', fontSize: '18px', borderRadius: '50%' }}
                        >
                          -
                        </button>
                        <span className="fw-bold" style={{ fontSize: '16px', margin: '0 10px' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className="btn btn-outline-success btn-sm mx-2"
                          style={{ padding: '5px 15px', fontSize: '18px', borderRadius: '50%' }}
                        >
                          +
                        </button>
                      </td>

                      <td>{(item.service?.service_fee || 0)} BDT</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cart.items.length > 0 && (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <button
                          onClick={handleClearCart}
                          className="btn btn-warning btn-lg"
                        >
                          Clear Cart
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="card-text fs-4 fw-bold text-dark">
                Total Service Fees: {totalServiceFees} BDT
              </p>
              <hr />
              <h6 className="text-muted mb-3">Address Details</h6>
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Contact Person Name"
                    value={address.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    placeholder="Enter your phone number"
                    value={address.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      id="house"
                      className="form-control"
                      placeholder="Enter house number"
                      value={address.house}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      id="road"
                      className="form-control"
                      placeholder="Enter road number"
                      value={address.road}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      id="ward"
                      className="form-control"
                      placeholder="Ward"
                      value={address.ward}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      id="city"
                      className="form-control"
                      placeholder="Enter your city"
                      value={address.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    id="state"
                    className="form-control"
                    placeholder="State"
                    value={address.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <hr />
                <h6 className="text-muted mb-3">Payment Method</h6>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="cash"
                      checked={paymentType === 'cash'}
                      onChange={handlePaymentTypeChange}
                    />
                    Cash on Delivery
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="credit"
                      checked={paymentType === 'credit'}
                      onChange={handlePaymentTypeChange}
                    />
                    Credit Card
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary btn-lg w-100 mt-3"
                  disabled={isOrderLoading}
                >
                  {isOrderLoading ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
