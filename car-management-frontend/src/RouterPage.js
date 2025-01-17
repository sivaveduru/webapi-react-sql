import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navbar component
import Login from "./components/Login"; // Login component
import Register from "./components/Register"; // Register component
import CarManagement from "./components/CarManagement"; // CarManagement component
import HomePage from "./components/HomePage"; // HomePage component
import CarDetails from "./components/CarDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactUs from "./components/ContactUS";
import AboutUs from "./components/AboutUs";
import UsersList from "./components/UsersList";

const RouterPage = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cars" element={<CarManagement />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default RouterPage;
