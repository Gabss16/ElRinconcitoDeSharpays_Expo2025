import { useEffect, useRef, useState } from "react";

import bougiesBack from "../assets/bougies.jpeg";
import bougiesLogo from "../assets/bougies.png";

import frostyBack from "../assets/frosty.jpeg";
import frostyLogo from "../assets/frostyBitesWhite.png";

import sharpaysBack from "../assets/sharpays.jpeg";
import sharpaysLogo from "../assets/sharpaysLogoPink.png";

import paraisoBack from "../assets/paraiso.jpeg";
import paraisoLogo from "../assets/elParaisoDeDios.png";

import noLosAtropellesLogo from "../assets/noLosAtropelles.png";
import noLosAtropellesBackground from "../assets/noLosAtropellesBackground.png";

const brands = [
  {
    name: "Bougies",
    logo: bougiesLogo,
    background: bougiesBack,
    description: "Velas aromáticas que iluminan tu alma.",
  },
  {
    name: "Frosty Bites",
    logo: frostyLogo,
    background: frostyBack,
    description: "Delicias frías para un día caluroso.",
  },
  {
    name: "Sharpays Boutique",
    logo: sharpaysLogo,
    background: sharpaysBack,
    description: "Moda para peluditos con estilo.",
  },
  {
    name: "El paraíso de Dios",
    logo: paraisoLogo,
    background: paraisoBack,
    description: "Frutas benditas, 100% naturales.",
  },
  {
    name: "No los Atropelles",
    logo: noLosAtropellesLogo,
    background: noLosAtropellesBackground,
    description: "Campaña vial con impacto visual.",
  },
];

export default function ScrollAnimation() {
  return (
    <div
      className="container-fluid p-0 mt-5"
      style={{
        scrollSnapType: "y mandatory",
        overflowY: "auto",
        overflowX: 'hidden',
        height: "100vh",
        width: "100vw",
        scrollbarWidth: "none",
        msOverflowStyle: "none", 
      }}
    >
      {brands.map((brand, index) => (
        <BrandSection key={index} brand={brand} />
      ))}
    </div>
  );
}

function BrandSection({ brand }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        scrollSnapAlign: "start",
        overflow: "hidden",
      }}
    >
      {/* Imagen de fondo */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${brand.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.2)",
          transition: "filter 1s ease",
          zIndex: 0,
          ...(visible ? { filter: "brightness(0.2)" } : { filter: "brightness(0.4)" }),
        }}
      />

      {/* Overlay oscuro para oscurecer más la imagen */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.1)",
          transition: "background-color 1s ease",
          zIndex: 1,
          ...(visible ? { backgroundColor: "rgba(0,0,0,0.2)" } : { backgroundColor: "rgba(0,0,0,0.4)" }),
        }}
      />

      {/* Contenido con blur */}
      <div
        className="d-flex align-items-center justify-content-around p-5 rounded-4 shadow-lg"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#f8f9fa",
          transition: "all 1s ease",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(40px)",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Texto a la izquierda */}
        <div style={{ maxWidth: "60%" }}>
          <h1
            className="fw-bold mb-4"
            style={{ fontSize: "8rem", textShadow: "0 0 10px #fff" }}
          >
            {brand.name}
          </h1>
          <p
            className="lead"
            style={{
              color: "#f8f9fa",
              textShadow: "0 0 6px #000",
              fontSize: "2rem",
            }}
          >
            {brand.description}
          </p>
        </div>

        {/* Logo a la derecha */}
        <div style={{ maxWidth: "50%" }}>
          <img
            src={brand.logo}
            alt={brand.name}
            className="img-fluid"
            style={{
              maxHeight: "500px",
              filter: "drop-shadow(0 0 12px white)",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </section>
  );
}
