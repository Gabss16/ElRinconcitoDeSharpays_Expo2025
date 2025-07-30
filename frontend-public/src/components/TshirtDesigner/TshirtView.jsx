import { useEffect, useRef } from 'react';

const TShirtView = ({ tshirtColor, viewSide, canvasRef }) => {
  const containerRef = useRef(null);
  const colorLayerRef = useRef(null);

  // ✅ Rutas relativas correctas sin /public
  const tshirtImage = viewSide === 'front' 
    ? '/images/front.png' 
    : '/images/back.png';

  // Configurar estilos del canvas cuando cambia la vista
  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const canvas = canvasRef.current;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '30'; // ✅ Superior a la imagen de la camiseta
    }
  }, [viewSide]);

  // Aplicar color a la capa con máscara
  useEffect(() => {
    if (colorLayerRef.current) {
      colorLayerRef.current.style.backgroundColor = tshirtColor;
    }
  }, [tshirtColor]);

  return (
    <div 
      className="tshirt-container" 
      ref={containerRef} 
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* Capa de color con máscara de la camiseta */}
      <div 
        ref={colorLayerRef}
        className="tshirt-color-layer"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: tshirtColor,
          maskImage: `url(${tshirtImage})`,
          WebkitMaskImage: `url(${tshirtImage})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          zIndex: 1,
        }}
      />

      {/* Imagen base de la camiseta */}
      <img 
        src={tshirtImage} 
        alt="Camiseta" 
        className="tshirt-base-image" 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.8,
        }}
      />

      {/* Canvas para diseño */}
      <canvas 
        ref={canvasRef} 
        className="design-canvas"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 30, // ✅ Canvas por encima de todo
          top: 0,
          left: 0,
          transform: viewSide === 'back' ? 'scaleX(-1)' : 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.1)' // ✅ Fondo visible temporal
        }}
      />
    </div>
  );
};

export default TShirtView;
