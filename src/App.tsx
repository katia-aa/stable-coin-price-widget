import React, { useState } from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import StablecoinPriceWidget from "./StableCoinPriceWidget";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Receive from "./pages/Receive";
import Send from "./pages/Send";
import History from "./pages/History";
import { useWallet } from "./wallet/WalletProvider";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useWallet();

  return (
    <div
      className={
        darkMode ? "dark bg-gray-900 min-h-screen" : "bg-gray-100 min-h-screen"
      }
    >
      <div className="p-4 flex justify-between">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded ${
            darkMode ? "bg-gray-700 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {darkMode ? "Light" : "Dark"} Mode
        </button>
        <Link to="/" className="underline">
          Home
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<StablecoinPriceWidget />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/receive"
          element={user ? <Receive /> : <Navigate to="/login" />}
        />
        <Route
          path="/send"
          element={user ? <Send /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={user ? <History /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
