import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';
import './Patient.css'; 

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to BrightSmile Dental</h1>
        <p>Expert dental care with a gentle touch. Your smile is our top priority.</p>
        <div className="hero-actions">
          <Link to="/book">
            <Button variant="primary">Book a Visit</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Patient Portal</Button>
          </Link>
        </div>
      </section>

      <section className="services-overview">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>General Checkups</h3>
            <p>Comprehensive exams and cleanings to keep your teeth healthy.</p>
          </div>
          <div className="service-card">
            <h3>Cosmetic Dentistry</h3>
            <p>Teeth whitening, veneers, and complete smile makeovers.</p>
          </div>
          <div className="service-card">
            <h3>Emergency Care</h3>
            <p>Fast, responsive treatment for unexpected dental pain or injuries.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
