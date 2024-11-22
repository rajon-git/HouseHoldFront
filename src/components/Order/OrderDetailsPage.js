import React from 'react';
import { useGetOrderDetailsQuery } from '../../features/auth/apiSlice';
import { useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const { data: order, error, isLoading } = useGetOrderDetailsQuery(orderId);

  if (isLoading) return <div className="loader">Loading...</div>;
  if (error) return <p className="error-message">Error: {error?.data?.detail || error.message}</p>;

  return (
    <div className="invoice-container">
      <header className="invoice-header">
        <div className="invoice-logo">
          <h1>Company</h1>
        </div>
        <div className="invoice-info">
          <h2>Invoice</h2>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
        </div>
      </header>

      <section className="invoice-body">
        <div className="card billing-info">
          <h3>Billing Information</h3>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Address:</strong> {`${order.house}, ${order.road}, Ward ${order.ward}, ${order.city}, ${order.state}`}</p>
          <p><strong>Payment Type:</strong> {order.payment_type}</p>
        </div>

        <div className="card shipping-info">
          <h3>Shipping Information</h3>
          <p><strong>Address:</strong> {`${order.house}, ${order.road}, Ward ${order.ward}, ${order.city}, ${order.state}`}</p>
        </div>

        <div className="card order-items">
          <h3>Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order?.items?.map((item) => (
                <tr key={item.id}>
                  <td>{item?.service?.name}</td>
                  <td>${item.service.service_fee}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.service.service_fee * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card order-summary">
          <h3>Order Summary</h3>
          <p><strong>Total Price:</strong> ${order.total_price}</p>
        </div>
      </section>

      <footer className="invoice-footer">
        <p>Thank you for your business!</p>
      </footer>
    </div>
  );
};

export default OrderDetailsPage;
