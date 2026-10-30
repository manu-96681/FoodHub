
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
  const [loading, setLoading] = useState(true);

  const loadRestaurants = async () => {
    try {
      const response = await getRestaurants();
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error loading restaurants:", error);
    } finally {
      setLoading(false);
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

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) {
      return;
    }

    try {
      await deleteRestaurant(id);
      await loadRestaurants();
      alert("Restaurant deleted successfully!");
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      alert("Could not delete restaurant.");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm(initialForm);
  };

  return (
    <main className="manage-page">
      <section className="manage-hero">
        <span className="manage-tag">FOODHUB ADMINISTRATION</span>
        <h1>Manage Restaurants</h1>
        <p>Add, update and manage your restaurant partners in one place.</p>
      </section>

      <div className="manage-content">
        <section className="manage-form-card">
          <div className="manage-section-heading">
            <div>
              <span className="manage-subtitle">
                {editId ? "UPDATE DETAILS" : "ADD NEW"}
              </span>
              <h2>{editId ? "Edit Restaurant" : "Add Restaurant"}</h2>
            </div>
            <span className="manage-form-icon">✦</span>
          </div>

          <form className="manage-restaurant-form" onSubmit={handleSubmit}>
            <div className="manage-form-grid">
              <label>
                Restaurant Name
                <input
                  name="name"
                  placeholder="Enter restaurant name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Location
                <input
                  name="location"
                  placeholder="Enter city or location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="manage-full-width">
                Description
                <textarea
                  name="description"
                  placeholder="Write a short restaurant description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="3"
                />
              </label>

              <label className="manage-full-width">
                Image URL
                <input
                  name="image"
                  placeholder="Paste restaurant image URL (optional)"
                  value={form.image}
                  onChange={handleChange}
                />
              </label>

              <label>
                Rating
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
              </label>
            </div>

            <div className="manage-form-actions">
              <button type="submit" className="manage-submit-btn">
                {editId ? "Update Restaurant" : "＋ Add Restaurant"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="manage-cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="manage-list-section">
          <div className="manage-section-heading">
            <div>
              <span className="manage-subtitle">YOUR FOOD PARTNERS</span>
              <h2>Restaurant List</h2>
            </div>
            <span className="manage-count">
              {restaurants.length} Restaurants
            </span>
          </div>

          {loading ? (
            <p className="manage-message">Loading restaurants...</p>
          ) : restaurants.length === 0 ? (
            <p className="manage-message">
              No restaurants found. Add your first restaurant above.
            </p>
          ) : (
            <div className="manage-restaurant-grid">
              {restaurants.map((restaurant) => (
                <article className="manage-restaurant-card" key={restaurant.id}>
                  <div className="manage-card-image">
                    <img
                      src={
                        restaurant.image ||
                        "https://placehold.co/600x400?text=Restaurant"
                      }
                      alt={restaurant.name}
                    />
                    <span className="manage-rating">
                      ★ {restaurant.rating}
                    </span>
                  </div>

                  <div className="manage-card-body">
                    <h3>{restaurant.name}</h3>
                    <p className="manage-location">
                      <span>⌖</span> {restaurant.location}
                    </p>
                    <p className="manage-description">
                      {restaurant.description}
                    </p>

                    <div className="manage-card-actions">
                      <button
                        className="manage-edit-btn"
                        onClick={() => handleEdit(restaurant)}
                      >
                        Edit
                      </button>
                      <button
                        className="manage-delete-btn"
                        onClick={() => handleDelete(restaurant.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default ManageRestaurants;
