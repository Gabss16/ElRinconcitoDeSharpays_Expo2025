import { useState } from 'react';

const TextControls = ({ onAddText, canUndo, canRedo, onUndo, onRedo }) => {
  const [textInput, setTextInput] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');

  const fonts = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Georgia',
    'Verdana',
    'Comic Sans MS',
    'Impact',
    'Trebuchet MS',
    'Courier New'
  ];

  const handleAddText = () => {
    if (textInput.trim()) {
      onAddText(textInput, fontSize, fontFamily, textColor);
      setTextInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddText();
    }
  };

  return (
    <div className="text-controls-panel">
      <h3>Agregar Texto</h3>

      <div className="text-input-section">
        <input
          type="text"
          placeholder="Escribe tu texto"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="text-input"
        />
        <button 
          onClick={handleAddText} 
          className="add-text-button"
          disabled={!textInput.trim()}
        >
          Añadir texto
        </button>
      </div>

      <div className="text-options">
        <div className="option-group">
          <label>Tamaño:</label>
          <input
            type="range"
            min="10"
            max="80"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="size-slider"
          />
          <span className="size-value">{fontSize}px</span>
        </div>

        <div className="option-group">
          <label>Fuente:</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="font-select"
          >
            {fonts.map(font => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div className="option-group">
          <label>Color del texto:</label>
          <div className="color-input-wrapper">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="color-input"
            />
            <span className="color-hex">{textColor}</span>
          </div>
        </div>
      </div>

      <div className="history-controls">
        <button 
          onClick={onUndo} 
          disabled={!canUndo}
          className="history-button"
          title="Deshacer"
        >
          ↶ Deshacer
        </button>
        <button 
          onClick={onRedo} 
          disabled={!canRedo}
          className="history-button"
          title="Rehacer"
        >
          ↷ Rehacer
        </button>
      </div>
    </div>
  );
};

export default TextControls;