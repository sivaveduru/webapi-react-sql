import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Dashboard/Navbar";
import Login from "./components/Dashboard/Login";
import Register from "./components/Dashboard/Register";
import CarDetails from "./components/Dashboard/CarDetails";
import ContactUs from "./components/Dashboard/ContactUs";
import AboutUs from "./components/Dashboard/AboutUs";
import HomePage from "./components/Dashboard/HomePage";
import CarManagement from "./components/DealerDashboard/CarManagement";
import UsersList from "./components/DealerDashboard/UsersList";
import User from "./components/UserDashboard/User";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/" element={<HomePage />} />

        {/* Role-based routes */}
        <Route
          path="/cars"
          element={
            <ProtectedRoute requiredRole="dealer">
              <CarManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRole="dealer">
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute requiredRole="customer">
              <User />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
