import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For navigation links
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // To make HTTP requests

const HomePage = () => {
  const [cars, setCars] = useState([]); // State to hold car data
  const [error, setError] = useState(""); // State to hold any errors
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true); // Set loading to true while fetching
        const response = await axios.get("https://localhost:7242/api/Car"); // API call
        setCars(response.data); // Set fetched car data
      } catch (err) {
        setError("Error fetching car data");
        console.error("Error fetching data:", err); // Log error
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchCars(); // Fetch cars on component mount
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>Welcome to the Car Management System</h1>
        <p className="lead">
          This application allows you to manage cars, register as a dealer or
          customer, and easily log in to access your car management dashboard.
        </p>
        <h2 className="mt-5">Featured Cars</h2>

        {loading && <div>Loading cars...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row mt-4">
          {cars.length === 0 && !loading ? (
            <p>No cars available at the moment.</p>
          ) : (
            cars.map((car) => (
              <div className="col-md-4" key={car.id}>
                <div className="card mb-4">
                  <img
                    src="" // Placeholder image
                    className="card-img-top"
                    alt="Car"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {car.make} {car.model}
                    </h5>
                    <p className="card-text">
                      Year: {car.year} <br />
                      Price: ${car.price}
                    </p>
                    <Link to={`/cars/${car.id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
