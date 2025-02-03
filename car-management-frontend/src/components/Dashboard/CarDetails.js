import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7242/api/Car/${id}`
        );
        console.log("Car Details Response: ", response.data);
        if (!response.data) {
          setError("No car details found for this ID.");
          return;
        }
        setCar(response.data);
      } catch (err) {
        console.error("Error fetching car details:", err);
        if (err.response) {
          setError(`Error ${err.response.status}: ${err.response.data}`);
        } else if (err.request) {
          setError("Error: No response from the server.");
        } else {
          setError("Error: " + err.message);
        }
      }
    };

    fetchCar();
  }, [id]);

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-4">Error: {error}</div>
    );
  }

  if (!car) {
    return <div className="alert alert-info text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <img
              src="https://via.placeholder.com/400"
              alt={`${car.make} ${car.model}`}
              className="card-img-top img-fluid rounded"
            />
            <div className="card-body">
              <h3 className="card-title text-primary text-center">
                {car.make} {car.model}
              </h3>
              <p className="card-text text-muted text-center">
                Year: {car.year}
              </p>
              <p className="card-text text-success fw-bold text-center">
                Price: ${car.price}
              </p>
              <p className="card-text text-muted text-center">
                Dealer ID: {car.dealerId || "Not available"}
              </p>
              <p className="card-text text-center">{car.description}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-lg border-0 bg-light">
            <div className="card-body">
              <h4 className="card-title text-primary text-center">
                Contact Dealer
              </h4>
              <p className="card-text text-center">
                If you're interested in this car, feel free to contact the
                dealer directly:
              </p>
              <ul className="list-group list-group-flush text-center">
                <li className="list-group-item">
                  <strong>Phone:</strong> {car.dealerPhone || "Not available"}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {car.dealerEmail || "Not available"}
                </li>
                <li className="list-group-item">
                  <strong>Location:</strong>{" "}
                  {car.dealerLocation || "Not available"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
