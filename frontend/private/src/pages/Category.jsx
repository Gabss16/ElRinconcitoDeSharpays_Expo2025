import React from "react";
import RegisterCategories from "../components/categories/registerCategory.jsx";
import CategoryTable from "../components/categories/categoryTable.jsx";
import useDataCategories from "../components/categories/hook/useDataCategory.jsx";
import "../styles/Category.css";

const CategoryPage = () => {
  const data = useDataCategories();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-10">
          <div className="users-main-container">
            <h1 className="main-title">Tiendas Sharpay</h1>
            <div className="form-and-fields">
              <RegisterCategories {...data} resetForm={data.resetForm} />
            </div>
            <div className="users-table-wrapper">
              <CategoryTable {...data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
