const CustomInput = ({
  label,
  placeholder,
  type,
  name,
  disable,
  hidden,
  onChange,
  value,
  maxLength
}) => {
  return (
    <div className="m-2">
      <label htmlFor={name} className="form-label" hidden={hidden}>
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          placeholder={placeholder}
          type={type}
          className="custom-input"
          disabled={disable}
          hidden={hidden}
          onChange={onChange}
          value={value ?? ''} 
          maxLength={maxLength}
        />
      </div>
    </div>
  );
};

export default CustomInput;
