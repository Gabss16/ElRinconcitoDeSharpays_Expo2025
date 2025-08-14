import "./EmprendimientosCard.css";
import bougiesLogo from "../assets/bougies.png";
import frostyLogo from "../assets/frostyBitesWhite.png";
import sharpaysLogo from "../assets/sharpaysLogoPink.png";
import paraisoLogo from "../assets/elParaisoDeDios.png";
import noLosAtropellesLogo from "../assets/noLosAtropelles.png";

const emprendimientosData = [
  {
    logo: bougiesLogo,
    title: "Bougies",
    description: "Velas aromáticas que iluminan tu alma.",
    category: "Velas"
  },
  {
    logo: frostyLogo,
    title: "Frosty Bites",
    description: "Delícias frías para un día caluroso.",
    category: "Comida"
  },
  {
    logo: sharpaysLogo,
    title: "Sharpays Boutique",
    description: "Moda para peluditos con estilo.",
    category: "Moda"
  },
  {
    logo: paraisoLogo,
    title: "El paraíso de Dios",
    description: "Plantas suculentas 100% naturales.",
    category: "Plantas"
  },
  {
    logo: noLosAtropellesLogo,
    title: "No los atropelles",
    description: "Campaña vial con impacto visual.",
    category: "Campaña"
  },
];

const EmprendimientosCard = () => {
  return (
    <>
      {emprendimientosData?.map((empr) => (
        <div className="Emprendimientos-card-container">
          <div className="Emprendimientos-card">
            <div className="Emprendimientos-imgBx">
              <img src={empr.logo}/>
            </div>
            <div className="Emprendimientos-contentBx">
              <h2>{empr.title}</h2>
              <div className="Emprendimientos-info">
                <p className="Emprendimientos-description text-light">
                  {empr.description}
                </p>
              </div>
              <a href="#">{empr.category}</a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default EmprendimientosCard;
