
import { useState } from "react";

function FoodForm({
  initialData,
  onSubmit,
  onCancel,
  disabled = false,
}) {
  const [formData, setFormData] = useState({
    restaurantId: initialData?.restaurantId ?? "",
    name: initialData?.name ?? "",
    category: initialData?.category ?? "",
    price: initialData?.price ?? "",
    description: initialData?.description ?? "",
    image: initialData?.image ?? "",
    available: initialData?.available ?? true,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate and submit food details
  const handleSubmit = (e) => {
    e.preventDefault();

    const price = Number(formData.price);

    if (!Number.isFinite(price) || price <= 0) {
      alert("Please enter a valid food price.");
      return;
    }

    if (!formData.restaurantId.trim()) {
      alert("Please enter a restaurant ID.");
      return;
    }

    onSubmit({
      ...formData,
      restaurantId: String(formData.restaurantId).trim(),
      name: formData.name.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      price,
    });
  };

  return (
    <form className="food-form" onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit Food Item" : "Add New Food"}</h2>

      <label htmlFor="food-name">Food Name</label>
      <input
        id="food-name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter food name"
        required
        disabled={disabled}
      />

      <label htmlFor="restaurant-id">Restaurant ID</label>
      <input
        id="restaurant-id"
        name="restaurantId"
        value={formData.restaurantId}
        onChange={handleChange}
        placeholder="Enter restaurant ID"
        required
        disabled={disabled}
      />

      <label htmlFor="food-category">Category</label>
      <input
        id="food-category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Example: Pizza, Burger, Dessert"
        required
        disabled={disabled}
      />

      <label htmlFor="food-price">Price (₹)</label>
      <input
        id="food-price"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        min="0.01"
        step="0.01"
        placeholder="Enter food price"
        required
        disabled={disabled}
      />

      <label htmlFor="food-description">Description</label>
      <textarea
        id="food-description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe the food item"
        required
        disabled={disabled}
      />

      <label htmlFor="food-image">Image URL</label>
      <input
        id="food-image"
        type="url"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Enter image URL"
        disabled={disabled}
      />

      <label className="availability-label">
        <input
          type="checkbox"
          name="available"
          checked={formData.available}
          onChange={handleChange}
          disabled={disabled}
        />
        Available for ordering
      </label>

      <div className="form-actions">
        <button type="submit" disabled={disabled}>
          {disabled
            ? "Saving..."
            : initialData
              ? "Update Food"
              : "Add Food"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={disabled}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default FoodForm;
