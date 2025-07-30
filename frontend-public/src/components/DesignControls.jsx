import { useRef, useState } from 'react';

const DesignControls = ({ onImageUpload, onDelete, hasSelection, fileInputRef, onAddText }) => {
  const [textInput, setTextInput] = useState('');

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleAddText = () => {
    if (textInput.trim()) {
      onAddText(textInput);
      setTextInput(''); // Limpiar campo
    }
  };

  return (
    <div className="design-controls">
      <h3>Personaliza tu diseño</h3>

      <div className="upload-section">
        <button onClick={handleUploadClick} className="upload-button">
          Cargar tu diseño
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      <div className="text-section">
        <input
          type="text"
          placeholder="Escribe tu texto"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <button onClick={handleAddText}>Añadir texto</button>
      </div>

      <button 
        onClick={onDelete} 
        className="delete-button"
        disabled={!hasSelection}
      >
        Eliminar diseño seleccionado
      </button>

      <div className="instructions">
        <p>Después de subir tu diseño, puedes:</p>
        <ul>
          <li>Arrastrar para moverlo</li>
          <li>Usar los controles para cambiar el tamaño</li>
          <li>Rotar con el control circular</li>
          <li>Seleccionar y eliminar diseños</li>
        </ul>
      </div>

      <div className="price-section">
        <p>Precio: $515.99</p>
        <button className="add-to-cart">Añadir al carrito</button>
      </div>
    </div>
  );
};

export default DesignControls;
