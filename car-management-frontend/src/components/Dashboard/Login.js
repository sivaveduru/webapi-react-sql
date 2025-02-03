import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link for navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7242/api/Auth/login",
        { email, password }
      );

      if (response.status === 200) {
        const { user } = response.data; // Access the nested user object
        const { role, email: userEmail, name } = user; // Destructure user data

        localStorage.setItem(
          "user",
          JSON.stringify({ email: userEmail, role })
        );
        localStorage.setItem("userName", name);
        setEmail("");
        setPassword("");

        // Redirect based on role
        if (role === "dealer") navigate("/cars");
        else if (role === "customer") navigate("/user");
        else navigate("/");

        // Ensure Navbar gets updated (since it listens to changes in localStorage)
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data); // Display error message
      }
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f0f8ff" }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg p-4">
            <h1 className="text-center mb-4 text-primary">Login</h1>
            <div className="card-body">
              <form onSubmit={handleLogin}>
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
                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg mb-3"
                >
                  Login
                </button>
              </form>
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Register Link */}
              <div className="text-center">
                <p className="mb-0">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="btn btn-link p-0"
                    style={{ fontSize: "1.1rem", marginTop: "-2px" }}
                  >
                    Register here
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

export default Login;
