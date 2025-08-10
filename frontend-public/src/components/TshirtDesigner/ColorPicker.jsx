import { useState } from 'react';

const basicColors = [
  '#f08080', // rojo claro
  '#5a2a67', // púrpura oscuro
  '#3e7d7e', // verde azulado
  '#dede70', // amarillo pálido
  '#bc3f3f', // rojo oscuro
  '#4f4747', // gris oscuro
  '#313131', // negro
  '#3466b2', // azul
  '#e3e3e3', // gris claro
  '#ffffff', // blanco
];

const ColorPicker = ({ color, onChange }) => {
  return (
    <div className="color-picker-panel">
      <h3>Color de la Camiseta</h3>

      {/* Colores rápidos */}
      <div className="quick-colors">
        {basicColors.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className="color-swatch"
            style={{
              backgroundColor: c,
              border: c === color ? '3px solid #007bff' : '2px solid #ddd',
            }}
            title={c}
            aria-label={`Seleccionar color ${c}`}
          />
        ))}
      </div>

      {/* Instrucciones de Personalización - Alargado */}
      <div
        className="instructions-box"
        style={{
          padding: '12px 15px',
          marginTop: '15px',
          width: '85%',    // ocupa todo el ancho disponible
          // maxWidth: '600px', // opcional si quieres limitar el ancho máximo
        }}
      >
        <h4 style={{ fontSize: '0.95em', marginBottom: '10px' }}>
          Personaliza tu camiseta
        </h4>
        <ul className="instructions-list" style={{ fontSize: '12px' }}>
          <li style={{ padding: '4px 0', paddingLeft: '15px' }}>
            Selecciona el color de camiseta
          </li>
          <li style={{ padding: '4px 0', paddingLeft: '15px' }}>
            Escribe tu texto personalizado
          </li>
          <li style={{ padding: '4px 0', paddingLeft: '15px' }}>
            Ajusta tamaño y fuente
          </li>
          <li style={{ padding: '4px 0', paddingLeft: '15px' }}>
            Cambia el color del texto
          </li>
          <li style={{ padding: '4px 0', paddingLeft: '15px' }}>
            Sube tu diseño propio
          </li>
          <li style={{ padding: '4px 0', paddingLeft: '15px' }}>
            Arrastra y redimensiona
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ColorPicker;
