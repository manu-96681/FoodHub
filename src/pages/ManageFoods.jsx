
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

  const loadFoods = async () => {
    try {
      const data = await getFoods();
      setFoods(data);
      setError("");
    } catch (err) {
      setError("Unable to load food items. Please check JSON Server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleAdd = async (food) => {
    try {
      await addFood(food);
      setShowForm(false);
      await loadFoods();
    } catch (err) {
      alert("Failed to add food item.");
    }
  };

  const handleUpdate = async (food) => {
    try {
      await updateFood(editingFood.id, food);
      setEditingFood(null);
      setShowForm(false);
      await loadFoods();
    } catch (err) {
      alert("Failed to update food item.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food item?"
    );

    if (!confirmDelete) return;

    try {
      await deleteFood(id);
      await loadFoods();
    } catch (err) {
      alert("Failed to delete food item.");
    }
  };

  const handleEdit = (food) => {
    setEditingFood(food);
    setShowForm(true);
  };

  const handleAvailability = async (food) => {
    try {
      await updateFood(food.id, {
        ...food,
        available: !food.available,
      });
      await loadFoods();
    } catch (err) {
      alert("Failed to update food availability.");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingFood(null);
  };

  if (loading) {
    return <p className="loading-message">Loading food items...</p>;
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
          onClick={() => {
            setEditingFood(null);
            setShowForm(true);
          }}
        >
          + Add Food
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {showForm && (
        <div className="form-container">
          <FoodForm
            initialData={editingFood}
            onSubmit={editingFood ? handleUpdate : handleAdd}
            onCancel={closeForm}
          />
        </div>
      )}

      {foods.length === 0 ? (
        <p className="empty-message">No food items added yet.</p>
      ) : (
        <div className="food-management-grid">
          {foods.map((food) => (
            <div className="managed-food-card" key={food.id}>
              <img
                src={food.image || "https://placehold.co/300x200?text=Food"}
                alt={food.name}
              />

              <div className="managed-food-info">
                <h3>{food.name}</h3>
                <p>{food.category}</p>
                <strong>₹{food.price}</strong>

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
                  <button onClick={() => handleEdit(food)}>
                    Edit
                  </button>

                  <button
                    onClick={() => handleAvailability(food)}
                  >
                    {food.available ? "Mark Unavailable" : "Make Available"}
                  </button>

                  <button
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
