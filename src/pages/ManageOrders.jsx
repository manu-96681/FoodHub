
import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import { getOrders, updateOrder } from "../services/orderApi";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
      setError("");
    } catch (err) {
      setError("Unable to load orders. Please check JSON Server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    const selectedOrder = orders.find((order) => order.id === id);

    if (!selectedOrder) return;

    try {
      await updateOrder(id, { ...selectedOrder, status });
      await loadOrders();
    } catch (err) {
      alert("Unable to update order status.");
    }
  };

  if (loading) {
    return <p className="loading-message">Loading orders...</p>;
  }

  return (
    <div className="admin-page">
      <div className="page-heading">
        <div>
          <h1>Manage Orders</h1>
          <p>View customer orders and update their status</p>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {orders.length === 0 ? (
        <p className="empty-message">No orders have been placed yet.</p>
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
