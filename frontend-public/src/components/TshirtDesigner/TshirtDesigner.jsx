import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import * as fabric from 'fabric';
import ColorPicker from './ColorPicker';
import DesignControls from './DesignControls';
import TShirtView from './TshirtView';
import TextControls from './TextControls';
import LoadingSpinner from './LoadingSpinner';

const TShirtDesigner = () => {
  const [tshirtColor, setTshirtColor] = useState('#ffffff');
  const [viewSide, setViewSide] = useState('front');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const fileInputRef = useRef(null);
  const dualImage = '/images/dualchemis.png';

  const toggleViewSide = useCallback(() => {
    setViewSide(prev => (prev === 'front' ? 'back' : 'front'));
  }, []);

  const saveState = useCallback(() => {
    if (!canvas) return;
    const state = JSON.stringify(canvas.toJSON());
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(state);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [canvas, history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0 && canvas) {
      const prevState = history[historyIndex - 1];
      canvas.loadFromJSON(prevState, () => {
        canvas.renderAll();
        setHistoryIndex(historyIndex - 1);
      });
    }
  }, [canvas, history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1 && canvas) {
      const nextState = history[historyIndex + 1];
      canvas.loadFromJSON(nextState, () => {
        canvas.renderAll();
        setHistoryIndex(historyIndex + 1);
      });
    }
  }, [canvas, history, historyIndex]);

  useLayoutEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl || canvas) return;

    const parent = canvasEl.parentElement;
    const { width, height } = parent.getBoundingClientRect();

    const fabricCanvas = new fabric.Canvas(canvasEl, {
      dualImage: true,
      selection: true,
      preserveObjectStacking: true,
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

    fabric.Image.fromURL('/images/dualchemis.png', (img) => {
      img.scaleToWidth(fabricCanvas.getWidth());
      img.scaleToHeight(fabricCanvas.getHeight());
      fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas));
    });

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

      saveState();
    });

    setCanvas(fabricCanvas);

    return () => fabricCanvas.dispose();
  }, []);

  const handleImageUpload = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (!file || !canvas) return;

      if (!['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'].includes(file.type)) {
        alert('Por favor, sube solo imágenes JPG, PNG, SVG o GIF');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('La imagen es muy grande. Máximo 10MB');
        return;
      }

      setIsLoading(true);

      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgElement = new Image();
          imgElement.crossOrigin = 'anonymous';
          imgElement.src = event.target.result;

          imgElement.onload = () => {
            try {
              const fabricImage = new fabric.Image(imgElement, {
                scaleX: canvas.getWidth() / (2 * imgElement.width),
                scaleY: canvas.getHeight() / (2 * imgElement.height),
                left: canvas.getWidth() / 2,
                top: canvas.getHeight() / 2,
                originX: 'center',
                originY: 'center',
                stroke: 'rgba(0,123,255,0.5)',
                strokeWidth: 2,
                objectCaching: true,
                selectable: true,
                evented: true,
              });

              canvas.add(fabricImage);
              canvas.setActiveObject(fabricImage);
              canvas.remove(fabricImage);
              canvas.add(fabricImage);

              canvas.renderAll();
              saveState();
              setIsLoading(false);
            } catch (error) {
              console.error('Error creando imagen Fabric:', error);
              alert('Error al procesar la imagen');
              setIsLoading(false);
            }
          };

          imgElement.onerror = () => {
            alert('Error al cargar la imagen. Intenta con otra imagen.');
            setIsLoading(false);
          };
        };

        reader.readAsDataURL(file);
        e.target.value = '';
      } catch (error) {
        console.error('Error en handleImageUpload:', error);
        alert('Error al procesar la imagen');
        setIsLoading(false);
      }
    },
    [canvas, saveState]
  );

  const handleDeleteDesign = useCallback(() => {
    if (canvas) {
      const obj = canvas.getActiveObject();
      if (obj) {
        canvas.remove(obj);
        canvas.renderAll();
        saveState();
      }
    }
  }, [canvas, saveState]);

  const handleAddText = useCallback((text, fontSize, fontFamily, color) => {
    if (!canvas || !text.trim()) return;

    const textObj = new fabric.Textbox(text, {
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      originX: 'center',
      originY: 'center',
      fontSize: fontSize || 24,
      fill: color || '#000000',
      fontFamily: fontFamily || 'Arial',
      editable: true,
      selectable: true,
      stroke: 'rgba(0,123,255,0.3)',
      strokeWidth: 1,
    });

    canvas.add(textObj);
    canvas.setActiveObject(textObj);
    canvas.renderAll();
    saveState();
  }, [canvas, saveState]);

  // 🔹 Nueva función para exportar camiseta + diseño en un solo PNG
  const exportDesign = useCallback(() => {
    return new Promise((resolve) => {
      if (!canvas) return resolve(null);
  
      const shirtImage = new Image();
      shirtImage.src = '/images/dualchemis.png';
      shirtImage.crossOrigin = 'anonymous';
  
      shirtImage.onload = () => {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.getWidth();
        tempCanvas.height = canvas.getHeight();
        const ctx = tempCanvas.getContext('2d');
  
        ctx.drawImage(shirtImage, 0, 0, tempCanvas.width, tempCanvas.height);
  
        const designData = canvas.toDataURL('image/png');
        const designImage = new Image();
        designImage.src = designData;
        designImage.crossOrigin = 'anonymous';
  
        designImage.onload = () => {
          ctx.drawImage(designImage, 0, 0);
  
          const finalImage = tempCanvas.toDataURL('image/png');
          console.log("✅ Imagen final generada");
          resolve(finalImage); // 👈 devolver la imagen
        };
      };
    });
  }, [canvas]);
  

  return (
    <div className="app-container">
      {isLoading && <LoadingSpinner />}

      <div className="header-section">
        <div className="tshirt-display">
          <TShirtView
            tshirtColor={tshirtColor}
            viewSide={viewSide}
            canvasRef={canvasRef}
          />
        </div>

        <div className="text-controls-header">
          <TextControls
            onAddText={handleAddText}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
            onUndo={undo}
            onRedo={redo}
          />
        </div>
      </div>

      <div className="content-section">
          <div className="controls-row">
            <ColorPicker color={tshirtColor} onChange={setTshirtColor} />
            <DesignControls
              onImageUpload={handleImageUpload}
              onDelete={handleDeleteDesign}
              hasSelection={canvas?.getActiveObject() !== null}
              fileInputRef={fileInputRef}
              isLoading={isLoading}
              fabricCanvas={canvas}
              exportDesign={exportDesign}
            />
            <button onClick={exportDesign}>Exportar diseño</button>
          </div>
        </div>
      </div>
  );
};

export default TShirtDesigner;
