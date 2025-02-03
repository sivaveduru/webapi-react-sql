import axios from "axios";
import React, { useState, useEffect } from "react";

const User = () => {
  const [userName, setUserName] = useState("");
  const [testDriveDetails, setTestDriveDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    carModel: "",
    preferredDate: "",
  });

  const [thankYouMessage, setThankYouMessage] = useState(false); // State for Thank You message

  // Fetch the user name from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestDriveDetails({
      ...testDriveDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the backend API (e.g., your /api/TestDrive endpoint)
      const response = await axios.post(
        "https://localhost:7242/api/TestDrive",
        testDriveDetails
      );

      if (response.status === 200) {
        alert("Test Drive Request Submitted!");

        // Show the thank you message
        setThankYouMessage(true);

        // Clear form fields after submission
        setTestDriveDetails({
          fullName: "",
          email: "",
          phone: "",
          carModel: "",
          preferredDate: "",
        });

        // Hide the thank you message after 5 seconds
        setTimeout(() => setThankYouMessage(false), 5000);
      }
    } catch (error) {
      alert("There was an error submitting your request. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">Welcome, {userName}!</h1>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-4">
            <div className="card-body">
              <h3 className="text-center mb-4 text-info">
                Request a Test Drive
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="fullName"
                    name="fullName"
                    value={testDriveDetails.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    name="email"
                    value={testDriveDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="phone"
                    name="phone"
                    value={testDriveDetails.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="carModel" className="form-label">
                    Car Model
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="carModel"
                    name="carModel"
                    value={testDriveDetails.carModel}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="preferredDate" className="form-label">
                    Preferred Test Drive Date
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    id="preferredDate"
                    name="preferredDate"
                    value={testDriveDetails.preferredDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-3"
                >
                  Submit Request
                </button>
              </form>

              {/* Show the thank you message if the form is submitted successfully */}
              {thankYouMessage && (
                <div className="mt-3 alert alert-success text-center">
                  <strong>Thank you for your test drive request!</strong> We
                  will get back to you soon.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
