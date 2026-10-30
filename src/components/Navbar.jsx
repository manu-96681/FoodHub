

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">FoodieHub</h2>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/restaurants">Restaurants</a>
        <a href="/manage-restaurants">Manage Restaurants</a>
      </div>
    </nav>
  );
}

export default Navbar;
