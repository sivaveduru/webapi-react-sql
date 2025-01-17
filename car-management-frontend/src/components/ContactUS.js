import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactUs.css"; // Custom styles for Contact Us page

const ContactUs = () => {
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
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Your Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-custom w-100">
                Send Message
              </button>
            </form>
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
