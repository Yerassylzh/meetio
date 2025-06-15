import React from "react";

interface SpinnerProps {
  size?: number; // Allows resizing
  color?: string; // Customizable color
}

const SpinnerSvg: React.FC<SpinnerProps> = ({ size = 24, color = "white" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke={color}
        strokeWidth="5"
        strokeDasharray="100"
        strokeLinecap="round"
        opacity="0.4"
      />
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke={color}
        strokeWidth="5"
        strokeDasharray="100"
        strokeDashoffset="40"
        strokeLinecap="round"
        transform="rotate(-90 25 25)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default SpinnerSvg;
