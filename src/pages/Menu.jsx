
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoods, getRestaurantById } from "../services/restaurantApi";
import FoodCard from "../components/FoodCard";

function Menu() {
  const { id } = useParams();

  const [foods, setFoods] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getFoods(), getRestaurantById(id)])
      .then(([foodResponse, restaurantResponse]) => {
        setFoods(
          foodResponse.data.filter(
            (food) => String(food.restaurantId) === String(id)
          )
        );
        setRestaurant(restaurantResponse.data);
      })
      .catch((error) => console.error("Error fetching menu:", error))
      .finally(() => setLoading(false));
  }, [id]);

  const categories = [
    "All",
    ...new Set(foods.map((food) => food.category)),
  ];

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || food.category === category)
  );

  return (
    <div className="menu-page">
      <h1>{restaurant ? restaurant.name + " Menu" : "Restaurant Menu"}</h1>

      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading menu...</p>
      ) : filteredFoods.length === 0 ? (
        <p>No food items found.</p>
      ) : (
        <div className="food-list">
          {filteredFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onAddToCart={(item) => console.log("Add to cart:", item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;


