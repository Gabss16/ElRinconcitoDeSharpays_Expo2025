import TShirtView from './TshirtView';

const DualTShirtView = ({ tshirtColor, frontCanvasRef, backCanvasRef }) => {
  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
      <div style={{ width: '300px', height: '400px' }}>
        <TShirtView
          tshirtColor={tshirtColor}
          viewSide="front"
          canvasRef={frontCanvasRef}
        />
      </div>
      <div style={{ width: '300px', height: '400px' }}>
        <TShirtView
          tshirtColor={tshirtColor}
          viewSide="back"
          canvasRef={backCanvasRef}
        />
      </div>
    </div>
  );
};

export default DualTShirtView;
