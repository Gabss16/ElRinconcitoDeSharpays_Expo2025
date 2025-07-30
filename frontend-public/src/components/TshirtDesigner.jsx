import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import * as fabric from 'fabric';
import ColorPicker from './ColorPicker';
import DesignControls from './DesignControls';
import TShirtView from './TshirtView';

const TShirtDesigner = () => {
  const [tshirtColor, setTshirtColor] = useState('#ffffff');
  const [viewSide, setViewSide] = useState('front');
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const fileInputRef = useRef(null);

  // Alternar vista del frente o reverso
  const toggleViewSide = useCallback(() => {
    setViewSide(prev => (prev === 'front' ? 'back' : 'front'));
  }, []);

  // Inicializar canvas cuando cambia la vista
  useLayoutEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const parent = canvasEl.parentElement;
    const { width, height } = parent.getBoundingClientRect();

    const fabricCanvas = new fabric.Canvas(canvasEl, {
      backgroundColor: 'transparent',
      selection: true,
      perPixelTargetFind: true,
      selectionFullyContained: true,
      skipTargetFind: false,
      renderOnAddRemove: false,
      snapAngle: 0,
    });

    fabricCanvas.setWidth(width);
    fabricCanvas.setHeight(height);
    fabricCanvas.defaultCursor = 'default';
    fabricCanvas.hoverCursor = 'move';

    fabricCanvas.on('object:moving', () => {});

    fabricCanvas.on('object:modified', (e) => {
      const obj = e.target;
      let left = obj.left,
          top = obj.top,
          maxLeft = fabricCanvas.getWidth() - obj.getScaledWidth(),
          maxTop = fabricCanvas.getHeight() - obj.getScaledHeight();

      const newLeft = Math.min(Math.max(left, 0), maxLeft);
      const newTop = Math.min(Math.max(top, 0), maxTop);

      if (newLeft !== left || newTop !== top) {
        obj.set({ left: newLeft, top: newTop });
        obj.setCoords();
        fabricCanvas.renderAll();
      }
    });

    setCanvas(fabricCanvas);

    return () => fabricCanvas.dispose();
  }, [viewSide]);

  // Cargar imagen al canvas
  const handleImageUpload = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (!file || !canvas) {
        console.warn('No hay archivo o canvas no disponible');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imgElement = new Image();
        imgElement.crossOrigin = 'anonymous';
        imgElement.src = event.target.result;

        imgElement.onload = () => {
          const fabricImage = new fabric.Image(imgElement, {
            scaleX: canvas.getWidth() / (2 * imgElement.width),
            scaleY: canvas.getHeight() / (2 * imgElement.height),
            left: canvas.getWidth() / 2,
            top: canvas.getHeight() / 2,
            originX: 'center',
            originY: 'center',
            stroke: 'red',
            strokeWidth: 1,
            objectCaching: true,
            selectable: true,
            evented: true,
          });

          canvas.add(fabricImage);
          canvas.setActiveObject(fabricImage);

          if (typeof fabricImage.bringToFront === 'function') {
            fabricImage.bringToFront();
          } else if (typeof canvas.bringObjectToFront === 'function') {
            canvas.bringObjectToFront(fabricImage);
          }

          canvas.renderAll();
        };

        imgElement.onerror = (err) => {
          console.error('Error cargando imagen nativa', err);
        };
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    },
    [canvas]
  );

  // Eliminar objeto seleccionado
  const handleDeleteDesign = () => {
    if (canvas) {
      const obj = canvas.getActiveObject();
      if (obj) {
        canvas.remove(obj);
        canvas.renderAll();
      }
    }
  };

  // Añadir texto al canvas
  const handleAddText = (text) => {
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
        <TShirtView
          tshirtColor={tshirtColor}
          viewSide={viewSide}
          canvasRef={canvasRef}
        />
        <button onClick={toggleViewSide} className="flip-button">
          Girar Camiseta ({viewSide === 'front' ? 'Frente' : 'Atrás'})
        </button>
      </div>

      <div className="controls">
        <ColorPicker color={tshirtColor} onChange={setTshirtColor} />
        <DesignControls
          onImageUpload={handleImageUpload}
          onDelete={handleDeleteDesign}
          hasSelection={canvas?.getActiveObject() !== null}
          fileInputRef={fileInputRef}
          onAddText={handleAddText} // ✅ PASAMOS LA FUNCIÓN AQUÍ
        />
      </div>
    </div>
  );
};

export default TShirtDesigner;
