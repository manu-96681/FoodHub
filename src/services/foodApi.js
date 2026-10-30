
const API_URL = "http://localhost:3000/foods";

// Get all food items
export const getFoods = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch foods");
  return response.json();
};

// Get a food item by ID
export const getFoodById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Food item not found");
  return response.json();
};

// Add a new food item
export const addFood = async (food) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(food),
  });
  if (!response.ok) throw new Error("Failed to add food");
  return response.json();
};

// Update an existing food item
export const updateFood = async (id, food) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(food),
  });
  if (!response.ok) throw new Error("Failed to update food");
  return response.json();
};

// Delete a food item
export const deleteFood = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete food");
  return true;
};
