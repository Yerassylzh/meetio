import { useTheme } from "@/context/ThemeContext";
import React from "react";

export default function ThemeToggler() {
  const { setTheme } = useTheme();

  return (
    <div className="gap-[5px] flex justify-start items-center">
      <div
        className="cursor-pointer bg-gray-100 rounded-[50%] w-[20px] h-[20px] border-gray-400 border-[1px]"
        onClick={() => setTheme("light")}
      />
      <div
        className="cursor-pointer bg-gray-700 rounded-[50%] w-[20px] h-[20px] border-gray-400 border-[1px]"
        onClick={() => setTheme("dark")}
      />
    </div>
  );
}
