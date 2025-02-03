import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is loaded
import Logo from "./images/Logo.png";
import Logo2 from "./images/Logo2.png";

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterOption, setFilterOption] = useState("priceLowToHigh");

  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7242/api/Car");
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (err) {
        setError("Error fetching car data");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleFilter = () => {
    let filtered = [...cars];

    if (search) {
      filtered = filtered.filter((car) => {
        const make = car.make?.toLowerCase() || "";
        const model = car.model?.toLowerCase() || "";
        const features = car.features?.toLowerCase() || "";
        return (
          make.includes(search.toLowerCase()) ||
          model.includes(search.toLowerCase()) ||
          features.includes(search.toLowerCase())
        );
      });
    }

    if (filterOption === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filterOption === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filterOption === "newestToOldest") {
      filtered.sort((a, b) => b.year - a.year);
    } else if (filterOption === "oldestToNewest") {
      filtered.sort((a, b) => a.year - b.year);
    }

    setFilteredCars(filtered);
  };

  const openModal = (imageUrl) => {
    setCurrentImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <div className="row align-items-center text-center">
        <div className="col-md-4">
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid rounded shadow"
            style={{ width: "300px", cursor: "pointer" }}
            onClick={() => openModal(Logo)}
          />
        </div>
        <div className="col-md-4">
          <h1 className="text-primary fw-bold">Car Management System</h1>
          <p className="lead text-muted">
            Manage cars, register as a dealer or customer, and explore the best
            deals.
          </p>
        </div>
        <div className="col-md-4">
          <img
            src={Logo2}
            alt="Logo2"
            className="img-fluid rounded shadow"
            style={{ width: "300px", cursor: "pointer" }}
            onClick={() => openModal(Logo2)}
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className="mt-5 bg-light p-4 rounded shadow-sm">
        <h3 className="text-dark fw-bold">Filter Cars</h3>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search (Brand, Model, Features)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-4">
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
          <div className="col-md-4">
            <button onClick={handleFilter} className="btn btn-primary w-100">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Featured Cars */}
      <h2 className="mt-5 text-center text-secondary fw-bold">Featured Cars</h2>
      {loading && <div className="text-center my-3">Loading cars...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mt-4">
        {filteredCars.length === 0 && !loading ? (
          <p className="text-center text-muted">
            No cars available at the moment.
          </p>
        ) : (
          filteredCars.map((car) => (
            <div className="col-md-4 mb-4" key={car.id}>
              <div className="card border-0 shadow-lg p-3">
                <h5 className="card-title text-primary">
                  {car.make} {car.model}
                </h5>
                <p className="card-text text-muted">
                  Year: {car.year} <br />
                  Price: <strong className="text-success">${car.price}</strong>
                </p>
                <Link
                  to={`/cars/${car.id}`}
                  className="btn btn-outline-primary w-100"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Image View */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={currentImage}
                  alt="Large View"
                  className="img-fluid rounded"
                  style={{ maxHeight: "80vh", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
