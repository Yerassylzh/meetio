import React, { forwardRef, InputHTMLAttributes } from "react";

interface IconicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon: React.ReactNode;
}

const IconicInput = forwardRef<HTMLInputElement, IconicInputProps>(
  ({ icon, error, className = "", ...props }, ref) => {
    return (
      <div className="relative w-full flex justify-end items-center">
        {icon}
        <input
          ref={ref}
          className={`
            w-full !px-[12px] text-[var(--color-text)] outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 !py-[6px] border-[1px] rounded-[7px] placeholder:font-medium placeholder:text-[13px] placeholder:text-gray-500
            ${error ? "border-red-500" : "border-blue-600"}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

IconicInput.displayName = "Input";

export default IconicInput;
