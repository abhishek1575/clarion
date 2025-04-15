import React, { useState } from "react";

// Basic dialog wrapper
export function Dialog({ children }) {
  return <div>{children}</div>;
}

// Trigger for opening the dialog
export function DialogTrigger({ children, asChild }) {
  return <>{children}</>;
}

// Dialog content with basic styling
export function DialogContent({ children, className = "" }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 ${className}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
        <button
          className="absolute top-2 right-3 text-lg font-bold text-gray-600 hover:text-red-600"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
