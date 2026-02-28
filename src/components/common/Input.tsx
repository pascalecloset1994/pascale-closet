"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

interface CustomInputsProps extends InputProps {
  label: string;
  error: Error | string;
}

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  label,
  error,
  required = false,
  className,
}: CustomInputsProps) => {
  const [viewPass, setViewPass] = useState<boolean>(true);

  return (
    <div className="mb-5 relative">
      {label && (
        <label className="block text-xs font-sans-elegant font-medium mb-2 text-[#2C2420] tracking-wide uppercase">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <input
        type={type === "password" && viewPass ? "password" : "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border border-[#E0D6CC] bg-white focus:border-[#2C2420] focus:ring-0 focus:outline-none transition-all duration-200 font-sans-elegant text-[#2C2420] placeholder:text-[#7A6B5A] ${error ? "border-[#2C2420]" : ""} ${className}`}
      />
      {error && (
        <p className="text-red-500 text-xs mt-2 font-sans-elegant">
          {(error as Error).message}
        </p>
      )}
      {type === "password" && (
        <div className="absolute top-1/2 right-3" onClick={() => setViewPass(!viewPass)}>
          {!viewPass ? (
            <Eye size={24} />
          ): (
            <EyeClosed size={24}  />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
