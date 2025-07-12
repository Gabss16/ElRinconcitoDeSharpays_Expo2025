import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SucessAlert from "../components/SuccessAlert.jsx";

const LoadingAnimation = ({ children, navTo, alert}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate(navTo || null)
      if(alert)
      {
        SucessAlert(alert);
      }
    }, 1100); // duración de la animación 1s

    return () => clearTimeout(timer); // limpiar el timeout al desmontar
  }, []);

  return loading ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
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
    </div>
  ) : (
    children
  );
};

export default LoadingAnimation;
