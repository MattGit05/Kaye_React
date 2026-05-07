import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductSelection.css";

/* ================= ROOMS ================= */
const rooms = [
  { id: 1, name: "Conference Room", capacity: 15, price: 1500, img: "/images/Conference_Room.png" },
  { id: 2, name: "Auditorium Hall", capacity: 200, price: 5500, img: "/images/Auditorium_hall.png" },
  { id: 3, name: "Presentation Room", capacity: 50, price: 3500, img: "/images/Presentation_room.png" },
  { id: 4, name: "Large Meeting Room", capacity: 10, price: 1000, img: "/images/Large-room.png" },
  { id: 5, name: "Small Meeting Room", capacity: 5, price: 800, img: "/images/Small-room.png" },
  { id: 6, name: "Brainstorming Room", capacity: 7, price: 800, img: "/images/Brain-storming.png" },
];

/* ================= ADDONS ================= */
const addOns = [
  { id: 1, name: "Projector", price: 800, img: "/images/Projector.jpg" },
  { id: 2, name: "Sound System", price: 1500, img: "/images/SoundSystem.jpg" },
  { id: 3, name: "Microphones", price: 500, img: "/images/Microphones.jpg" },
];

/* ================= MEALS ================= */
const meals = [
  { id: 1, name: "Buffet Meal", price: 300, img: "/images/buffet.jpg" },
  { id: 2, name: "Snack Pack", price: 150, img: "/images/snack.jpg" },
  { id: 3, name: "Beverage Package", price: 100, img: "/images/beverage.jpg" },
];

