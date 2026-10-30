
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-logo">
        Food<span>Hub</span>
      </h2>

      <p className="sidebar-label">ADMIN MENU</p>

      <nav>
        <NavLink to="/admin" end>
          Dashboard
        </NavLink>

        <NavLink to="/manage-restaurants">
          Manage Restaurants
        </NavLink>

        <NavLink to="/admin/foods">
          Manage Foods
        </NavLink>

        <NavLink to="/admin/orders">
          Manage Orders
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/">
          Back to Website
        </NavLink>
      </div>
    </aside>
  );
}

export default AdminSidebar;
