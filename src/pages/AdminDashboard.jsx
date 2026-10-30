
import { useEffect, useState } from "react";
import { getFoods } from "../services/foodApi";
import { getOrders } from "../services/orderApi";
import OrderCard from "../components/OrderCard";

function AdminDashboard() {
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [foodData, orderData] = await Promise.all([
        getFoods(),
        getOrders(),
      ]);

      setFoods(Array.isArray(foodData) ? foodData : []);
      setOrders(Array.isArray(orderData) ? orderData : []);
    } catch (err) {
      console.error("Dashboard loading failed:", err);
      setError("Unable to load dashboard data. Please check JSON Server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const availableFoods = foods.filter(
    (food) => food.available === true
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status === "Delivered")
    .reduce(
      (total, order) =>
        total + (Number(order.totalAmount) || 0),
      0
    );

  const recentOrders = [...orders]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime() || 0;
      const dateB = new Date(b.createdAt).getTime() || 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  if (loading) {
    return (
      <p className="loading-message">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div className="admin-page">
      <div className="page-heading">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Overview of your restaurant operations</p>
        </div>

        <button type="button" onClick={loadDashboard}>
          Refresh Dashboard
        </button>
      </div>

      {error ? (
        <div className="error-message">
          <p>{error}</p>
          <button type="button" onClick={loadDashboard}>
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Food Items</h3>
              <p>{foods.length}</p>
            </div>

            <div className="stat-card">
              <h3>Available Foods</h3>
              <p>{availableFoods}</p>
            </div>

            <div className="stat-card">
              <h3>Total Orders</h3>
              <p>{orders.length}</p>
            </div>

            <div className="stat-card">
              <h3>Delivered Revenue</h3>
              <p>₹{totalRevenue.toFixed(2)}</p>
            </div>
          </div>

          <section className="recent-orders-section">
            <h2>Recent Orders</h2>

            {recentOrders.length === 0 ? (
              <p>No orders have been placed yet.</p>
            ) : (
              <div className="order-list">
                {recentOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
