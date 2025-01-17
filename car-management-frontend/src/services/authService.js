import axios from "axios";

// Define the base URL for the API
const API_URL = "https://localhost:7242/api/auth";

// Function to handle user registration
const register = async (name, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error: ", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to handle user login
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // Store JWT token in localStorage for subsequent requests
    localStorage.setItem("userToken", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login error: ", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to logout by removing the token
const logout = () => {
  localStorage.removeItem("userToken");
};

// Check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("userToken");
};

export default {
  register,
  login,
  logout,
  isAuthenticated,
};
