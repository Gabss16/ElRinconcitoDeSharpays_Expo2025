// Importamos React, hooks y estilos globales CSS
import React, { useEffect, useRef } from "react";
import "../styles/Banner.css";

// Función que genera un tamaño aleatorio para imágenes (entre 180px y 580px de ancho y 180px a 480px de alto)
const randomSize = () => {
  const w = Math.floor(Math.random() * 400 + 180); // ancho entre 180 y 580px
  const h = Math.floor(Math.random() * 300 + 180); // alto entre 180 y 480px
  return { width: `${w}px`, height: `${h}px` };
};

// Array con todos los elementos visuales (imágenes y decoraciones)
const elements = [
  // Cada objeto representa una imagen o decoración
  { type: "img", src: "/img1.jpg", style: { top: "5%", left: "10%", ...randomSize() }, depth: 1 },
  { type: "img", src: "/img2.jpg", style: { top: "20%", left: "60%", ...randomSize() }, depth: 2 },
  { type: "img", src: "/img3.jpg", style: { top: "60%", left: "5%", ...randomSize() }, depth: 3 },
  { type: "img", src: "/img4.jpg", style: { top: "65%", left: "60%", ...randomSize() }, depth: 1 },
  { type: "img", src: "/img5.jpg", style: { top: "40%", left: "30%", ...randomSize() }, depth: 2 },
  // Elementos decorativos
  { type: "shape", style: { top: "15%", left: "25%" }, className: "bg-shape", depth: 4 },
  { type: "shape", style: { top: "70%", left: "70%" }, className: "bg-shape", depth: 2 },
  { type: "icon", style: { top: "35%", left: "80%" }, className: "bg-icon", depth: 5 },
  { type: "icon", style: { top: "10%", left: "85%" }, className: "bg-icon", depth: 3 },
  { type: "shape", style: { top: "50%", left: "15%" }, className: "bg-shape", depth: 1 },
];

// Componente principal de React
export default function App() {
  // Referencias al DOM para la capa de desenfoque y a los elementos decorativos/imágenes
  const overlayRef = useRef();
  const itemRefs = useRef([]);

  // Hook de efecto para manejar el movimiento del mouse
  useEffect(() => {
    const moveHandler = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Pasamos la posición del mouse como variables CSS personalizadas
      overlayRef.current.style.setProperty("--x", `${x}px`);
      overlayRef.current.style.setProperty("--y", `${y}px`);

      // Movimiento y escala personalizada para cada elemento
      itemRefs.current.forEach((obj) => {
        if (!obj?.el) return;

        // Cálculo de distancia entre el mouse y el centro del elemento
        const rect = obj.el.getBoundingClientRect();
        const dx = (rect.x + rect.width / 2 - x) / (10 / obj.depth);
        const dy = (rect.y + rect.height / 2 - y) / (10 / obj.depth);

        // Aplicamos movimiento y escalado basado en profundidad
        obj.el.style.transform = `translate(${dx}px, ${dy}px) scale(${1 + obj.depth * 0.015})`;
        obj.el.style.zIndex = obj.depth; // para que unos pasen delante de otros
      });
    };

    // Al salir del área, se reinician transformaciones
    const resetHandler = () => {
      itemRefs.current.forEach((obj) => {
        if (!obj?.el) return;
        obj.el.style.transform = "translate(0px, 0px) scale(1)";
      });
    };

    // Escuchamos los movimientos del mouse
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseleave", resetHandler);

    // Limpieza de eventos al desmontar el componente
    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseleave", resetHandler);
    };
  }, []);

  // Lo que se renderiza en pantalla
  return (
    <div className="hero-container">
      {/* Contenedor de imágenes y elementos de fondo */}
      <div className="background-elements">
        {elements.map((el, i) => {
          // Ref individual con profundidad
          const refCallback = (ref) => (itemRefs.current[i] = { el: ref, depth: el.depth });

          // Si es imagen, renderiza <img>; si es forma decorativa, renderiza <div>
          if (el.type === "img") {
            return (
              <img
                key={i}
                src={el.src}
                alt=""
                className="hero-img"
                style={el.style}
                ref={refCallback}
              />
            );
          } else {
            return (
              <div
                key={i}
                className={`decor-element ${el.className}`}
                style={el.style}
                ref={refCallback}
              ></div>
            );
          }
        })}
      </div>

      {/* Capa borrosa translúcida con efecto lupa */}
      <div className="overlay-blur" ref={overlayRef}></div>

      {/* Texto de bienvenida */}
      <div className="title">
        <span className="subtitle">El Rinconcito de</span>
        <span className="main-title">Sharpay</span>
      </div>

      {/* Botón de login */}
      <button className="login-btn">LOGIN</button>
    </div>
  );
}