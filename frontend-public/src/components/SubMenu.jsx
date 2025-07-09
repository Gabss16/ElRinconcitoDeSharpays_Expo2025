// src/components/SidebarMenu.jsx
import React from 'react';
import '../styles/SubMenu.css';
import useUserDataSubcategories from './SubCategories/hook/userDataSubCategory';

const SidebarMenu = ({ categoryId, selectedSubcategory, setSelectedSubcategory }) => {
  const { subcategories } = useUserDataSubcategories();

  const filteredSubs = subcategories.filter((sub) => {
    const subCatId =
      typeof sub.categoryId === "string"
        ? sub.categoryId
        : typeof sub.categoryId === "object"
        ? sub.categoryId._id || sub.categoryId.$oid
        : null;

    return subCatId === categoryId;
  });

  return (
    <aside className="sidebar-menu">
      <button
        className={`category-btn ${!selectedSubcategory ? 'active' : ''}`}
        onClick={() => setSelectedSubcategory(null)}
      >
        Ver Todo
      </button>

      {filteredSubs.map((sub) => (
        <button
          key={sub._id}
          className={`category-btn ${selectedSubcategory === sub._id ? 'active' : ''}`}
          onClick={() => setSelectedSubcategory(sub._id)}
        >
          {sub.name}
        </button>
      ))}
    </aside>
  );
};

export default SidebarMenu;
