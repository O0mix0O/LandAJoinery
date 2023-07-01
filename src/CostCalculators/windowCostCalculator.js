const WindowCostCalculator = (numberOfDoors) => {
  const calculateCost = () => {
    const nailsCost = numberOfDoors * 2 * 0.5;
    const bracketsCost = numberOfDoors * 1.9;
    const woodCost = numberOfDoors * 3 * 40;
    const laborCost = numberOfDoors * 49;
    const subtotal = nailsCost + bracketsCost + woodCost + laborCost;
    const vat = subtotal * 0.2;
    const total = subtotal + vat;
    return total;
  };

  return calculateCost();
};

export default WindowCostCalculator;
