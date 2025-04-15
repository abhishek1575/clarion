import React from "react";

// Input component for form fields
export function Input({ value, onChange, placeholder, className = "" }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border p-2 rounded-md ${className}`}
    />
  );
}
