import React, { useEffect, useState } from 'react';
import { useUserOrdersQuery } from '../../features/auth/apiSlice';

const OrdersPage = () => {
  const { data: orders, error, isLoading } = useUserOrdersQuery();

  console.log(orders)
  
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Your Orders</h1>

      {/* Loading state */}
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="alert alert-danger text-center">
          There was an error fetching your orders.
        </div>
      )}

      {/* No orders available */}
      {orders?.length === 0 && (
        <div className="alert alert-info text-center">
          You have no orders yet.
        </div>
      )}

      {/* Orders list */}
      <div className="row">
        {orders?.map(order => (
          <div key={order.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Order ID: {order.id}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {new Date(order.created_at).toLocaleDateString()}
                </h6>
                <p className="card-text">
                  <strong>Status:</strong> 
                  <span
                    className={`badge ${
                      order.status === 'completed'
                        ? 'badge-success'
                        : order.status === 'pending'
                        ? 'badge-warning'
                        : 'badge-danger'
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="card-text">
                  <strong>Total Price:</strong> ${order.total_price}
                </p>
                <a href={`/order/${order.id}`} className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
