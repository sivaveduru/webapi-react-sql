import React, { useState } from "react";
import axios from "axios"; // To make HTTP requests

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://localhost:7242/api/Contact", {
        name,
        email,
        message,
      });

      if (response.status === 200) {
        setSuccess("Thank you for reaching out! We'll get back to you soon.");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      setError("Error sending message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">Get in Touch with Us</h1>
        <p className="text-muted">
          We’re here to help! If you have any questions, feedback, or just want
          to say hi, feel free to reach out to us.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="p-4 shadow rounded bg-light">
            <h3 className="text-center text-primary">Contact Information</h3>
            <ul className="list-unstyled mt-3">
              <li>
                <strong>Email:</strong> support@carapp.com
              </li>
              <li>
                <strong>Phone:</strong> +1 (800) 123-4567
              </li>
              <li>
                <strong>Address:</strong> 123 Car Ave, Suite 101, Vehicle City,
                CA 90001
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-4 shadow rounded bg-white">
            <h3 className="text-center text-primary">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">
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

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
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

              <div className="mb-3">
                <label htmlFor="message" className="form-label fw-bold">
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

              <button
                type="submit"
                className="btn btn-primary w-100"
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
      </div>
    </div>
  );
};

export default ContactUs;
