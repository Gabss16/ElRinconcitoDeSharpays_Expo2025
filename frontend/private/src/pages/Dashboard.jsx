import { useAuth } from "../context/AuthContext.jsx";
import React, { useEffect } from "react";

import { NavLink } from "react-router-dom";

import "../styles/Dashboard.css";

import ProductsTable from "../components/products/dashboardTable.jsx";
import useUserDataProducts from "../components/products/hook/userDataProducts";

//Gráficas
import BarChart from "../utils/barGraphic.jsx";
import Doughnut from "../utils/doughnut.jsx";

import TotalSales from "../components/TotalSales.jsx";
import StoreCard from "../components/StoreCard.jsx";

import useDataCategory from "../components/categories/hook/useDataCategory.jsx";

import useDataEmployee from "../components/employee/hook/useDataEmployee.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const dataEmployees = useDataEmployee();
  const dataProducts = useUserDataProducts();
  const dataCategories = useDataCategory(); //Stores

  useEffect(() => {
      dataProducts.fetchData();
      dataEmployees.fetchEmployeesById(user?.id);
  }, [user?.id]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            {/*Espacio para que el navbar se muestre*/}
          </div>
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mt-3">
                <h1 className="fw-bold fs-2">Bienvenido/a</h1>
                <span className="fs-4">{dataEmployees?.name}</span>
              </div>

              <div className="pf-cover">
                <NavLink to={"/profile"}>
                  <img
                    src={dataEmployees?.imageUrl}
                    className="rounded-circle me-5"
                  />
                </NavLink>
              </div>
            </div>

            <hr />

            <div className="grahpics d-flex justify-content-around">
              <div>
                <h4>Productos más vendidos</h4>
                <BarChart />
              </div>

              <div>
                <h4>Ventas por mes</h4>
                <TotalSales />
              </div>

              <div>
                <div
                  className="footer-gif-container"
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                    backgroundColor: "#fff",
                  }}
                >
                  <img
                    src="https://cdn.dribbble.com/userupload/5509318/file/original-9fcb4efd061af4c6eb3c0b056bda48d1.gif"
                    style={{ width: "420px", opacity: 0.9 }}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-around store-card-section">
              {dataCategories.categories.map((cat) => (
                <StoreCard
                  key={cat?._id}
                  image={cat?.image}
                  name={cat?.category}
                  status={cat?.isActive}
                />
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="product-list-dashboard w-100">
                <h4>Lista de productos</h4>
                <ProductsTable {...dataProducts} isEditable={false} />
              </div>
              <div>
                <h4>Ventas por negocio</h4>
                <Doughnut />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
