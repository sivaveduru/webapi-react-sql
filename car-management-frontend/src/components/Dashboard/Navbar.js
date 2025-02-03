import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userRole, setUserRole] = useState("common"); // Default role
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.role) {
        setUserRole(user.role);
      } else {
        setUserRole("common");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange(); // Initial load from localStorage

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const navbarItems = [
    { name: "", path: "/", roles: ["common", "dealer", "customer"] },
    { name: "Dealer Dashboard", path: "", roles: ["dealer"] },
    {
      name: "Customer Dashboard",
      path: "",
      roles: ["customer"],
    },
    { name: "Login", path: "/login", roles: ["common"] },
    { name: "Register", path: "/register", roles: ["common"] },
    { name: "Car Management", path: "/cars", roles: ["dealer"] },
    { name: "Users List", path: "/users", roles: ["dealer"] },
    { name: "User Profile", path: "/user", roles: ["customer"] },
    {
      name: "About Us",
      path: "/about",
      roles: ["common", "dealer", "customer"],
    },
    {
      name: "Contact Us",
      path: "/contact",
      roles: ["common", "dealer", "customer"],
    },
    { name: "Logout", path: "/logout", roles: ["dealer", "customer"] },
  ];

  // Filter navbar items based on role and remove Login/Register if logged in
  const filteredItems = navbarItems.filter(
    (item) =>
      (item.roles.includes(userRole) || item.roles.includes("common")) &&
      !(
        (userRole === "dealer" || userRole === "customer") &&
        (item.name === "Login" || item.name === "Register")
      )
  );

  const handleLogout = () => {
    localStorage.clear();
    setUserRole("common");
    navigate("/login");
    window.dispatchEvent(new Event("storage")); // Trigger navbar update
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold text-light" href="/">
          Car Dealer Limited
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {filteredItems.map((item, index) => (
              <li className="nav-item" key={index}>
                {item.name === "Logout" ? (
                  <button
                    className="btn btn-danger ms-2"
                    onClick={handleLogout}
                  >
                    {item.name}
                  </button>
                ) : (
                  <a
                    className="nav-link text-light fw-semibold"
                    href={item.path}
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
