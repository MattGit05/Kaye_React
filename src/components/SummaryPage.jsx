import React from "react";

const SummaryPage = ({ data }) => {
  if (!data) return <div className="text-center p-10">No data found.</div>;

  return (
    <div className="p-10 bg-gray-100 min-h-screen text-center">
      <h2 className="text-3xl font-bold mb-6">Expense Summary</h2>

      <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6">
        <p><strong>Room:</strong> {data.selectedRoom?.name} - ₱{data.selectedRoom?.price}</p>
        <p><strong>Meal:</strong> {data.selectedMeal?.name} - ₱{data.selectedMeal?.price}</p>
        <p><strong>Add-ons:</strong></p>
        <ul className="list-disc list-inside mb-4">
          {data.selectedAddons.map((a) => (
            <li key={a.id}>{a.name} - ₱{a.price}</li>
          ))}
        </ul>
        <h3 className="text-2xl font-bold mt-4">Total: ₱{data.total}</h3>
      </div>
    </div>
  );
};

export default SummaryPage;
