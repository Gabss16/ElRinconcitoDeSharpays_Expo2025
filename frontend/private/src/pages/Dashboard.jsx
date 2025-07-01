import { useAuth } from "../context/AuthContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import TotalBalance from "../components/TotalBalance.jsx";

import { NavLink } from 'react-router-dom';

import "../styles/Dashboard.css";

//Gráficas
import BarChart from "../utils/barGraphic.jsx"

const Dashboard = () => {

    const { user } = useAuth();

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col-10">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h1 className="fw-bold fs-1 mt-5">Bienvenido/a</h1>
                                <span className="fs-3">{user?.name}</span>
                            </div>

                            <div className="pf-cover">
                                <NavLink to={"/profile"}>
                                <img src={user?.image} className="rounded-circle me-5"/>
                                </NavLink>
                            </div>
                        </div>

                        <hr />

                        <div className="grahpics d-flex">
                            <div>
                                <h4>Productos más vendidos</h4>
                                <BarChart />
                            </div>

                            <div>
                                <h4>Productos más vendidos</h4>
                                <BarChart />
                            </div>

                        </div>

                        <div className="d-flex total-balance-section">
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

                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;