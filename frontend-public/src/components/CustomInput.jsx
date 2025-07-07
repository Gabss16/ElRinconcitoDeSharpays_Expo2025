const CustomInput = ({
  label,
  placeholder,
  type = "text",
  name,
  disable,
  hidden,
  onChange,
  value,
  maxLength,
  className = "",
}) => {
  return (
    <div className={`custom-input-container ${className}`} hidden={hidden}>
      {label && (
        <label htmlFor={name} className="custom-input-label">
          {label}
        </label>
      )}
      <input
        id={name}
        placeholder={placeholder}
        type={type}
        className="custom-input"
        disabled={disable}
        onChange={onChange}
        value={value ?? ""}
        maxLength={maxLength}
      />
    </div>
  );
};

export default CustomInput;
