
import { useEffect, useState } from "react";
import { getOrders } from "../services/orderApi";
import OrderCard from "../components/OrderCard";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError("Unable to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return <p className="loading-message">Loading your orders...</p>;
  }

  return (
    <div className="my-orders-page">
      <div className="page-heading">
        <div>
          <h1>My Orders</h1>
          <p>Track your food orders and their status</p>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No orders yet!</h2>
          <p>Your placed orders will appear here.</p>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
