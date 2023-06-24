const DoorCostCalculator = (numberOfDoors) => {

  const calculateCost = () => {
    const nailsCost = numberOfDoors * 4 * 0.9;
    const bracketsCost = numberOfDoors * 1.5;
    const woodCost = numberOfDoors * 3 * 10;
    const laborCost = numberOfDoors * 40;
    const subtotal = nailsCost + bracketsCost + woodCost + laborCost;
    const vat = subtotal * 0.2;
    const total = subtotal + vat;
    return total;
  };

  return calculateCost();
};

export default DoorCostCalculator;
