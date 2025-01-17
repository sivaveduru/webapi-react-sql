import React, { useState } from "react";
import axios from "axios"; // Direct axios import to make requests
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend login endpoint
      const response = await axios.post(
        "https://localhost:7242/api/Auth/login",
        {
          email,
          password,
        }
      );

      // On success, show success message, clear fields, and redirect to /cars
      if (response.status === 200) {
        alert(response.data.message); // "Login successful"

        // Clear the email and password fields
        setEmail("");
        setPassword("");

        // Redirect to the cars page
        history.push("/cars");
      }
    } catch (error) {
      // If error, show error message
      if (error.response && error.response.data) {
        setError(error.response.data); // "Invalid email or password"
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Login</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleLogin}>
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
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              {error && <div className="mt-3 alert alert-danger">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
