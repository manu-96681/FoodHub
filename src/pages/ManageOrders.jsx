
import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import { getOrders, updateOrder } from "../services/orderApi";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all orders
  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading orders:", err);
      setError("Unable to load orders. Please check JSON Server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Update only the selected order's status
  const handleStatusChange = async (id, status) => {
    try {
      const updatedOrder = await updateOrder(id, { status });

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === id ? updatedOrder : order
        )
      );
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Unable to update order status. Please try again.");
    }
  };

  if (loading) {
    return (
      <p className="loading-message">
        Loading orders...
      </p>
    );
  }

  return (
    <div className="admin-page">
      <div className="page-heading">
        <div>
          <h1>Manage Orders</h1>
          <p>View customer orders and update their status</p>
        </div>

        <button type="button" onClick={loadOrders}>
          Refresh Orders
        </button>
      </div>

      {error ? (
        <div className="error-message">
          <p>{error}</p>
          <button type="button" onClick={loadOrders}>
            Try Again
          </button>
        </div>
      ) : orders.length === 0 ? (
        <p className="empty-message">
          No orders have been placed yet.
        </p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              showActions={true}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageOrders;
