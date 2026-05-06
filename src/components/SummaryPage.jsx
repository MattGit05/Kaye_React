import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SummaryPage.css";

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return (
      <div className="summary-empty">
        <h2>No booking data found</h2>
        <button onClick={() => navigate("/planner")}>
          Go Back
        </button>
      </div>
    );
  }

  const { quantities, addonsQty, mealsQty, total, totalCapacity } = data;

  return (
    <div className="summary-container">

      <h1 className="summary-title">Booking Summary</h1>

      {/* TOP STATS */}
      <div className="summary-stats">
        <div className="stat-card">
          <h3>Total Capacity</h3>
          <p>{totalCapacity}</p>
        </div>

        <div className="stat-card highlight">
          <h3>Total Price</h3>
          <p>₱{total.toLocaleString()}</p>
        </div>
      </div>

      {/* ROOMS */}
      <div className="summary-section">
        <h2>Selected Rooms</h2>

        {Object.keys(quantities).length === 0 ? (
          <p className="empty-text">No rooms selected</p>
        ) : (
          <div className="summary-list">
            {Object.entries(quantities).map(([id, qty]) => (
              qty > 0 && (
                <div key={id} className="summary-item">
                  <span>Room ID: {id}</span>
                  <span>Qty: {qty}</span>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* ADD-ONS */}
      <div className="summary-section">
        <h2>Add-ons</h2>

        {Object.keys(addonsQty).length === 0 ? (
          <p className="empty-text">No add-ons selected</p>
        ) : (
          <div className="summary-list">
            {Object.entries(addonsQty).map(([id, qty]) => (
              qty > 0 && (
                <div key={id} className="summary-item">
                  <span>Item ID: {id}</span>
                  <span>Qty: {qty}</span>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* MEALS */}
      <div className="summary-section">
        <h2>Meals</h2>

        {Object.keys(mealsQty).length === 0 ? (
          <p className="empty-text">No meals selected</p>
        ) : (
          <div className="summary-list">
            {Object.entries(mealsQty).map(([id, qty]) => (
              qty > 0 && (
                <div key={id} className="summary-item">
                  <span>Meal ID: {id}</span>
                  <span>Qty: {qty}</span>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* BUTTONS */}
      <div className="summary-buttons">
        <button onClick={() => navigate("/planner")} className="back-btn">
          Back to Planner
        </button>

        <button onClick={() => navigate("/planner")} className="back-btn">
          Confirm Booking
        </button>
      </div>

    </div>
  );
};

export default SummaryPage;