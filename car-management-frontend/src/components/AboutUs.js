import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutUs.css"; // Custom styles for About Us page

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="container">
        <h1 className="text-center mt-5 about-title">About Us</h1>
        <p className="text-center about-description">
          We are passionate about revolutionizing the way people manage their
          cars. Our mission is to provide a seamless and efficient platform for
          car management with a focus on simplicity and user experience.
        </p>

        <div className="row">
          <div className="col-md-6">
            <h3 className="about-subtitle">Our Mission</h3>
            <p className="about-text">
              At Car Management App, we aim to empower car owners, dealerships,
              and automotive enthusiasts with the tools they need to manage
              their vehicles effortlessly. Whether you're a car enthusiast or a
              business owner, our app provides a streamlined solution for your
              needs.
            </p>
          </div>

          <div className="col-md-6">
            <h3 className="about-subtitle">Our Vision</h3>
            <p className="about-text">
              Our vision is to become the leading car management solution, not
              just an app, but a community of like-minded individuals,
              passionate about cars and technology. We believe in creating an
              environment where car owners can easily manage and track their
              vehicles while making smarter, more informed decisions.
            </p>
          </div>
        </div>

        <div className="team-section mt-5">
          <h3 className="text-center about-subtitle">Meet The Team</h3>
          <div className="row">
            <div className="col-md-4 team-member">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 1"
                className="team-img"
              />
              <h4 className="team-name">John Doe</h4>
              <p className="team-role">Founder & CEO</p>
            </div>

            <div className="col-md-4 team-member">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 2"
                className="team-img"
              />
              <h4 className="team-name">Jane Smith</h4>
              <p className="team-role">Lead Developer</p>
            </div>

            <div className="col-md-4 team-member">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 3"
                className="team-img"
              />
              <h4 className="team-name">Chris Johnson</h4>
              <p className="team-role">Product Designer</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <p className="about-footer-text">
            We're here to make your car ownership experience smoother and more
            enjoyable. Join us on our journey and let's build something amazing!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
