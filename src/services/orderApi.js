
const API_URL = "http://localhost:3000/orders";

// Get all orders
export const getOrders = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
};

// Get a single order by ID
export const getOrderById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Order not found");
  return response.json();
};

// Place a new order
export const addOrder = async (order) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!response.ok) throw new Error("Failed to place order");
  return response.json();
};

// Update order details or status
export const updateOrder = async (id, order) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!response.ok) throw new Error("Failed to update order");
  return response.json();
};

// Cancel or delete an order
export const deleteOrder = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete order");
  return true;
};
