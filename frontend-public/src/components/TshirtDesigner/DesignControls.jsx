import { useRef, useState } from 'react';

const DesignControls = ({ onImageUpload, onDelete, hasSelection, fileInputRef, isLoading }) => {
  
  const handleUploadClick = () => {
    if (!isLoading) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="design-controls-panel">
      <h3>Controles de Diseño</h3>

      <div className="upload-section">
        <button 
          onClick={handleUploadClick} 
          className="upload-button"
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Cargar tu diseño'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/svg+xml,image/gif"
          onChange={onImageUpload}
          style={{ display: 'none' }}
        />
        <p className="upload-hint">
          Formatos: JPG, PNG, SVG, GIF (máx. 10MB)
        </p>
      </div>

      <button 
        onClick={onDelete} 
        className="delete-button"
        disabled={!hasSelection}
      >
        {hasSelection ? 'Eliminar diseño seleccionado' : 'Selecciona un elemento para eliminar'}
      </button>
      <div className="price-section">
        <p className="price">Precio: $515.99</p>
        <button className="add-to-cart">Añadir al carrito</button>
      </div>
    </div>
  );
};

export default DesignControls;