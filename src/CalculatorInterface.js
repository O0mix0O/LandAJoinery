import React, { useState } from 'react';

const CalculatorSelector = ({ onAddCalculator }) => {
  const [selectedCalculator, setSelectedCalculator] = useState('');
  const [quantities, setQuantities] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);
  const [availableCalculators, setAvailableCalculators] = useState(['door', 'window']);

  const handleCalculatorChange = (e) => {
    setSelectedCalculator(e.target.value);
  };

  const handleAddCalculator = () => {
    if (selectedCalculator !== '') {
      setQuantities((prevQuantities) => {
        return { ...prevQuantities, [selectedCalculator]: 0 };
      });
      setSelectedCalculator('');
      setAvailableCalculators((prevCalculators) => prevCalculators.filter((c) => c !== selectedCalculator));
    }
  };

  const handleQuantityChange = (calculator, quantity) => {
    const updatedQuantities = { ...quantities, [calculator]: quantity };
    setQuantities(updatedQuantities);

    // Recalculate the grand total
    const total = Object.entries(updatedQuantities).reduce((acc, [calc, qty]) => {
      const cost = calculateCost(calc, qty);
      return acc + cost;
    }, 0);
    setGrandTotal(total);
  };

  const handleRemoveCalculator = (calculator) => {
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[calculator];
    setQuantities(updatedQuantities);

    // Recalculate the grand total
    const total = Object.entries(updatedQuantities).reduce((acc, [calc, qty]) => {
      const cost = calculateCost(calc, qty);
      return acc + cost;
    }, 0);
    setGrandTotal(total);

    setAvailableCalculators((prevCalculators) => [...prevCalculators, calculator]);
  };

  const calculateCost = (calculator, quantity) => {
    // Define the cost calculation logic for each calculator type
    if (calculator === 'door') {
      // Cost calculation for doors
      // ...
      // Replace this with your actual door cost calculation logic
      return quantity * 100; // Placeholder cost calculation
    } else if (calculator === 'window') {
      // Cost calculation for windows
      // ...
      // Replace this with your actual window cost calculation logic
      return quantity * 150; // Placeholder cost calculation
    }
    return 0;
  };

  return (
    <div>
      <h2>Calculator Selector</h2>
      <div>
        <label htmlFor="calculator">Select Calculator: </label>
        <select id="calculator" value={selectedCalculator} onChange={handleCalculatorChange}>
          <option value="">Select</option>
          {availableCalculators.map((calculator) => (
            <option key={calculator} value={calculator}>
              {calculator === 'door' ? 'Door Calculator' : 'Window Calculator'}
            </option>
          ))}
        </select>
        <button onClick={handleAddCalculator} disabled={!selectedCalculator}>
          Add Calculator
        </button>
      </div>

      <h2>Calculator List</h2>
      <ul>
        {Object.entries(quantities).map(([calculator, quantity]) => (
          <li key={calculator}>
            {calculator} Calculator - Quantity:{' '}
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(calculator, e.target.value)}
            />
            <button onClick={() => handleRemoveCalculator(calculator)}>Remove</button>
          </li>
        ))}
      </ul>

      <h2>Grand Total: £{grandTotal.toFixed(2)}</h2>
    </div>
  );
};

export default CalculatorSelector;
