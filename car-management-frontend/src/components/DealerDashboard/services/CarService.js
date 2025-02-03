import axios from "axios";

// Define the base URL for the API
const API_URL = "https://localhost:7242/api/Car";

// Function to get all cars
const getCars = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to get a car by its ID
const getCarById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to create a new car
const createCar = async (car) => {
  try {
    const response = await axios.post(`${API_URL}/add`, car);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to update a car's details
const updateCar = async (id, updatedCar) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedCar);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to delete a car by its ID
const deleteCar = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Assign the functions to an object
const carService = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};

// Export the object with functions
export default carService;
