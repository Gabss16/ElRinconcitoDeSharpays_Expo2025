import BannerPrincipal from "../components/bannerPrincipal.jsx";
import CarouselCard from "../components/carouselCard.jsx";
import CustomButton from "../components/CustomButton.jsx";
import { Link } from "react-router-dom";
const HomePublic = () => {
    return (
        <>
            <div className="main-container-Inicio">
                <BannerPrincipal />
                <div className="d-flex justify-content-evenly align-items-center mt-5">
                    <div className="text-center">
                        <p className="fw-bold m-0 fs-5">Pequeños detalles para grandes</p>
                        <h1 className="fw-bold m-0" style={{ color: '#FE3F8D', fontSize: '3.5em' }}>Momentos</h1>
                    </div>
                    <div>
                        <p className="fs-5">En el rinconcito de Sharpay encuentras regalos unicos: sublimados personalizados,  <br />
                            paletas artesanales, velas, suculentas y mas. Cada compra apoya donaciones  <br />
                            a perritos en situacion de calle</p>
                    </div>
                </div>
                <CarouselCard />

            </div>
        </>
    );
};
export default HomePublic;