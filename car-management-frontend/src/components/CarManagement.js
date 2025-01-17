import React, { useEffect, useState } from "react";
import carService from "../services/carService"; // Assuming carService handles car CRUD operations
import "bootstrap/dist/css/bootstrap.min.css";
import "./CarManagement.css"; // Importing custom styles

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    dealerID: "",
  });
  const [editingCar, setEditingCar] = useState(null); // For edit functionality

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await carService.getCars();
        setCars(carsData);
      } catch (error) {
        setError("Error fetching cars");
        console.error(error);
      }
    };
    fetchCars();
  }, []);

  const handleDeleteCar = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (confirmDelete) {
      try {
        await carService.deleteCar(id);
        setCars((prevCars) => prevCars.filter((car) => car.id !== id));
      } catch (error) {
        setError("Error deleting car");
      }
    }
  };

  const handleAddCar = async () => {
    try {
      const carData = await carService.createCar(newCar);
      setCars((prevCars) => [...prevCars, carData]);
      setNewCar({ make: "", model: "", year: "", price: "", dealerID: "" });
    } catch (error) {
      setError("Error adding car");
    }
  };

  const handleEditCar = (car) => {
    setEditingCar(car);
  };

  const handleUpdateCar = async (id, updatedCar) => {
    try {
      const updatedData = await carService.updateCar(id, updatedCar);
      setCars((prevCars) =>
        prevCars.map((car) => (car.id === id ? updatedData : car))
      );
      setEditingCar(null); // Close the edit mode
    } catch (error) {
      setError("Error updating car");
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (editingCar) {
      setEditingCar({ ...editingCar, [field]: value });
    } else {
      setNewCar({ ...newCar, [field]: value });
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Manage Cars</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Add Car Form */}
      <h2 className="mt-4">Add New Car</h2>
      <div className="row">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Make"
            value={newCar.make}
            onChange={(e) => handleInputChange(e, "make")}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Model"
            value={newCar.model}
            onChange={(e) => handleInputChange(e, "model")}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Year"
            value={newCar.year}
            onChange={(e) => handleInputChange(e, "year")}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Price"
            value={newCar.price}
            onChange={(e) => handleInputChange(e, "price")}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Dealer ID"
            value={newCar.dealerID}
            onChange={(e) => handleInputChange(e, "dealerID")}
          />
          <button className="btn btn-primary" onClick={handleAddCar}>
            Add Car
          </button>
        </div>
      </div>

      {/* Edit Car Form */}
      {editingCar && (
        <div className="mt-4">
          <h2>Edit Car</h2>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-3"
                value={editingCar.make}
                onChange={(e) => handleInputChange(e, "make")}
              />
              <input
                type="text"
                className="form-control mb-3"
                value={editingCar.model}
                onChange={(e) => handleInputChange(e, "model")}
              />
              <input
                type="text"
                className="form-control mb-3"
                value={editingCar.year}
                onChange={(e) => handleInputChange(e, "year")}
              />
              <input
                type="text"
                className="form-control mb-3"
                value={editingCar.price}
                onChange={(e) => handleInputChange(e, "price")}
              />
              <input
                type="text"
                className="form-control mb-3"
                value={editingCar.dealerID}
                onChange={(e) => handleInputChange(e, "dealerID")}
              />
              <button
                className="btn btn-success"
                onClick={() => handleUpdateCar(editingCar.id, editingCar)}
              >
                Update Car
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => setEditingCar(null)} // Close edit mode
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display Car List */}
      <div className="mt-4">
        <h2>Car List</h2>
        <div className="list-group">
          {cars.map((car) => (
            <div
              className="list-group-item car-item d-flex justify-content-between align-items-center"
              key={car.id}
            >
              {/* Full screen: Display the car information in one row */}
              <span className="car-info">
                {car.make} {car.model} ({car.year}) - ${car.price} - Dealer ID:{" "}
                {car.dealerID}
              </span>
              <div>
                <button
                  className="btn btn-warning btn-sm ms-2"
                  onClick={() => handleEditCar(car)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDeleteCar(car.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarManagement;
