const CustomButton = ({ text, onClick, className }) => (
  <button type="button" className={className} onClick={onClick}>
    {text}
  </button>
);

export default CustomButton;
