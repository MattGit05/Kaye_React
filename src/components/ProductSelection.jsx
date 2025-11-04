import React, { useState, useEffect } from "react";
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
  const [currentAddonIndex, setCurrentAddonIndex] = useState(0);
  const [currentMealIndex, setCurrentMealIndex] = useState(0);

  const handleIncrement = (id, setFunc) => {
    setFunc((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrement = (id, setFunc) => {
    setFunc((prev) => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
  };

  const totalRooms = rooms.reduce((sum, room) => sum + (quantities[room.id] || 0) * room.price, 0);
  const totalAddOns = addOns.reduce((sum, a) => sum + (addonsQty[a.id] || 0) * a.price, 0);
  const totalMeals = meals.reduce((sum, m) => sum + (mealsQty[m.id] || 0) * m.price, 0);
  const total = totalRooms + totalAddOns + totalMeals;

  // Carousel navigation functions
  const nextItem = (list, currentIndex, setFunc) => setFunc((currentIndex + 1) % list.length);
  const prevItem = (list, currentIndex, setFunc) => setFunc((currentIndex - 1 + list.length) % list.length);

  // Auto-advance carousel for Add-ons
  useEffect(() => {
    if (activeModal === "addons") {
      const interval = setInterval(() => nextItem(addOns, currentAddonIndex, setCurrentAddonIndex), 10000);
      return () => clearInterval(interval);
    }
  }, [activeModal, currentAddonIndex]);

  // Auto-advance carousel for Meals
  useEffect(() => {
    if (activeModal === "meals") {
      const interval = setInterval(() => nextItem(meals, currentMealIndex, setCurrentMealIndex), 10000);
      return () => clearInterval(interval);
    }
  }, [activeModal, currentMealIndex]);

  return (
    <div className="planner-container">
      <nav className="planner-navbar">
        <div className="logo">Conference Expense Planner</div>
        <ul>
          <li><span>Venue</span></li>
          <li onClick={() => setActiveModal("addons")}>Add-ons</li>
          <li onClick={() => setActiveModal("meals")}>Meals</li>
        </ul>
        <button className="details-btn" onClick={() => setActiveModal("details")}>Show Details</button>
      </nav>

      <h2 className="planner-title">Venue Room Selection</h2>

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

      <div className="total-section">
        <h3>Total Cost: ₱{total.toLocaleString()}</h3>
        <button onClick={() => onNext({ quantities, addonsQty, mealsQty, total })} className="next-btn">
          Proceed to Summary
        </button>
      </div>

      {/* Add-ons Modal */}
      {activeModal === "addons" && (
        <div className="summary-modal">
          <div className="modal-content carousel-modal">
            <h2>Add-ons</h2>

            <div className="carousel-container">
              <button className="carousel-btn left" onClick={() => prevItem(addOns, currentAddonIndex, setCurrentAddonIndex)}>
                &lt;
              </button>

              <div className="carousel-item">
                <img src={addOns[currentAddonIndex].img} alt={addOns[currentAddonIndex].name} />
                <div className="modal-details">
                  <h4>{addOns[currentAddonIndex].name}</h4>
                  <p>₱{addOns[currentAddonIndex].price}</p>
                  <div className="modal-qty-controls">
                    <button onClick={() => handleDecrement(addOns[currentAddonIndex].id, setAddonsQty)}>-</button>
                    <span>{addonsQty[addOns[currentAddonIndex].id] || 0}</span>
                    <button onClick={() => handleIncrement(addOns[currentAddonIndex].id, setAddonsQty)}>+</button>
                  </div>
                </div>
              </div>

              <button className="carousel-btn right" onClick={() => nextItem(addOns, currentAddonIndex, setCurrentAddonIndex)}>
                &gt;
              </button>
            </div>

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
          <div className="modal-content carousel-modal">
            <h2>Meals</h2>

            <div className="carousel-container">
              <button className="carousel-btn left" onClick={() => prevItem(meals, currentMealIndex, setCurrentMealIndex)}>
                &lt;
              </button>

              <div className="carousel-item">
                <img src={meals[currentMealIndex].img} alt={meals[currentMealIndex].name} />
                <div className="modal-details">
                  <h4>{meals[currentMealIndex].name}</h4>
                  <p>₱{meals[currentMealIndex].price}</p>
                  <div className="modal-qty-controls">
                    <button onClick={() => handleDecrement(meals[currentMealIndex].id, setMealsQty)}>-</button>
                    <span>{mealsQty[meals[currentMealIndex].id] || 0}</span>
                    <button onClick={() => handleIncrement(meals[currentMealIndex].id, setMealsQty)}>+</button>
                  </div>
                </div>
              </div>

              <button className="carousel-btn right" onClick={() => nextItem(meals, currentMealIndex, setCurrentMealIndex)}>
                &gt;
              </button>
            </div>

            <div className="modal-total">
              <h3>Total Meals Cost: ₱{totalMeals.toLocaleString()}</h3>
            </div>

            <button onClick={() => setActiveModal(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Details Modal stays the same */}
      {activeModal === "details" && (
        <div className="summary-modal">
          <div className="modal-content scrollable">
            {/* ... existing order summary table ... */}
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








