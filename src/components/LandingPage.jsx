import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <div className="landing-hero">
        <div className="landing-content">
          <h1 className="landing-title">Conference Expense Planner</h1>
          <p className="landing-subtitle">
            Plan your next conference effortlessly — select rooms, meals, and add-ons
            to get an instant, accurate cost summary.
          </p>
          <button className="landing-button" onClick={() => navigate("/planner")}>
            Get Started
          </button>
        </div>
      </div>

      {/* Three Cards Section */}
      <section className="cards-section">
        <h2 className="cards-title">What You Can Do Inside</h2>
        <div className="cards-container">
          <div className="card">
            <div className="card-icon">🏢</div>
            <h3>Venue Selection</h3>
            <p>
              Choose from multiple rooms and halls based on capacity and event type. 
              Easily match your venue to your needs.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">🍽️</div>
            <h3>Meals & Catering</h3>
            <p>
              Plan buffet meals, snack packs, or beverage options for your guests, 
              making catering easy and customizable.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">💰</div>
            <h3>Expense Summary</h3>
            <p>
              Get a clear, instant breakdown of all costs including rooms, meals, 
              and add-ons. Keep your budget under control effortlessly.
            </p>
          </div>
        </div>
      </section>

      <div className="landing-bg-overlay"></div>
    </div>
  );
};

export default LandingPage;
