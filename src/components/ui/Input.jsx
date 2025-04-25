// components/ui/input.jsx
import React from "react";

export const Input = ({ value, onChange, placeholder, className = "" }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`border rounded-xl px-4 py-2 text-sm w-full ${className}`}
  />
);

