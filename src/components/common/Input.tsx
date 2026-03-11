"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

interface CustomInputsProps extends InputProps {
  label: string;
  error?: Error | string;
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
        <label className="block text-xs font-sans-elegant font-medium mb-2 text-foreground tracking-wide uppercase">
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
        className={`w-full px-4 py-3 border border-border bg-card focus:border-foreground focus:ring-0 focus:outline-none transition-all duration-200 font-sans-elegant text-foreground placeholder:text-muted-foreground ${error ? "border-red-500 focus:border-red-500" : ""} ${className}`}
      />
      {error && (
        <p className="text-red-500 text-xs mt-2 font-sans-elegant">
          {typeof error === 'string' ? error : error.message}
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
