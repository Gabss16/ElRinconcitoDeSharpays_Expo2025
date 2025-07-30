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
    <div className="color-picker">
      <h3>Color de la camiseta</h3>
      
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
        {basicColors.map((c) => (
          <div
            key={c}
            onClick={() => onChange(c)}
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: c,
              border: c === color ? '3px solid #000' : '1px solid #ccc',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
            title={c}
          />
        ))}
      </div>

      <button onClick={() => setShowPicker(!showPicker)} style={{ marginBottom: '10px' }}>
        {showPicker ? 'Ocultar selector' : 'Mostrar selector avanzado'}
      </button>

      {showPicker && (
        <HexColorPicker color={color} onChange={onChange} style={{ width: '100%', maxWidth: '280px' }} />
      )}

      <div className="color-value" style={{ marginTop: '10px' }}>
        <span>Código: </span>
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '100px' }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
