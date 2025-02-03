import React, { useEffect, useState } from "react";
import carService from "./services/CarService.js"; // CarService for API requests

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
  const [editingCar, setEditingCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [showSearch, setShowSearch] = useState(false); // State for toggling search and form

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await carService.getCars();
        setCars(carsData);
      } catch (error) {
        setError("Error fetching cars");
      }
    };
    fetchCars();
  }, []);

  const handleDeleteCar = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
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

  const handleUpdateCar = async () => {
    try {
      const updatedData = await carService.updateCar(editingCar.id, editingCar);
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === editingCar.id ? { ...car, ...updatedData } : car
        )
      );
      setEditingCar(null);
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

  // Filter cars based on search term (name or year)
  const filteredCars = cars.filter(
    (car) =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year.toString().includes(searchTerm)
  );

  return (
    <div className="container">
      <h1 className="mt-4 text-center text-primary">Manage Cars</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Toggle Button */}
      <button
        className="btn btn-info mb-4"
        onClick={() => setShowSearch(!showSearch)}
      >
        {showSearch ? "Show Add Car Form" : "Show Search"}
      </button>

      {/* Conditionally render the search input or the form */}
      {showSearch ? (
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by car name or year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      ) : (
        <div className="card shadow p-4 mt-4">
          <h3 className="text-center text-success">Add New Car</h3>
          <div className="row">
            <div className="col-md-6 mx-auto">
              {["make", "model", "year", "price", "dealerID"].map((field) => (
                <input
                  key={field}
                  type="text"
                  className="form-control mb-3"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={newCar[field]}
                  onChange={(e) => handleInputChange(e, field)}
                />
              ))}
              <button className="btn btn-primary w-100" onClick={handleAddCar}>
                Add Car
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Car Form - Displayed Below Add Form */}
      {editingCar && (
        <div className="card shadow p-4 mt-4">
          <h3 className="text-center text-warning">Edit Car</h3>
          <div className="row">
            <div className="col-md-6 mx-auto">
              {["make", "model", "year", "price", "dealerID"].map((field) => (
                <input
                  key={field}
                  type="text"
                  className="form-control mb-3"
                  value={editingCar[field]}
                  onChange={(e) => handleInputChange(e, field)}
                />
              ))}
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-success w-50"
                  onClick={handleUpdateCar}
                >
                  Update Car
                </button>
                <button
                  className="btn btn-secondary w-50 ms-2"
                  onClick={() => setEditingCar(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Car List */}
      <div className="mt-4">
        <h2 className="text-center text-secondary">Car List</h2>
        <div className="row">
          {filteredCars.map((car) => (
            <div className="col-md-4 mb-4" key={car.id}>
              <div className="card shadow-sm p-3">
                <h5 className="card-title text-primary">
                  {car.make} {car.model}
                </h5>
                <p className="card-text">Year: {car.year}</p>
                <p className="card-text">Price: ${car.price}</p>
                <p className="card-text">Dealer ID: {car.dealerID}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditCar(car)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteCar(car.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarManagement;
