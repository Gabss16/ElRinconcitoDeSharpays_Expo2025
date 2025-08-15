import { useEffect, useRef } from 'react';

const TShirtView = ({ tshirtColor, canvasRef }) => {
  const colorLayerRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const resizeCanvas = () => {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  };

  resizeCanvas();

  window.addEventListener('resize', resizeCanvas);
  return () => window.removeEventListener('resize', resizeCanvas);
}, []);


  // Imagen de camisetas duales (frente y atrás)
  const dualImage = '/images/dualchemis.png';

  // Apply color
  useEffect(() => {
    if (colorLayerRef.current) {
      colorLayerRef.current.style.backgroundColor = tshirtColor;
    }
  }, [tshirtColor]);

  return (
    <div 
      ref={containerRef} 
      className="tshirt-view-container"
    >
      {/* T-Shirt Display optimizado */}
      <div className="tshirt-wrapper">
        {/* Capa de color con máscara mejorada */}
        <div 
          ref={colorLayerRef}
          className="tshirt-color-layer"
          style={{
            backgroundColor: tshirtColor,
            maskImage: `url(${dualImage})`,
            WebkitMaskImage: `url(${dualImage})`,
          }}
        />
        
        {/* Imagen con texturas y pliegues preservados */}
        <img 
          src={dualImage}
          alt="T-Shirt Template" 
          className="tshirt-base-image"
          loading="lazy"
        />
        
        {/* Canvas para diseños */}
        <canvas 
          ref={canvasRef}
          className="design-canvas"

          
        />
      </div>
    </div>
  );
};

export default TShirtView;