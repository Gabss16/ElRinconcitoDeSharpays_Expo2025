import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

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
  const [showPicker, setShowPicker] = useState(false);

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

      {/* Toggle para selector avanzado */}
      <button 
        onClick={() => setShowPicker(!showPicker)} 
        className="picker-toggle"
      >
        {showPicker ? '▼ Ocultar selector' : '▶ Selector avanzado'}
      </button>

      {/* Selector de color avanzado */}
      {showPicker && (
        <div className="advanced-picker">
          <HexColorPicker 
            color={color} 
            onChange={onChange}
            className="hex-picker"
          />
          <div className="color-value">
            <label htmlFor="color-input">Código HEX:</label>
            <input
              id="color-input"
              type="text"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="color-code-input"
              pattern="^#[0-9A-Fa-f]{6}$"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;