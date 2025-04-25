// components/ui/select.jsx
import React from "react";

export const Select = ({ children, onValueChange, value, defaultValue }) => (
  <select
    value={value || defaultValue}
    onChange={(e) => onValueChange(e.target.value)}
    className="border rounded-xl px-4 py-2 text-sm bg-white"
  >
    {children}
  </select>
);

export const SelectItem = ({ children, value }) => (
  <option value={value}>{children}</option>
);
