import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Rutas a las cuales en las cuales se mostrará la animación.
const animatedRoutes = [
  "/"
];

const loadingAnimation = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showChildren, setShowChildren] = useState(true);

  useEffect(() => {
    if (animatedRoutes.includes(location.pathname)) {
      setLoading(true);
      setShowChildren(false);

      const timer = setTimeout(() => {
        setLoading(false);
        setShowChildren(true);
      }, 1000); // duracion de la animación

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
      setShowChildren(true);
    }
  }, [location.pathname]);

  return loading ? <div
      style={{
        position: true ? "fixed" : "relative",
        top: true ? 0 : "auto",
        left: true ? 0 : "auto",
        width: true ? "100vw" : "100%",
        height: true ? "100vh" : "100%",
        backgroundColor: "rgb(255, 255, 255)", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, 
        fontFamily: '"Inter", sans-serif',
        fontSize: "1.1rem",
        color: "#fe3f8d",
        pointerEvents: "all", 
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: "5px solid #f4f4f4",
          borderTop: "5px solid #fe3f8d",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: 12,
        }}
      />
      <p>Cargando...</p>
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div> : showChildren ? children : null;
};

export default loadingAnimation;
