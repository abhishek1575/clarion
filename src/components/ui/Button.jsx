import React from "react";

// Button component to trigger actions
export function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
}
