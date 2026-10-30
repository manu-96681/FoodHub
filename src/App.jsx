
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminSidebar from "./components/AdminSidebar";

import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import Menu from "./pages/Menu";
import ManageRestaurants from "./pages/ManageRestaurants";

import AdminDashboard from "./pages/AdminDashboard";
import ManageFoods from "./pages/ManageFoods";
import ManageOrders from "./pages/ManageOrders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";

import "./styles/admin.css";
import "./styles/ordering.css";
import "./App.css";


function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/menu/:id" element={<Menu />} />
          <Route path="/manage-restaurants" element={<ManageRestaurants />} />
        </Route>

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
