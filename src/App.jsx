
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import AdminSidebar from "./components/AdminSidebar";

import AdminDashboard from "./pages/AdminDashboard";
import ManageFoods from "./pages/ManageFoods";
import ManageOrders from "./pages/ManageOrders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";

import "./styles/admin.css";
import "./styles/ordering.css";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}

function HomePlaceholder() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to FoodHub</h1>
      <p>Your favourite food, delivered to your doorstep.</p>
      <p>Restaurant and menu pages will be connected next.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePlaceholder />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="foods" element={<ManageFoods />} />
          <Route path="orders" element={<ManageOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
