
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRestaurants } from "../services/restaurantApi";
import RestaurantCard from "../components/RestaurantCard";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getRestaurants()
      .then((response) => setRestaurants(response.data))
      .catch(() => setError("Unable to load restaurants."))
      .finally(() => setLoading(false));
  }, []);

  const locations = useMemo(
    () => ["All Locations", ...new Set(restaurants.map((r) => r.location))],
    [restaurants]
  );

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      location === "All Locations" || restaurant.location === location;

    return matchesSearch && matchesLocation;
  });

  return (
    <main className="restaurant-discovery">

      <section className="discovery-hero">
        <span>EXPLORE • DISCOVER • ENJOY</span>
        <h1>Discover Restaurants</h1>
        <p>Find amazing food and explore your favourite restaurants.</p>
      </section>

      <section className="discovery-content">

        <div className="discovery-heading">
          <div>
            <span className="discovery-label">FIND YOUR NEXT MEAL</span>
            <h2>Explore All Restaurants</h2>
            <p>Choose from our collection of restaurants.</p>
          </div>

          <div className="discovery-count">
            <strong>{filteredRestaurants.length}</strong>
            <span>Places found</span>
          </div>
        </div>

        <div className="discovery-toolbar">

          <div className="discovery-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search restaurants or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="discovery-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {locations.map((place) => (
              <option key={place} value={place}>{place}</option>
            ))}
          </select>

        </div>

        {loading ? (
          <div className="discovery-message">Loading restaurants...</div>
        ) : error ? (
          <div className="discovery-message">{error}</div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="discovery-empty">
            <span>🍽️</span>
            <h3>No restaurants found</h3>
            <p>Try searching with another name or location.</p>
            <button onClick={() => {
              setSearch("");
              setLocation("All Locations");
            }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="discovery-grid">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onViewMenu={(id) => navigate(`/menu/${id}`)}
              />
            ))}
          </div>
        )}

      </section>
    </main>
  );
}

export default Restaurants;
