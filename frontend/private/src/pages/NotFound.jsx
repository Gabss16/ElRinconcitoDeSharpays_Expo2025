import SpaceOtto from "../assets/otto.png";
import Saturn from "../assets/saturn_purple.png";
import PlaneBlue from "../assets/Planet_blue.png";
import Bone from "../assets/Bone.png";
import Sat from "../assets/Sat.png";
import PlanetYellow from "../assets/Smallplanet_yellow.png";
import "../styles/NotFound.css";

import CustomButton from "../components/CustomButton.jsx";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="container section spacing">
        <div className="container-inner">
          <div className="text-center">
            <h1 className="fw-bold mt-5 pt-5" style={{ fontSize: "4em" }}>
              Página no encontrada
            </h1>
            <Link to={"/Dashboard"}>
              <CustomButton
                text={"Regresar"}
                background={"#ff6daa"}
                color={"white"}
                width={"120px"}
                height={"50px"}
              />
            </Link>
          </div>
          <div className="not-found">
            <img
              alt=""
              className="not-found-image space-otto"
              src={SpaceOtto}
            />
            <img
              alt=""
              className="not-found-image saturn-purple"
              src={Saturn}
            />
            <img
              alt=""
              className="not-found-image planet-blue"
              src={PlaneBlue}
            />
            <img className="not-found-image bone" src={Bone} />
            <img alt="" className="not-found-image sat" src={Sat} />
            <img
              alt=""
              className="not-found-image planet-yellow"
              src={PlanetYellow}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
