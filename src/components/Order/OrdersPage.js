import React from 'react';
import { useUserOrdersQuery } from '../../features/auth/apiSlice';
import Sidebar from '../dashboard/SideBar';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const { data: orders, error, isLoading } = useUserOrdersQuery();

  return (
    <div className="d-flex vh-100 bg-light">
      <Sidebar/>
      <div className="container flex-grow-1 p-5">
        <div className="card shadow-lg p-4 border-0 rounded-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ fontSize: '2.5rem', color: '#4a4a4a' }}>
              Your Orders
            </h2>
          </div>

          {isLoading && (
            <div className="d-flex justify-content-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center">
              There was an error fetching your orders.
            </div>
          )}

          {orders?.length === 0 && (
            <div className="alert alert-info text-center">
              You have no orders yet.
            </div>
          )}

          {orders?.length > 0 && (
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge ${
                            order.status === 'completed'
                              ? 'bg-success'
                              : order.status === 'pending'
                              ? 'bg-warning'
                              : 'bg-danger'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>{order.total_price} BDT</td>
                      <td>
                      <Link
                        to={`/orders/${order.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default OrdersPage;
