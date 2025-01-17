import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // To make HTTP requests
import "./ContactUs.css"; // Custom styles for Contact Us page

const ContactUs = () => {
  const [name, setName] = useState(""); // State to hold name input
  const [email, setEmail] = useState(""); // State to hold email input
  const [message, setMessage] = useState(""); // State to hold message input
  const [error, setError] = useState(""); // State for errors
  const [success, setSuccess] = useState(""); // State for success message
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post("https://localhost:7242/api/Contact", {
        name,
        email,
        message,
      });

      if (response.status === 200) {
        setSuccess("Thank you for reaching out! We'll get back to you soon.");
        setName(""); // Clear form fields
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      setError("Error sending message. Please try again later.");
      console.error("Error:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="contact-container">
      <div className="container">
        <h1 className="text-center mt-5 contact-title">Get in Touch with Us</h1>
        <p className="text-center contact-description">
          We’re here to help! If you have any questions, feedback, or just want
          to say hi, feel free to reach out to us. We’ll get back to you as soon
          as possible.
        </p>

        <div className="row">
          <div className="col-md-6 contact-info">
            <h3 className="text-center contact-subtitle">
              Contact Information
            </h3>
            <div className="contact-item">
              <strong>Email:</strong>
              <p>support@carapp.com</p>
            </div>
            <div className="contact-item">
              <strong>Phone:</strong>
              <p>+1 (800) 123-4567</p>
            </div>
            <div className="contact-item">
              <strong>Address:</strong>
              <p>123 Car Ave, Suite 101, Vehicle City, CA 90001</p>
            </div>
          </div>

          <div className="col-md-6">
            <h3 className="text-center contact-subtitle">Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Message Input */}
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Your Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-custom w-100"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
            {success && (
              <div className="alert alert-success mt-3">{success}</div>
            )}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
        </div>

        <div className="text-center mt-5">
          <p className="pleasant-text">
            We love hearing from our community! Thank you for reaching out to
            us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
