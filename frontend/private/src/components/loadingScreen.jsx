// components/LoadingScreen.jsx
import React from "react";

const LoadingScreen = ({ message = "Cargando...", fullScreen = true }) => {
  return (
    <div
      style={{
        position: fullScreen ? "fixed" : "relative",
        top: fullScreen ? 0 : "auto",
        left: fullScreen ? 0 : "auto",
        width: fullScreen ? "100vw" : "100%",
        height: fullScreen ? "100vh" : "100%",
        backgroundColor: "rgba(255, 255, 255, 0.9)", 
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
      <p>{message}</p>
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
