// TShirtView.jsx - CORREGIDO
import { useEffect, useRef } from 'react';

const TShirtView = ({ tshirtColor, canvasRef }) => {
  const colorLayerRef = useRef(null);
  const containerRef = useRef(null);
  
  // Imagen de camisetas duales (frente y atrás)
  const dualImage = '/images/dualchemis.png';
  
  // Apply color
  useEffect(() => {
    if (colorLayerRef.current) {
      colorLayerRef.current.style.backgroundColor = tshirtColor;
    }
  }, [tshirtColor]);
  
  return (
    <div ref={containerRef} className="tshirt-view-container">
      <div className="tshirt-wrapper">
        {/* Capa de color con máscara - ATRÁS */}
        <div
          ref={colorLayerRef}
          className="tshirt-color-layer"
          style={{
            backgroundColor: tshirtColor,
            maskImage: `url(${dualImage})`,
            WebkitMaskImage: `url(${dualImage})`,
            zIndex: 1
          }}
        />
        
        {/* Canvas para diseños - EN MEDIO */}
        <canvas
          ref={canvasRef}
          className="design-canvas"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 5,
            pointerEvents: 'auto'
          }}
        />
        
        {/* Imagen con texturas - ADELANTE PERO TRANSPARENTE */}
        <img
          src={dualImage}
          alt="T-Shirt Template"
          className="tshirt-base-image"
          loading="lazy"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            zIndex: 10,
            mixBlendMode: 'multiply',
            opacity: 0.3,
            pointerEvents: 'none'
          }}
        />
      </div>
    </div>
  );
};

export default TShirtView;