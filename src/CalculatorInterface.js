import React, { useState } from "react";
import DoorCostCalculator from "./CostCalculators/doorCostCalculator";
import WindowCostCalculator from "./CostCalculators/windowCostCalculator";

const CalculatorInterface = () => {
  const [selectedCalculators, setSelectedCalculators] = useState([]);
  const [availableCalculators, setAvailableCalculators] = useState([
    { value: "door", label: "Door Calculator" },
    { value: "window", label: "Window Calculator" },
  ]);
  const [productQuantities, setProductQuantities] = useState({});
  const [totalCosts, setTotalCosts] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);

  const handleCalculatorChange = (event) => {
    const selectedCalculator = event.target.value;

    setSelectedCalculators([...selectedCalculators, selectedCalculator]);
    setAvailableCalculators((prevOptions) =>
      prevOptions.filter((option) => option.value !== selectedCalculator)
    );

    event.target.value = ""; // Reset the dropdown to the default value
  };

  const handleQuantityChange = (event, calculator) => {
    const quantity = parseInt(event.target.value, 10) || 0;
    setProductQuantities({
      ...productQuantities,
      [calculator]: quantity,
    });
  };

  const handleCalculate = () => {
    const calculatedCosts = {};

    selectedCalculators.forEach((calculator) => {
      let total = 0;

      if (calculator === "door") {
        total = DoorCostCalculator(productQuantities[calculator]);
      } else if (calculator === "window") {
        total = WindowCostCalculator(productQuantities[calculator]);
      }

      calculatedCosts[calculator] = total;
    });

    setTotalCosts(calculatedCosts);
    calculateGrandTotal(calculatedCosts);
  };

  const removeCalculator = (calculator) => {
    const updatedCalculators = selectedCalculators.filter(
      (selectedCalculator) => selectedCalculator !== calculator
    );
    setSelectedCalculators(updatedCalculators);
    const updatedQuantities = { ...productQuantities };
    delete updatedQuantities[calculator];
    setProductQuantities(updatedQuantities);

    const removedCalculator = availableCalculators.find(
      (option) => option.value === calculator
    );

    if (!removedCalculator) {
      setAvailableCalculators((prevOptions) => [
        ...prevOptions,
        {
          value: calculator,
          label: getCalculatorName(calculator) + " Calculator",
        },
      ]);
    }

    const updatedTotalCosts = { ...totalCosts };
    delete updatedTotalCosts[calculator];
    setTotalCosts(updatedTotalCosts);

    calculateGrandTotal(updatedTotalCosts);
  };

  const calculateGrandTotal = (costs) => {
    const total = Object.values(costs).reduce((acc, val) => acc + val, 0);
    setGrandTotal(total);
  };

  const renderSelectedCalculators = () => {
    return selectedCalculators.map((calculator) => {
      return (
        <div key={calculator}>
          <h3>{getCalculatorName(calculator)} Calculator</h3>
          <label>Quantity:</label>
          <input
            type="number"
            value={productQuantities[calculator] || ""}
            onChange={(event) => handleQuantityChange(event, calculator)}
          />
          <p>Total Cost: ${totalCosts[calculator]}</p>
          <button onClick={() => removeCalculator(calculator)}>
            Remove Calculator
          </button>
        </div>
      );
    });
  };

  const getCalculatorName = (calculator) => {
    switch (calculator) {
      case "door":
        return "Door";
      case "window":
        return "Window";
      default:
        return "";
    }
  };

  return (
    <div>
      <h2>Calculator Interface</h2>
      <label>Select Calculator:</label>
      <select onChange={handleCalculatorChange}>
        <option value="">Select</option>
        {availableCalculators.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {selectedCalculators.length > 0 && (
        <div>
          {renderSelectedCalculators()}
          <button onClick={handleCalculate}>Calculate</button>
        </div>
      )}

      {Object.keys(totalCosts).length > 0 && (
        <div>
          <h3>Grand Total: ${grandTotal}</h3>
        </div>
      )}
    </div>
  );
};

export default CalculatorInterface;
