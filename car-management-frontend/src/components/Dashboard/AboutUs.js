import React from "react";

const AboutUs = () => {
  return (
    <div className="about-container py-5 bg-light">
      <div className="container">
        <h1 className="text-center mb-4 text-primary fw-bold">About Us</h1>
        <p className="text-center lead text-muted">
          We are passionate about revolutionizing the way people manage their
          cars. Our mission is to provide a seamless and efficient platform for
          car management with a focus on simplicity and user experience.
        </p>

        <div className="row mt-5">
          <div className="col-md-6">
            <div className="card shadow border-0 p-4">
              <h3 className="text-primary">Our Mission</h3>
              <p>
                At Car Management App, we aim to empower car owners,
                dealerships, and automotive enthusiasts with the tools they need
                to manage their vehicles effortlessly. Whether you're a car
                enthusiast or a business owner, our app provides a streamlined
                solution for your needs.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow border-0 p-4">
              <h3 className="text-primary">Our Vision</h3>
              <p>
                Our vision is to become the leading car management solution, not
                just an app, but a community of like-minded individuals
                passionate about cars and technology. We believe in creating an
                environment where car owners can easily manage and track their
                vehicles while making smarter, more informed decisions.
              </p>
            </div>
          </div>
        </div>

        <div className="team-section mt-5">
          <h3 className="text-center text-primary fw-bold">Meet The Team</h3>
          <div className="row mt-4 text-center">
            <div className="col-md-4">
              <div className="card shadow border-0 p-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member 1"
                  className="rounded-circle mx-auto d-block"
                />
                <h4 className="mt-3">John Doe</h4>
                <p className="text-muted">Founder & CEO</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow border-0 p-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member 2"
                  className="rounded-circle mx-auto d-block"
                />
                <h4 className="mt-3">Jane Smith</h4>
                <p className="text-muted">Lead Developer</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow border-0 p-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member 3"
                  className="rounded-circle mx-auto d-block"
                />
                <h4 className="mt-3">Chris Johnson</h4>
                <p className="text-muted">Product Designer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <p className="lead text-muted">
            We're here to make your car ownership experience smoother and more
            enjoyable. Join us on our journey and let's build something amazing!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
