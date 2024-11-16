import React from 'react';
import { useUserOrdersQuery } from '../../features/auth/apiSlice';

const OrdersPage = () => {
  const { data: orders, error, isLoading } = useUserOrdersQuery();

  console.log(orders);

  return (
    <div className="container" style={{ marginTop: '70px' }}>
      <h1 className="text-center mb-4">Your Orders</h1>

      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

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

      {/* Orders Table */}
      {orders?.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
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
              {orders?.map((order) => (
                <tr key={order?.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                  <span className={
                    `badge ${order.status === 'completed' ? 
                    'badge-completed' : order.status === 'pending' ? 
                    'badge-pending' : 'badge-canceled'}`
                  }>
                    {order.status}
                  </span>
                  </td>
                  <td>${order.total_price}</td>
                  <td>
                    <a href={`/order/${order.id}`} className="btn btn-primary btn-sm">
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
