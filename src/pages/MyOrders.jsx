
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../services/orderApi";
import OrderCard from "../components/OrderCard";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading orders:", err);
      setError("Unable to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return (
      <p className="loading-message">
        Loading your orders...
      </p>
    );
  }

  return (
    <div className="my-orders-page">
      <div className="page-heading">
        <div>
          <h1>My Orders</h1>
          <p>Track your food orders and their status</p>
        </div>
      </div>

      {error ? (
        <div className="error-message">
          <p>{error}</p>
          <button type="button" onClick={loadOrders}>
            Try Again
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No orders yet!</h2>
          <p>Your placed orders will appear here.</p>

          <button
            type="button"
            onClick={() => navigate("/restaurants")}
          >
            Explore Restaurants
          </button>
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
