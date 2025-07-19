import React, { useState } from "react";

function BreathingButton({ onClick, disabled }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  const handleClick = () => {
    setIsPulsing(false);
    onClick();
  };

  return (
    <div className="breathing-button-container">
      <button
        className={`breathing-button ${isPulsing ? "pulsing" : ""} ${
          isHovered ? "hovered" : ""
        }`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
      >
        <div className="button-inner">
          <div className="breath-circle"></div>
          <span className="button-text">Begin Breathing</span>
        </div>

        {/* Ripple effect rings */}
        <div className="ripple-ring ring-1"></div>
        <div className="ripple-ring ring-2"></div>
        <div className="ripple-ring ring-3"></div>
      </button>
    </div>
  );
}

export default BreathingButton;
