import React, { useState } from "react";
import "./ProductSelection.css";

  const rooms = [
    { id: 1, name: "Conference Room", capacity: 15, price: 1500, img: "/images/Conference_Room.png" },
    { id: 2, name: "Auditorium Hall", capacity: 200, price: 5500, img: "/images/Auditorium_hall.png" },
    { id: 3, name: "Presentation Room", capacity: 50, price: 3500, img: "/images/Presentation_room.png" },
    { id: 4, name: "Large Meeting Room", capacity: 10, price: 1000, img: "/images/Large-room.png" },
    { id: 5, name: "Small Meeting Room", capacity: 5, price: 800, img: "/images/Small-room.png" },
    { id: 6, name: "Small Meeting Room", capacity: 7, price: 800, img: "/images/Brain-storming.png" },
  ];

const addOns = [
  { id: 1, name: "Projector", price: 800, img: "/images/Projector.jpg" },
  { id: 2, name: "Sound System", price: 1500, img: "/images/SoundSystem.jpg" },
  { id: 3, name: "Microphones", price: 500, img: "/images/Microphones.jpg" },
];

const meals = [
  { id: 1, name: "Buffet Meal", price: 300, img: "/images/buffet.jpg" },
  { id: 2, name: "Snack Pack", price: 150, img: "/images/snack.jpg" },
  { id: 3, name: "Beverage Package", price: 100, img: "/images/beverage.jpg" },
];

const ProductSelection = ({ onNext }) => {
  const [quantities, setQuantities] = useState({});
  const [addonsQty, setAddonsQty] = useState({});
  const [mealsQty, setMealsQty] = useState({});
  const [activeModal, setActiveModal] = useState(null); // 'addons', 'meals', 'details', or null

  const handleIncrement = (id, setFunc) => {
    setFunc((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id, setFunc) => {
    setFunc((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

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

  return (
    <div className="planner-container">
      {/* Navbar */}
      <nav className="planner-navbar">
        <div className="logo">Conference Expense Planner</div>
        <ul>
          <li><span>Venue</span></li>
          <li onClick={() => setActiveModal("addons")}>Add-ons</li>
          <li onClick={() => setActiveModal("meals")}>Meals</li>
        </ul>
        <button className="details-btn" onClick={() => setActiveModal("details")}>
          Show Details
        </button>
      </nav>

      {/* Header */}
      <h2 className="planner-title">Venue Room Selection</h2>

      {/* Room Container */}
      <div className="room-container">
        <div className="room-grid">
          {rooms.map((room) => (
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
      </div>

      {/* Total Section */}
      <div className="total-section">
        <h3>Total Cost: ₱{total.toLocaleString()}</h3>
        <button onClick={() => onNext({ quantities, addonsQty, mealsQty, total })} className="next-btn">
          Proceed to Summary
        </button>
      </div>

      {/* --- Modals --- */}
{activeModal === "addons" && (
  <div className="summary-modal">
    <div className="modal-content">
      <h2>Add-ons</h2>

      <div className="modal-grid">
        {addOns.map((a) => (
          <div key={a.id} className="modal-item">
            <img src={a.img} alt={a.name} />
            <div className="modal-details">
              <h4>{a.name}</h4>
              <p>₱{a.price}</p>
              <div className="modal-qty-controls">
                <button onClick={() => handleDecrement(a.id, setAddonsQty)}>-</button>
                <span>{addonsQty[a.id] || 0}</span>
                <button onClick={() => handleIncrement(a.id, setAddonsQty)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD-ONS TOTAL */}
      <div className="modal-total">
        <h3>Total Add-ons Cost: ₱{totalAddOns.toLocaleString()}</h3>
      </div>

      <button onClick={() => setActiveModal(null)}>Close</button>
    </div>
  </div>
)}

      {/* Meals Modal */}
     {activeModal === "meals" && (
  <div className="summary-modal">
    <div className="modal-content">
      <h2>Meals</h2>

      <div className="modal-grid">
        {meals.map((m) => (
          <div key={m.id} className="modal-item">
            <img src={m.img} alt={m.name} />
            <div className="modal-details">
              <h4>{m.name}</h4>
              <p>₱{m.price}</p>
              <div className="modal-qty-controls">
                <button onClick={() => handleDecrement(m.id, setMealsQty)}>-</button>
                <span>{mealsQty[m.id] || 0}</span>
                <button onClick={() => handleIncrement(m.id, setMealsQty)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MEALS TOTAL */}
      <div className="modal-total">
        <h3>Total Meals Cost: ₱{totalMeals.toLocaleString()}</h3>
      </div>

      <button onClick={() => setActiveModal(null)}>Close</button>
    </div>
  </div>
)}


    {/* Show Details Modal */}
{activeModal === "details" && (
  <div className="summary-modal">
    <div className="modal-content scrollable">
      <h2>Order Summary</h2>

      <div className="table-wrapper">
        <table className="summary-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {/* Rooms */}
            {rooms.map((room) =>
              quantities[room.id] ? (
                <tr key={`room-${room.id}`}>
                  <td>Room</td>
                  <td>{room.name}</td>
                  <td>{quantities[room.id]}</td>
                  <td>₱{room.price.toLocaleString()}</td>
                  <td>₱{(room.price * quantities[room.id]).toLocaleString()}</td>
                </tr>
              ) : null
            )}

            {/* Add-ons */}
            {addOns.map((a) =>
              addonsQty[a.id] ? (
                <tr key={`addon-${a.id}`}>
                  <td>Add-on</td>
                  <td>{a.name}</td>
                  <td>{addonsQty[a.id]}</td>
                  <td>₱{a.price.toLocaleString()}</td>
                  <td>₱{(a.price * addonsQty[a.id]).toLocaleString()}</td>
                </tr>
              ) : null
            )}

            {/* Meals */}
            {meals.map((m) =>
              mealsQty[m.id] ? (
                <tr key={`meal-${m.id}`}>
                  <td>Meal</td>
                  <td>{m.name}</td>
                  <td>{mealsQty[m.id]}</td>
                  <td>₱{m.price.toLocaleString()}</td>
                  <td>₱{(m.price * mealsQty[m.id]).toLocaleString()}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>

      <hr className="summary-divider" />

      <div className="summary-total">
        <p><strong>Rooms:</strong> ₱{totalRooms.toLocaleString()}</p>
        <p><strong>Add-ons:</strong> ₱{totalAddOns.toLocaleString()}</p>
        <p><strong>Meals:</strong> ₱{totalMeals.toLocaleString()}</p>
        <h3>Total: ₱{total.toLocaleString()}</h3>
      </div>

      <button onClick={() => setActiveModal(null)} className="close-btn">Close</button>
    </div>
  </div>
)}

    </div>
  );
};

export default ProductSelection;
