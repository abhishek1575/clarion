// components/ui/button.jsx
import React from "react";

export const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-2xl transition duration-200 ${className}`}
  >
    {children}
  </button>
);
