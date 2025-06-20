// src/components/SubCategoryComboBox.jsx
import React, { useEffect, useState } from "react";

const SubCategoryComboBox = ({ value, onChange }) => {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/subCategory");
        const data = await res.json();
        setSubcategories(data);
      } catch (error) {
        console.error("Error al obtener subcategorías:", error);
      }
    };

    fetchSubcategories();
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1">
        
      </label>
      <select
        className="w-full p-2 border border-gray-300 rounded"
        value={value}
        onChange={onChange}
      >
        <option value="">Selecciona una subcategoría</option>
        {subcategories.map((sub) => (
          <option key={sub._id} value={sub._id}>
            {sub.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubCategoryComboBox;
