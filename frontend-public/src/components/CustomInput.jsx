const CustomInput = ({
  value,
  onChange,
  disable,
  className = "",
  ...props
}) => {
  return (
    <input
      className={`custom-input ${className}`}
      value={value}
      onChange={onChange}
      disabled={disable}
      {...props}
    />
  );
};

export default CustomInput;
