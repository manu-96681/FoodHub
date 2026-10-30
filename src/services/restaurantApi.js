

import axios from "axios";

const API = "http://localhost:3000";

export const getRestaurants = () => axios.get(`${API}/restaurants`);

export const getRestaurantById = (id) =>
  axios.get(`${API}/restaurants/${id}`);

export const addRestaurant = (data) =>
  axios.post(`${API}/restaurants`, data);

export const updateRestaurant = (id, data) =>
  axios.put(`${API}/restaurants/${id}`, data);

export const deleteRestaurant = (id) =>
  axios.delete(`${API}/restaurants/${id}`);

export const getFoods = () => axios.get(`${API}/foods`);

export const getFoodById = (id) =>
  axios.get(`${API}/foods/${id}`);
