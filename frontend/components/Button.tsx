"use client";

import { useTheme } from "@/context/ThemeContext";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ className = "", ...props }) => {
  const { theme } = useTheme();
  return (
    <button
      {...props}
      className={`px-[20px] py-[12px] border-[1px] ${
        theme === "dark"
          ? "border-gray-700 hover:bg-gray-900"
          : "border-gray-300 hover:bg-gray-100"
      } rounded-[20px]  text-blue-600 bg-transparent disabled:bg-gray-400 disabled:cursor-not-allowed text-[16px] cursor-pointer  ${className}`}
    />
  );
};

export default Button;
