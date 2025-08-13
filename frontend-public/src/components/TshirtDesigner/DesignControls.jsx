import { useRef } from 'react';
import useDataShoppingCart from '../shoppingCart/hooks/useDataShoppingCart';

const DesignControls = ({ 
  onImageUpload, 
  onDelete, 
  hasSelection, 
  fileInputRef, 
  isLoading, 
  fabricCanvas,
  exportDesign // <--- pasarlo desde TShirtDesigner
}) => {

  const { addToCart } = useDataShoppingCart();

  const handleUploadClick = () => {
    if (!isLoading) {
      fileInputRef.current.click();
    }
  };

  const handleAddToCart = async () => {
    if (!fabricCanvas || fabricCanvas.getObjects().length === 0) {
      alert("No hay diseño para agregar.");
      return;
    }

    if (!exportDesign) {
      alert("Función exportDesign no disponible.");
      return;
    }

    try {
      const finalImage = await exportDesign(); // 🔹 combina base + diseño

      const customProduct = {
        _id: `custom-${Date.now()}`,
        name: "Camiseta Personalizada",
        price: 15.99,
        image: finalImage,
        customDesign: finalImage, // ✅ para enviar al backend
        description: "Diseño único creado en el editor",
        size: null,
        flavor: null,
      };

      addToCart(customProduct, 1);
      alert("✅ Diseño agregado al carrito");

    } catch (err) {
      console.error("Error al exportar el diseño:", err);
      alert("❌ No se pudo agregar el diseño al carrito");
    }
  };

  return (
    <div className="design-controls-panel">
      <h3>Controles de Diseño</h3>

      <div className="upload-section">
        <button 
          onClick={handleUploadClick}  
          className="upload-button-soft"
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
        className="delete-button-black"
        disabled={!hasSelection}
      >
        {hasSelection ? 'Eliminar diseño seleccionado' : 'Selecciona un elemento para eliminar'}
      </button>
      
      <div className="price-section">
        <p className="price">Precio: $15.99</p>
        <button 
          className="add-to-cart" 
          onClick={handleAddToCart}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default DesignControls;

