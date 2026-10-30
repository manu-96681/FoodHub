
import { useState } from "react";

function FoodForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    restaurantId: initialData?.restaurantId || "",
    name: initialData?.name || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    available: initialData?.available ?? true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(formData.price) <= 0) {
      alert("Please enter a valid food price.");
      return;
    }

    onSubmit({
      ...formData,
      restaurantId: String(formData.restaurantId).trim(),
      price: Number(formData.price),
    });
  };

  return (
    <form className="food-form" onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit Food Item" : "Add New Food"}</h2>

      <label>Food Name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter food name"
        required
      />

      <label>Restaurant ID</label>
      <input
        name="restaurantId"
        value={formData.restaurantId}
        onChange={handleChange}
        placeholder="Enter restaurant ID"
        required
      />

      <label>Category</label>
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Example: Pizza, Burger, Dessert"
        required
      />

      <label>Price (₹)</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        min="1"
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe the food item"
        required
      />

      <label>Image URL</label>
      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Enter image URL"
      />

      <label className="availability-label">
        <input
          type="checkbox"
          name="available"
          checked={formData.available}
          onChange={handleChange}
        />
        Available for ordering
      </label>

      <div className="form-actions">
        <button type="submit">
          {initialData ? "Update Food" : "Add Food"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default FoodForm;
