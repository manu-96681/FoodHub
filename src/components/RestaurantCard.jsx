

function RestaurantCard({ restaurant, onViewMenu }) {
  return (
    <div className="restaurant-card">
      <img
        src={restaurant.image || "https://placehold.co/300x180?text=Restaurant"}
        alt={restaurant.name}
      />

      <div className="card-content">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.location}</p>
        <p>{restaurant.description}</p>
        <p>⭐ {restaurant.rating}</p>

        <button onClick={() => onViewMenu(restaurant.id)}>
          View Menu
        </button>
      </div>
    </div>
  );
}

export default RestaurantCard;
