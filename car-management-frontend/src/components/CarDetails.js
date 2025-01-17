import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To access route parameters
import axios from "axios"; // For making HTTP requests
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

const CarDetails = () => {
  const { id } = useParams(); // Get the ID from URL params
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        // Make the API request to get car details
        const response = await axios.get(
          `https://localhost:7242/api/Car/${id}`
        );

        // Log the full response data for debugging
        console.log("Car Details Response: ", response.data);

        // If the car object is not in the response, we handle this case
        if (!response.data) {
          setError("No car details found for this ID.");
          return;
        }

        // Set car data after verifying its availability
        setCar(response.data);
      } catch (err) {
        // Enhanced error logging based on response
        console.error("Error fetching car details:", err);

        // Handle errors based on the type of error
        if (err.response) {
          // The server responded with a status code outside 2xx range
          setError(`Error ${err.response.status}: ${err.response.data}`);
        } else if (err.request) {
          // The request was made but no response was received
          setError("Error: No response from the server.");
        } else {
          // Something else went wrong (e.g., network issues)
          setError("Error: " + err.message);
        }
      }
    };

    fetchCar();
  }, [id]); // Re-fetch if the ID changes

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!car) {
    return <div className="alert alert-info">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <img
              src="https://via.placeholder.com/500x300"
              className="card-img-top"
              alt={`${car.make} ${car.model}`}
            />
            <div className="card-body">
              <h3 className="card-title">
                {car.make} {car.model}
              </h3>
              <p className="card-text">Year: {car.year}</p>
              <p className="card-text">
                Price: <strong>${car.price}</strong>
              </p>
              <p className="card-text">
                Dealer ID: {car.dealerId || "Not available"}
              </p>
              <p className="card-text">{car.description}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Contact Dealer</h4>
              <p className="card-text">
                If you're interested in this car, feel free to contact the
                dealer directly using the information below:
              </p>
              <ul>
                <li>
                  <strong>Phone:</strong> {car.dealerPhone || "Not available"}
                </li>
                <li>
                  <strong>Email:</strong> {car.dealerEmail || "Not available"}
                </li>
                <li>
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
