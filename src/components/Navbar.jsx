
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span className="brand-icon">✦</span>
        <span className="brand-name">
          Foodie<span>Hub</span>
        </span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          Home
        </NavLink>

        <NavLink to="/restaurants" className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          Restaurants
        </NavLink>

        <NavLink to="/manage-restaurants" className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          Manage Restaurants
        </NavLink>
      </div>

      <NavLink to="/cart" className="navbar-cart">
        <span>🛒</span>
        <span>My Cart</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;
