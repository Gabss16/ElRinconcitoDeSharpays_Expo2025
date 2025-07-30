import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import * as fabric from 'fabric';
import ColorPicker from './ColorPicker';
import DesignControls from './DesignControls';
import DualTShirtView from './DualTshirtView';

const TShirtDesigner = () => {
  const [tshirtColor, setTshirtColor] = useState('#ffffff');
  const frontCanvasRef = useRef(null);
  const backCanvasRef = useRef(null);
  const [frontCanvas, setFrontCanvas] = useState(null);
  const [backCanvas, setBackCanvas] = useState(null);
  const fileInputRef = useRef(null);
  const [editingSide, setEditingSide] = useState('front');

  const getActiveCanvas = () => (editingSide === 'front' ? frontCanvas : backCanvas);

  const initializeCanvas = useCallback((ref, setCanvas) => {
    const canvasEl = ref.current;
    if (!canvasEl) return;

    // Elimina cualquier canvas fabric anterior en ese <canvas>
    if (canvasEl.__fabricInstance) {
      canvasEl.__fabricInstance.dispose();
      canvasEl.__fabricInstance = null;
    }

    // Limpia el contenido real del canvas HTML
    canvasEl.width = canvasEl.width;
    canvasEl.height = canvasEl.height;

    const parent = canvasEl.parentElement;
    const { width, height } = parent.getBoundingClientRect();

    const fabricCanvas = new fabric.Canvas(canvasEl, {
      backgroundColor: 'transparent',
      selection: true,
      renderOnAddRemove: false,
    });

    fabricCanvas.setWidth(width);
    fabricCanvas.setHeight(height);

    // Guarda la instancia en el DOM para futuras referencias
    canvasEl.__fabricInstance = fabricCanvas;
    setCanvas(fabricCanvas);
  }, []);

  useLayoutEffect(() => {
    initializeCanvas(frontCanvasRef, setFrontCanvas);
    initializeCanvas(backCanvasRef, setBackCanvas);

    return () => {
      if (frontCanvasRef.current?.__fabricInstance) {
        frontCanvasRef.current.__fabricInstance.dispose();
        frontCanvasRef.current.__fabricInstance = null;
      }
      if (backCanvasRef.current?.__fabricInstance) {
        backCanvasRef.current.__fabricInstance.dispose();
        backCanvasRef.current.__fabricInstance = null;
      }
    };
  }, []);

  const handleImageUpload = useCallback(
    (e) => {
      const file = e.target.files[0];
      const canvas = getActiveCanvas();
      if (!file || !canvas) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const imgElement = new Image();
        imgElement.src = event.target.result;
        imgElement.onload = () => {
          const img = new fabric.Image(imgElement, {
            scaleX: canvas.getWidth() / (2 * imgElement.width),
            scaleY: canvas.getHeight() / (2 * imgElement.height),
            left: canvas.getWidth() / 2,
            top: canvas.getHeight() / 2,
            originX: 'center',
            originY: 'center',
            selectable: true,
          });
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
        };
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    },
    [editingSide, frontCanvas, backCanvas]
  );

  const handleDeleteDesign = () => {
    const canvas = getActiveCanvas();
    const obj = canvas?.getActiveObject();
    if (obj) {
      canvas.remove(obj);
      canvas.renderAll();
    }
  };

  const handleAddText = (text) => {
    const canvas = getActiveCanvas();
    if (!canvas || !text.trim()) return;

    const textObj = new fabric.Textbox(text, {
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      originX: 'center',
      originY: 'center',
      fontSize: 24,
      fill: '#000000',
      fontFamily: 'Arial',
      editable: true,
      selectable: true,
    });

    canvas.add(textObj);
    canvas.setActiveObject(textObj);
    canvas.renderAll();
  };

  return (
    <div className="tshirt-designer">
      <div className="design-area">
        <DualTShirtView
          tshirtColor={tshirtColor}
          frontCanvasRef={frontCanvasRef}
          backCanvasRef={backCanvasRef}
        />
        <div style={{ marginTop: '10px' }}>
          <label>Editar lado: </label>
          <select value={editingSide} onChange={(e) => setEditingSide(e.target.value)}>
            <option value="front">Frente</option>
            <option value="back">Atrás</option>
          </select>
        </div>
      </div>

      <div className="controls">
        <ColorPicker color={tshirtColor} onChange={setTshirtColor} />
        <DesignControls
          onImageUpload={handleImageUpload}
          onDelete={handleDeleteDesign}
          hasSelection={getActiveCanvas()?.getActiveObject() !== null}
          fileInputRef={fileInputRef}
          onAddText={handleAddText}
        />
      </div>
    </div>
  );
};

export default TShirtDesigner;
