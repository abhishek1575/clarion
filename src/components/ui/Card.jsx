import React from "react";

// Card component to display content in a styled box
export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white shadow-xl rounded-lg p-4 ${className}`} // Tailwind CSS for styling
    >
      {children}
    </div>
  );
}
