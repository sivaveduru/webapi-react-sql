import React, { useState } from "react";
import axios from "axios"; // Direct axios import to make requests
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"; // Import Link for navigation

const Register = ({ history }) => {
  const [name, setName] = useState(""); // Added name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Added role state
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
          role, // Send role to backend
        }
      );

      // On success, show success message, clear fields, and redirect to login page
      if (response.status === 200) {
        setSuccessMessage(response.data.message); // "User registered successfully"

        // Clear the email, password, name, and role fields
        setName("");
        setEmail("");
        setPassword("");
        setRole("");

        // Redirect to the login page after registration
        setTimeout(() => {
          history.push("/login");
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
    <div className="container mt-5">
      <h1 className="text-center mb-4">Register</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleRegister}>
                {/* Name Input */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Role Input */}
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="customer">Customer</option>
                    <option value="dealer">Dealer</option>
                  </select>
                </div>

                {/* Register Button */}
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>

              {/* Error or Success Messages */}
              {error && <div className="mt-3 alert alert-danger">{error}</div>}
              {successMessage && (
                <div className="mt-3 alert alert-success">{successMessage}</div>
              )}

              {/* Login Link Section */}
              <div className="mt-3 d-flex justify-content-center">
                <p className="mb-0">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="btn btn-link p-0"
                    style={{ marginTop: "-2px" }}
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
