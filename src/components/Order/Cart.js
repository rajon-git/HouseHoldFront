import { toast } from 'react-toastify';
import {
  useAddOrderItemMutation,
  useClearCartMutation,
  useDeleteCartItemMutation,
  useGetCartQuery,
} from '../../features/auth/apiSlice';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const session_key = localStorage.getItem('session_key');
  const { data: cart, isLoading, isError, error, refetch } = useGetCartQuery(session_key);
  const [clearCart] = useClearCartMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [addOrderItem, { isLoading: isOrderLoading }] = useAddOrderItemMutation();
  const navigate = useNavigate();

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
  

  const handleSubmit = async () => {
    const orderData = {
      cart: cart?.id,  
      items: cart?.items?.map(item => ({
        service: item?.service.id,  
        quantity: item?.quantity,   
      })),
    };
  
    try {
      await addOrderItem(orderData).unwrap();  
      toast.success('Order placed successfully!');
      navigate('/orders')
      refetch(); 
    } catch (error) {
      toast.error('Failed to place order.');
    }
  };
  

  const totalServiceFees = cart?.items?.reduce((total, item) => {
    return total + (item.service?.service_fee || 0) * item.quantity;
  }, 0).toFixed(2);

  if (isLoading) return <p>Loading...</p>;
  
  if (isError) {
    const errorMessage = error?.data?.detail === "Cart not found for authenticated user."
      ? "Cart not found. Please add items to your cart."
      : "Error fetching cart items.";
    return <p className="text-center">{errorMessage}</p>;
  }

  return (
    <div className="container-xxl" style={{ marginTop: '100px' }}>
      <h1 className="mb-4 text-center">Service Cart</h1>
      {cart?.items && cart.items.length > 0 ? (
        <>
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Service Fees</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
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
                  <td>${(item.service?.service_fee || 0).toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center my-4">
            <h4>Total Service Fees: <span className="text-success">${totalServiceFees}</span></h4>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button onClick={handleClearCart} className="btn btn-warning btn-lg mx-2">Clear Cart</button>
            <button onClick={handleSubmit} disabled={isOrderLoading} className="btn btn-success btn-lg mx-2">Proceed to Checkout</button>
          </div>
        </>
      ) : (
        <p className="text-center">Your cart is empty.</p>
      )}
    </div>
  );
}
