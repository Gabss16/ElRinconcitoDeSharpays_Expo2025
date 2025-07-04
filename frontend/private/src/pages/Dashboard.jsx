import { useAuth } from "../context/AuthContext.jsx";
import React, {useEffect } from "react";

import { NavLink } from 'react-router-dom';

import "../styles/Dashboard.css";

import ProductsTable from "../components/products/sharpaysBoutique/sharpaysTable.jsx";
import useUserDataProducts from "../components/products/hook/userDataProducts";

//Gráficas
import BarChart from "../utils/barGraphic.jsx"
import Doughnut from "../utils/doughnut.jsx";

import TotalSales from "../components/TotalSales.jsx";
import TotalBalance from "../components/TotalBalance.jsx";
import PendingOrders from "../components/PendingOrders.jsx";

const Dashboard = () => {

    const { user } = useAuth();
    const {products, deleteProduct, updateProduct, loading, fetchData} = useUserDataProducts();

     useEffect(() => {
        fetchData();
      }, []);

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
                                <span className="fs-4">{user?.name}</span>
                            </div>

                            <div className="pf-cover">
                                <NavLink to={"/profile"}>
                                    <img src={user?.image} className="rounded-circle me-5" />
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
                                <TotalSales/>
                            </div>

                            <div>
                                <h4>Lista de Pedidos</h4>
                                <PendingOrders/>
                            </div>
                        </div>

                        <div className="d-flex justify-content-around total-balance-section">
                            <TotalBalance
                                image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73broZuXihBx0tLGP7_gE5FvPHdCoK8OMSg&s"}
                                total={20}
                            />

                            <TotalBalance
                                image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw3iIiDJQW4HYJk2osK19O3RQ4Hs4MDSF8PQ&s"}
                                total={212}
                            />
                            <TotalBalance
                                image={"https://plus.unsplash.com/premium_photo-1661876402729-09f3b7e87640?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG5nfGVufDB8fDB8fHww"}
                                total={510}
                            />

                            <TotalBalance
                                image={"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcet2b0nXlz5OtaCJglDe2UYt0EkYazeRfslRf-qlt8b0JfQT4Uv6IzzWTpgyKj8Axmu6M2DRV20bFbSvIw-igdnQ2vLH8_ry83pVKTHEKccBj5WkGvZtGXjaW1C63FvHDi8nvCsnllW_xpaMkGd4gQAe5yg_-tw_EpPpf5mzp2XShfDudxHxwPI1-QQ/s3500-d/MamaFlor.com-Payaso-Plim-Plim-Clipart-png-transparente-18.png"}
                                total={15}
                            />
                            <TotalBalance
                                image={"https://static.vecteezy.com/system/resources/thumbnails/025/138/515/small_2x/monarch-butterfly-flying-png.png"}
                                total={401}
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="product-list-dashboard w-100">
                                <h4>Lista de productos</h4>
                                <ProductsTable
                                    products={products}
                                    deleteProduct={deleteProduct}
                                    updateProduct={updateProduct}
                                    loading={loading}
                                    isEditable={false}
                                />
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