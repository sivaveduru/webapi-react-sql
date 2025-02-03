import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Register = () => {
  const [name, setName] = useState(""); // Added name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend register endpoint
      const response = await axios.post(
        "https://localhost:7242/api/Auth/register",
        {
          name, // Send name to backend
          email, // Send email to backend
          password, // Send password to backend
          role: "customer", // Hardcoded role as "customer"
        }
      );

      // On success, clear fields, and redirect to login page
      if (response.status === 200) {
        // Clear the email, password, name, and role fields
        setName("");
        setEmail("");
        setPassword("");

        // Redirect to the login page after registration
        setTimeout(() => {
          navigate("/login"); // Use navigate for routing in React Router v6
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      // If error, show error message
      if (error.response && error.response.data) {
        setError(error.response.data); // Error message from backend (e.g., "User already exists")
      }
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f7f7f7" }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg p-4">
            <h1 className="text-center mb-4 text-primary">Register</h1>
            <div className="card-body">
              <form onSubmit={handleRegister}>
                {/* Name Input */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg mb-3"
                >
                  Register
                </button>
              </form>

              {/* Error Message */}
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Login Link Section */}
              <div className="text-center">
                <p className="mb-0">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="btn btn-link p-0"
                    style={{ fontSize: "1.1rem", marginTop: "-2px" }}
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
