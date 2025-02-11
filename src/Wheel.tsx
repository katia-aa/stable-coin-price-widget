import React, { useRef, useState } from "react";
import "./Wheel.css";

function Wheel() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const segments = [
    "20% OFF",
    "30% OFF",
    "Free Ticket",
    "50% OFF",
    "Free Ticket",
    "10% OFF",
  ];
  const segmentAngle = 360 / segments.length;

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);

    const randomSpin = Math.floor(Math.random() * 360) + 360 * 5; // Random spin + 5 full spins
    const finalAngle = randomSpin % 360;
    const winningIndex =
      Math.floor((360 - finalAngle) / segmentAngle) % segments.length;

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 3s ease-out";
      wheelRef.current.style.transform = `rotate(${randomSpin}deg)`;
    }

    setTimeout(() => {
      setSpinning(false);
      setResult(segments[winningIndex]);
    }, 3000); // Match the CSS transition duration
  };

  return (
    <div className="wheel-container">
      <div className="wheel" ref={wheelRef}>
        {segments.map((segment, index) => (
          <div
            key={index}
            className="segment"
            style={{
              transform: `rotate(${index * segmentAngle}deg)`,
              backgroundColor: index % 2 === 0 ? "#FF5733" : "#33FF57",
            }}
          >
            <span
              style={{ transform: `rotate($50 - index * segmentAngle}deg)` }}
            >
              {segment}
            </span>
          </div>
        ))}
      </div>
      <button onClick={spinWheel} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </button>
      {result && <p>Result: {result}</p>}
    </div>
  );
}

export default Wheel;
