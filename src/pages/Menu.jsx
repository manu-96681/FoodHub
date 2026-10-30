
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoods } from "../services/foodApi";
import { getRestaurantById } from "../services/restaurantApi";
import FoodCard from "../components/FoodCard";

function Menu() {
  const { id } = useParams();

  const [foods, setFoods] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    Promise.all([getFoods(), getRestaurantById(id)])
      .then(([foodData, restaurantResponse]) => {
        setFoods(
          foodData.filter(
            (food) => String(food.restaurantId) === String(id)
          )
        );
        setRestaurant(restaurantResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
        setError("Unable to load menu. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = (food) => {
    if (food.available !== true) {
      alert("This food item is currently unavailable.");
      return;
    }

    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const existingItem = cart.find(
        (item) => String(item.id) === String(food.id)
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: food.id,
          name: food.name,
          price: food.price,
          image: food.image,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${food.name} added to cart!`);
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Unable to add item to cart.");
    }
  };

  const categories = [
    "All",
    ...new Set(foods.map((food) => food.category).filter(Boolean)),
  ];

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || food.category === category)
  );

  return (
    <main className="menu-page">
      <section className="menu-hero">
        <div className="menu-hero-content">
          <span className="menu-eyebrow">FRESHLY PREPARED FOR YOU</span>
          <h1>{restaurant ? restaurant.name : "Restaurant Menu"}</h1>
          <p>
            {restaurant?.description ||
              "Explore delicious dishes and discover your next favourite meal."}
          </p>

          {restaurant?.location && (
            <span className="menu-location">
              <span>⌖</span> {restaurant.location}
            </span>
          )}

          {restaurant?.rating != null && (
            <span className="menu-restaurant-rating">
              ★ {restaurant.rating} Rating
            </span>
          )}
        </div>

        {restaurant?.image && (
          <div className="menu-hero-image">
            <img src={restaurant.image} alt={restaurant.name} />
          </div>
        )}
      </section>

      <section className="menu-content">
        <div className="menu-heading">
          <div>
            <span className="menu-eyebrow">MADE WITH LOVE</span>
            <h2>Explore Our Menu</h2>
            <p>Find something delicious for every craving.</p>
          </div>

          <span className="menu-food-count">
            {filteredFoods.length} Items
          </span>
        </div>

        <div className="menu-toolbar">
          <div className="menu-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search your favourite food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="menu-category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="menu-state">
            <p>Preparing your menu...</p>
          </div>
        ) : error ? (
          <div className="menu-state menu-error">
            <p>{error}</p>
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="menu-state">
            <span className="menu-empty-icon">🍽️</span>
            <h3>No dishes found</h3>
            <p>Try another search or choose a different category.</p>
          </div>
        ) : (
          <div className="food-list">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Menu;