const ProductSelection = ({ onNext }) => {

  const [quantities, setQuantities] = useState({});
  const [addonsQty, setAddonsQty] = useState({});
  const [mealsQty, setMealsQty] = useState({});
  const [activeModal, setActiveModal] = useState(null);

  /* ================= TOTAL VENUE CAPACITY ================= */

  const totalCapacity = rooms.reduce(
    (sum, room) => sum + (quantities[room.id] || 0) * room.capacity,
    0
  );

  /* ================= TOTAL MEALS SELECTED ================= */

  const totalMealsSelected = Object.values(mealsQty).reduce(
    (sum, qty) => sum + qty,
    0
  );

  /* ================= CONTROLS ================= */

const handleIncrement = (id, setFunc, type = "normal") => {
  setFunc(prev => {

    const currentQty = prev[id] || 0;

    // ✅ limit EACH meal item individually
    if (type === "meal") {
      if (totalCapacity === 0) return prev;

      // stop only this specific meal item
      if (currentQty >= totalCapacity) return prev;
    }

    return { ...prev, [id]: currentQty + 1 };
  });
};

  const handleDecrement = (id, setFunc) => {
    setFunc(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0)
    }));
  };

  /* ================= TOTAL COSTS ================= */

  const totalRooms = rooms.reduce(
    (sum, room) => sum + (quantities[room.id] || 0) * room.price,
    0
  );

  const totalAddOns = addOns.reduce(
    (sum, a) => sum + (addonsQty[a.id] || 0) * a.price,
    0
  );

  const totalMeals = meals.reduce(
    (sum, m) => sum + (mealsQty[m.id] || 0) * m.price,
    0
  );

  const total = totalRooms + totalAddOns + totalMeals;
  const navigate = useNavigate();
  /* ================= UI ================= */

  return (
    <div className="planner-container">

      {/* NAVBAR */}
      <nav className="planner-navbar">
        <div className="logo">Conference Expense Planner</div>

        <ul>
          <li><span>Venue</span></li>
          <li onClick={() => setActiveModal("addons")}>Add-ons</li>
          <li onClick={() => setActiveModal("meals")}>Meals</li>
        </ul>

        <button
          className="details-btn"
          onClick={() => setActiveModal("details")}
        >
          Show Details
        </button>
      </nav>

      {/* VENUE SELECTION */}
      <h2 className="planner-title">Venue Room Selection</h2>

      <div className="room-grid">
        {rooms.map(room => (
          <div key={room.id} className="room-card">
            <img src={room.img} alt={room.name} />

            <div className="room-content">
              <h3>{room.name}</h3>
              <p>Capacity: {room.capacity}</p>
              <p className="price">₱{room.price}</p>

              <div className="quantity-controls">
                <button onClick={() => handleDecrement(room.id, setQuantities)}>-</button>
                <span>{quantities[room.id] || 0}</span>
                <button onClick={() => handleIncrement(room.id, setQuantities)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="total-section">
        <h3>Venue Capacity: {totalCapacity}</h3>
        <h3>Total Cost: ₱{total.toLocaleString()}</h3>

       <button
        onClick={() => {
          navigate("/summary", {
            state: {
              quantities,
              addonsQty,
              mealsQty,
              total,
              totalCapacity
            }
          });
        }}
      >
        Proceed to Summary
      </button>
      </div>

      {/* ================= ADDONS MODAL ================= */}
      {activeModal === "addons" && (
        <div className="summary-modal">
          <div className="modal-content grid-modal">
            <h2>Add-ons</h2>

            <div className="grid-items">
              {addOns.map(addon => (
                <div key={addon.id} className="grid-card">
                  <img src={addon.img} alt={addon.name} />
                  <h4>{addon.name}</h4>
                  <p>₱{addon.price}</p>

                  <div className="modal-qty-controls">
                    <button onClick={() => handleDecrement(addon.id, setAddonsQty)}>-</button>
                    <span>{addonsQty[addon.id] || 0}</span>
                    <button onClick={() => handleIncrement(addon.id, setAddonsQty)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <button className="close-btn" onClick={() => setActiveModal(null)}>Close</button>
          </div>
        </div>
      )}

      {/* ================= MEALS MODAL ================= */}
      {activeModal === "meals" && (
        <div className="summary-modal">
          <div className="modal-content grid-modal">

            <h2>Meals Selection</h2>

            <p>
              Max Meals Allowed: <strong>{totalCapacity}</strong>
            </p>

            <p>
              Selected Meals,Snacks and Beverages: <strong>{totalMealsSelected}</strong>
            </p>

            <div className="grid-items">
              {meals.map(meal => (
                <div key={meal.id} className="grid-card">
                  <img src={meal.img} alt={meal.name} />
                  <h4>{meal.name}</h4>
                  <p>₱{meal.price}</p>

                  <div className="modal-qty-controls">
                    <button onClick={() => handleDecrement(meal.id, setMealsQty)}>-</button>

                    <span>{mealsQty[meal.id] || 0}</span>

                    <button
                      onClick={() =>
                        handleIncrement(meal.id, setMealsQty, "meal")
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="close-btn" onClick={() => setActiveModal(null)}>Close</button>
          </div>
        </div>
      )}

       {/* ================= DETAILS MODAL ================= */}
{activeModal === "details" && (
  <div className="summary-modal">
    <div className="modal-content">

      <h2>Booking Summary</h2>

      {/* VENUES */}
      <h3>Selected Rooms</h3>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Room</th>
            <th>Qty</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {rooms
            .filter(r => quantities[r.id])
            .map(room => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{quantities[room.id]}</td>
                <td>
                  ₱{(quantities[room.id] * room.price).toLocaleString()}
                </td>
              </tr>
          ))}
        </tbody>
      </table>

      {/* ADDONS */}
      <h3>Add-ons</h3>
      <table className="summary-table">
        <tbody>
          {addOns
            .filter(a => addonsQty[a.id])
            .map(addon => (
              <tr key={addon.id}>
                <td>{addon.name}</td>
                <td>{addonsQty[addon.id]}</td>
                <td>
                  ₱{(addonsQty[addon.id] * addon.price).toLocaleString()}
                </td>
              </tr>
          ))}
        </tbody>
      </table>

      {/* MEALS */}
      <h3>Meals</h3>
      <table className="summary-table">
        <tbody>
          {meals
            .filter(m => mealsQty[m.id])
            .map(meal => (
              <tr key={meal.id}>
                <td>{meal.name}</td>
                <td>{mealsQty[meal.id]}</td>
                <td>
                  ₱{(mealsQty[meal.id] * meal.price).toLocaleString()}
                </td>
              </tr>
          ))}
        </tbody>
      </table>

      <h3 className="summary-total">
        GRAND TOTAL: ₱{total.toLocaleString()}
      </h3>

      <button
        className="close-btn"
        onClick={() => setActiveModal(null)}
      >
        Close
      </button>

    </div>
  </div>
)}
    </div>
  );
};

export default ProductSelection;