"use client";

import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react"; // or use any other icon library
import Input from "./Input"; // Adjust path if needed

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="w-full">
        <div className="relative w-full">
          <Input
            ref={ref}
            type={visible ? "text" : "password"}
            {...props}
            className={`pr-10 ${props.className ?? ""}`}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setVisible((prev) => !prev)}
            tabIndex={-1}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className="mt-1 text-[13px] text-red-500">{error}</p>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
