import React, { useState } from 'react';
import CalculateDoors from './CalculateDoors';

const DoorCalculator = () => {
  const [numDoors, setNumDoors] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  const calculateCost = () => {
    let total = CalculateDoors(numDoors);
    setTotalCost(total);
  };

  return (
    <div>
      <label htmlFor="numDoors">Number of Doors:</label>
      <input
        type="number"
        id="numDoors"
        value={numDoors}
        onChange={(e) => setNumDoors(Number(e.target.value))}
      />
      <button onClick={calculateCost}>Calculate</button>
      <p>Total Cost: £{totalCost.toFixed(2)}</p>
    </div>
  );
};

export default DoorCalculator;
