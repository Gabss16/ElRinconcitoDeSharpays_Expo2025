import React from 'react';

const ComboBox = ({ options = [], value, onChange, placeholder = "Seleccione una opción" }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="bg-white border border-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default ComboBox;
