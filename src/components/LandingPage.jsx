import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to the Dreamy Event Planner ✨</h1>
          <p className="hero-subtitle">
            Create magical conferences with beautiful venues, curated meals, and a
            fully guided budgeting experience.
          </p>
          <button className="hero-btn" onClick={() => navigate("/planner")}>Start Planning</button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2 className="section-title">Plan With Style 💖</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎀</div>
            <h3>Chic Venues</h3>
            <p>Discover aesthetic and modern conference rooms tailored for every occasion.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧁</div>
            <h3>Lovely Catering</h3>
            <p>Pick delightful meals, snacks, and drinks that add charm to your event.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Clear Expenses</h3>
            <p>Instant breakdowns that keep your budget cute, clean, and stress-free.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <h2>Your Perfect Conference Awaits 💗</h2>
        <p>Let us guide you through crafting an event that's beautiful inside and out.</p>
        <button className="cta-btn" onClick={() => navigate("/planner")}>Begin Your Journey</button>
      </section>

    </div>
  );
};

export default LandingPage;
