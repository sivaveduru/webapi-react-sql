import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For navigation links
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // To make HTTP requests

const HomePage = () => {
  const [cars, setCars] = useState([]); // State to hold car data
  const [filteredCars, setFilteredCars] = useState([]); // State for filtered car data
  const [error, setError] = useState(""); // State to hold any errors
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Filter state variables
  const [search, setSearch] = useState(""); // General search text for brand/model/features
  const [filterOption, setFilterOption] = useState("priceLowToHigh"); // Combined filter option (price/year)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true); // Set loading to true while fetching
        const response = await axios.get("https://localhost:7242/api/Car"); // API call
        setCars(response.data); // Set fetched car data
        setFilteredCars(response.data); // Initially, show all cars
      } catch (err) {
        setError("Error fetching car data");
        console.error("Error fetching data:", err); // Log error
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchCars(); // Fetch cars on component mount
  }, []); // Empty dependency array ensures it runs once when the component mounts

  // Function to handle filtering
  const handleFilter = () => {
    let filtered = cars;

    // Filter based on general search (brand/model/features)
    if (search) {
      filtered = filtered.filter((car) => {
        const make = car.make ? car.make.toLowerCase() : ""; // Safely access make
        const model = car.model ? car.model.toLowerCase() : ""; // Safely access model
        const features = car.features ? car.features.toLowerCase() : ""; // Safely access features
        return (
          make.includes(search.toLowerCase()) ||
          model.includes(search.toLowerCase()) ||
          features.includes(search.toLowerCase())
        );
      });
    }

    // Filter based on the selected filter option (price or year)
    if (filterOption === "priceLowToHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filterOption === "priceHighToLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (filterOption === "newestToOldest") {
      filtered = filtered.sort((a, b) => b.year - a.year); // Sort by year from newest to oldest
    } else if (filterOption === "oldestToNewest") {
      filtered = filtered.sort((a, b) => a.year - b.year); // Sort by year from oldest to newest
    }

    setFilteredCars(filtered);
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>Welcome to the Car Management System</h1>
        <p className="lead">
          This application allows you to manage cars, register as a dealer or
          customer, and easily log in to access your car management dashboard.
        </p>

        {/* Filter Section */}
        <div className="mt-5">
          <h3>Filter Cars</h3>
          <div className="row">
            {/* Search Input for Brand, Model, Features */}
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search (Brand, Model, Features)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Combined Filter Dropdown (Price or Year) */}
            <div className="col-md-3">
              <select
                className="form-select"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
              >
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="newestToOldest">Year: Newest to Oldest</option>
                <option value="oldestToNewest">Year: Oldest to Newest</option>
              </select>
            </div>

            {/* Apply Filters Button */}
            <div className="col-md-3">
              <button onClick={handleFilter} className="btn btn-primary w-100">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        <h2 className="mt-5">Featured Cars</h2>

        {loading && <div>Loading cars...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row mt-4">
          {filteredCars.length === 0 && !loading ? (
            <p>No cars available at the moment.</p>
          ) : (
            filteredCars.map((car) => (
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
