import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDeleteCartItemMutation, useGetCartQuery } from '../../features/auth/apiSlice';

export default function Cart() {
  const { data: cartItems = [], isLoading, isError, refetch } = useGetCartQuery(); 
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [couponCode, setCouponCode] = useState('');
  const validCoupons = ["DISCOUNT10", "FREESHIP"];
  const discountRate = 0.1; // 10% discount for example

  const handleRemoveItem = async (id) => {
    try {
      await deleteCartItem(id).unwrap();
      toast.success('Item removed from cart!');
      refetch(); // Refetch cart items to get the latest state
    } catch (error) {
      toast.error('Failed to remove item from cart.');
    }
  };

  const handleApplyCoupon = () => {
    if (validCoupons.includes(couponCode)) {
      toast.success(`Coupon ${couponCode} applied!`);
    } else {
      toast.error('Invalid coupon code.');
    }
  };

  const total = cartItems.reduce((acc, item) => acc + (item.service?.service_fee || 0) * item.quantity, 0);
  const discount = validCoupons.includes(couponCode) ? total * discountRate : 0;
  const finalTotal = total - discount;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching cart items.</p>;
  }

  return (
    <div className="container-xxl mt-5">
      <h1 className="mb-4">Service Cart</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">Your cart is empty.</td>
            </tr>
          ) : (
            cartItems.map(item => (
              <tr key={item.id}>
                <td className="cart-item">
                  <img src={item?.service?.image || "https://via.placeholder.com/100"} alt={item.service?.title} style={{ width: '100px' }} />
                  <span>{item.service?.title}</span>
                </td>
                <td>${(item.service?.service_fee || 0).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="row">
        <div className="col-md-8">
          <h4>Coupon Code</h4>
          <div className="input-group mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter coupon code" 
              value={couponCode} 
              onChange={(e) => setCouponCode(e.target.value)} 
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={handleApplyCoupon}>Apply</button>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-right">
          <h4>Total: ${(finalTotal).toFixed(2)}</h4>
          <button className="btn btn-success btn-lg">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
