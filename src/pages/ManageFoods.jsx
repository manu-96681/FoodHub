
import { useEffect, useState } from "react";
import FoodForm from "../components/FoodForm";
import {
  getFoods,
  addFood,
  updateFood,
  deleteFood,
} from "../services/foodApi";

function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch all food items
  const loadFoods = async () => {
    try {
      setError("");

      const data = await getFoods();
      setFoods(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading foods:", err);
      setError("Unable to load food items. Please check JSON Server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  // Add a new food item
  const handleAdd = async (food) => {
    try {
      setSaving(true);
      await addFood(food);

      setShowForm(false);
      setEditingFood(null);

      await loadFoods();
    } catch (err) {
      console.error("Error adding food:", err);
      alert("Failed to add food item.");
    } finally {
      setSaving(false);
    }
  };

  // Update an existing food item
  const handleUpdate = async (food) => {
    try {
      setSaving(true);

      await updateFood(editingFood.id, food);

      setShowForm(false);
      setEditingFood(null);

      await loadFoods();
    } catch (err) {
      console.error("Error updating food:", err);
      alert("Failed to update food item.");
    } finally {
      setSaving(false);
    }
  };

  // Delete a food item
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food item?"
    );

    if (!confirmDelete) return;

    try {
      await deleteFood(id);
      await loadFoods();
    } catch (err) {
      console.error("Error deleting food:", err);
      alert("Failed to delete food item.");
    }
  };

  // Open the form for editing
  const handleEdit = (food) => {
    setEditingFood(food);
    setShowForm(true);
  };

  // Toggle food availability
  const handleAvailability = async (food) => {
    try {
      await updateFood(food.id, {
        ...food,
        available: !food.available,
      });

      await loadFoods();
    } catch (err) {
      console.error("Error updating availability:", err);
      alert("Failed to update food availability.");
    }
  };

  // Close and reset the form
  const closeForm = () => {
    setShowForm(false);
    setEditingFood(null);
  };

  if (loading) {
    return (
      <p className="loading-message">
        Loading food items...
      </p>
    );
  }

  return (
    <div className="admin-page">
      <div className="page-heading">
        <div>
          <h1>Manage Foods</h1>
          <p>Add, edit and manage your food menu</p>
        </div>

        <button
          className="primary-btn"
          type="button"
          onClick={() => {
            setEditingFood(null);
            setShowForm(true);
          }}
        >
          + Add Food
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button type="button" onClick={loadFoods}>
            Try Again
          </button>
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <FoodForm
            initialData={editingFood}
            onSubmit={editingFood ? handleUpdate : handleAdd}
            onCancel={closeForm}
            disabled={saving}
          />
        </div>
      )}

      {foods.length === 0 && !error ? (
        <div className="empty-message">
          <p>No food items added yet.</p>
          <p>Click Add Food to create your first menu item.</p>
        </div>
      ) : (
        <div className="food-management-grid">
          {foods.map((food) => (
            <div className="managed-food-card" key={food.id}>
              <img
                src={
                  food.image ||
                  "https://placehold.co/300x200?text=Food"
                }
                alt={food.name || "Food item"}
              />

              <div className="managed-food-info">
                <h3>{food.name}</h3>
                <p>{food.category}</p>

                <strong>
                  ₹{(Number(food.price) || 0).toFixed(2)}
                </strong>

                <span
                  className={
                    food.available
                      ? "availability available"
                      : "availability unavailable"
                  }
                >
                  {food.available ? "Available" : "Unavailable"}
                </span>

                <div className="food-card-actions">
                  <button
                    type="button"
                    onClick={() => handleEdit(food)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAvailability(food)}
                  >
                    {food.available
                      ? "Mark Unavailable"
                      : "Make Available"}
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(food.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageFoods;
