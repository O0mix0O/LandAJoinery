import './App.css';
import CalculatorSelector from './CalculatorInterface';

function App() {
  const handleAddCalculator = (calculator) => {
    // Add the logic to handle the calculator addition here
    console.log(`Adding calculator: ${calculator}`);
  };
  
  return (
    <div className="App">
      <header className="App-header">
      <CalculatorSelector onAddCalculator={handleAddCalculator} />
    </header>
    </div>
  );
}

export default App;
