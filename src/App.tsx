import { useState } from "react";
import "./App.css";
import StablecoinPriceWidget from "./StableCoinPriceWidget";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <div
        className={
          darkMode
            ? "dark bg-gray-900 min-h-screen"
            : "bg-gray-100 min-h-screen"
        }
      >
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`m-4 p-2 rounded ${
            darkMode ? "bg-gray-700 text-white" : "bg-blue-500 text-green"
          }`}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
        <div className="p-6">
          <StablecoinPriceWidget />
        </div>
      </div>
    </>
  );
}

export default App;
