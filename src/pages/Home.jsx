
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRestaurants } from "../services/restaurantApi";
import RestaurantCard from "../components/RestaurantCard";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getRestaurants()
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">WELCOME TO FOODIEHUB</span>
          <h1>
            Cravings made
            <br />
            <span>deliciously easy.</span>
          </h1>
          <p>
            Discover amazing restaurants, explore delicious dishes
            and find your next favourite meal.
          </p>
          <button onClick={() => navigate("/restaurants")}>
            Explore Restaurants <span>→</span>
          </button>

          <div className="hero-stats">
            <div>
              <strong>{restaurants.length}+</strong>
              <small>Restaurants</small>
            </div>
            <div>
              <strong>Fresh</strong>
              <small>Food choices</small>
            </div>
            <div>
              <strong>Easy</strong>
              <small>Ordering</small>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1000"
            alt="Delicious food"
          />
          <div className="image-label">
            <span>⭐ 4.8</span>
            <p>Made for food lovers</p>
          </div>
        </div>
      </section>

      <section className="category-section">
        <div className="section-heading">
          <div>
            <span className="section-tag">EXPLORE BY TASTE</span>
            <h2>What are you craving?</h2>
            <p>A little something for every mood.</p>
          </div>
        </div>

        <div className="category-grid">
          {[
            ["🍕", "Pizza"],
            ["🍔", "Burgers"],
            ["🍛", "Biryani"],
            ["🍰", "Desserts"],
            ["🥗", "Healthy"]
          ].map(([emoji, name]) => (
            <div className="category-item" key={name}>
              <span>{emoji}</span>
              <h3>{name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="highlights">
        <div className="section-heading">
          <div>
            <span className="section-tag">DISCOVER YOUR NEXT FAVOURITE</span>
            <h2>Popular Restaurants</h2>
            <p>Explore delicious food from restaurants around you.</p>
          </div>
          <button
            className="view-all-btn"
            onClick={() => navigate("/restaurants")}
          >
            View All Restaurants →
          </button>
        </div>

        {loading ? (
          <p>Loading restaurants...</p>
        ) : restaurants.length === 0 ? (
          <p>No restaurants available.</p>
        ) : (
          <div className="restaurant-list">
            {restaurants.slice(0, 6).map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onViewMenu={(id) => navigate(`/menu/${id}`)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="home-promo">
        <div>
          <span>GOOD FOOD. GREAT MOMENTS.</span>
          <h2>Your next delicious meal is just a click away.</h2>
          <button onClick={() => navigate("/restaurants")}>
            Find Your Food →
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
