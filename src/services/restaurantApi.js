
import axios from "axios";

const API = "http://localhost:3000";

// Get all restaurants
export const getRestaurants = () => {
  return axios.get(`${API}/restaurants`);
};

// Get one restaurant by ID
export const getRestaurantById = (id) => {
  return axios.get(`${API}/restaurants/${id}`);
};

// Add a new restaurant
export const addRestaurant = (data) => {
  return axios.post(`${API}/restaurants`, data);
};

// Update restaurant details
export const updateRestaurant = (id, data) => {
  return axios.put(`${API}/restaurants/${id}`, data);
};

// Delete a restaurant
export const deleteRestaurant = (id) => {
  return axios.delete(`${API}/restaurants/${id}`);
};

// Get all foods
export const getFoods = () => {
  return axios.get(`${API}/foods`);
};

// Get one food by ID
export const getFoodById = (id) => {
  return axios.get(`${API}/foods/${id}`);
};
