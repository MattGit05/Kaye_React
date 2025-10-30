import React from 'react';

const cardData = [
  { title: 'Total Spent', amount: '$2,850.75', color: '#28a745', icon: '💰' },
  { title: 'Budget Remaining', amount: '$2,100.00', color: '#ffc107', icon: '✅' },
  { title: 'Total Reimbursable', amount: '$1,200.00', color: '#007bff', icon: '✉️' },
];

const cardStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  marginTop: '-120px', // Pull the stats bar up onto the hero image
  position: 'relative',
  zIndex: 10,
};

const StatCard = ({ title, amount, color, icon }) => (
  <div style={{ 
    backgroundColor: 'white', 
    padding: '20px', 
    borderRadius: '8px', 
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
    width: '30%',
    textAlign: 'left',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <span style={{ fontSize: '1.5em', marginRight: '10px', color: color }}>{icon}</span>
      <h3 style={{ margin: 0, fontSize: '1em', color: '#6c757d' }}>{title}</h3>
    </div>
    <p style={{ fontSize: '1.8em', fontWeight: 'bold', margin: '5px 0', color: '#343a40' }}>{amount}</p>
  </div>
);

const StatsBar = () => {
  return (
    <div style={cardStyles}>
      {cardData.map((data, index) => (
        <StatCard key={index} {...data} />
      ))}
    </div>
  );
};

// export default StatsBar;