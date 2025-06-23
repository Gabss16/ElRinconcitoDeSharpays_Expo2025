const CustomInput = ({
  label,
  placeholder,
  type,
  name,
  disable,
  hidden,
  onChange,
  value,
}) => {
  return (
    <div className="m-2">
      <label htmlFor={name} className="text-white" hidden={hidden}>
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
          value={value} // Agregado para controlar el input
        />
      </div>
    </div>
  );
};

export default CustomInput;
