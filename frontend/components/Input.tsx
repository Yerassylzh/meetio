"use client";

import { useTheme } from "@/context/ThemeContext";
import cls from "@/utils/ClassSplitterByTheme";
import React, { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`
            ${cls(
              theme,
              "w-full text-[var(--color-text)] outline-none px-[12px] py-[6px] border-[1px] rounded-[7px] text-[13px] placeholder:text-gray-500",
              "border-gray-300",
              "border-gray-600"
            )}
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-[13px] text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
