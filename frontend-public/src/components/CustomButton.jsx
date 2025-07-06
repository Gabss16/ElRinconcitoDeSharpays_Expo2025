const CustomButton = ({
  text,
  onClick,
  background,
  color,
  width,
  height,
  border,
}) => {
  return (
    <button
      type="submit" // Cambia a "submit" si quieres que envíe formulario
      className="custom-btn"
      style={{
        backgroundColor: background,
        color: color,
        width: width,
        height: height,
        border: border,
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
