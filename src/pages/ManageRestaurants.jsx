
import { useEffect, useState } from "react";
import {
  getRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../services/restaurantApi";

const initialForm = {
  name: "",
  location: "",
  description: "",
  image: "",
  rating: 4.0,
};

function ManageRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const loadRestaurants = async () => {
    try {
      const response = await getRestaurants();
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error loading restaurants:", error);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { ...form, rating: Number(form.rating) };

      if (editId) {
        await updateRestaurant(editId, data);
        alert("Restaurant updated successfully!");
      } else {
        await addRestaurant(data);
        alert("Restaurant added successfully!");
      }

      setForm(initialForm);
      setEditId(null);
      loadRestaurants();
    } catch (error) {
      console.error("Error saving restaurant:", error);
      alert("Could not save restaurant.");
    }
  };

  const handleEdit = (restaurant) => {
    setEditId(restaurant.id);
    setForm({
      name: restaurant.name,
      location: restaurant.location,
      description: restaurant.description,
      image: restaurant.image || "",
      rating: restaurant.rating,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) {
      return;
    }

    try {
      await deleteRestaurant(id);
      loadRestaurants();
      alert("Restaurant deleted successfully!");
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      alert("Could not delete restaurant.");
    }
  };

  return (
    <div className="manage-page">
      <h1>Manage Restaurants</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Restaurant Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={handleChange}
        />

        <input
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editId ? "Update Restaurant" : "Add Restaurant"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm(initialForm);
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <h2>Restaurant List</h2>

      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.location}</p>

          <button onClick={() => handleEdit(restaurant)}>Edit</button>

          <button onClick={() => handleDelete(restaurant.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ManageRestaurants;

