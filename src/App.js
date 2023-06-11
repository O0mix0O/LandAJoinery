import './App.css';
import CalculatorInterface from './CalculatorInterface';

function App() {
  const handleAddCalculator = (calculator) => {
    // Add the logic to handle the calculator addition here
    console.log(`Adding calculator: ${calculator}`);
  };

  return (
    <div className="App">
      <header className="App-header">
      <CalculatorInterface onAddCalculator={handleAddCalculator} />
    </header>
    </div>
  );
}

export default App;
