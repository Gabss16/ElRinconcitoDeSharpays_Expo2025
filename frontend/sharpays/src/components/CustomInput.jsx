const CustomInput = ({label,placeholder,type,name}) => {
    return (
    <div className="m-2">
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          //{...login(name, `${label} es obligatorio!`)}
          placeholder={placeholder}
          type={type}
          className="custom-input"
          required
        />
      </div>
    </div>
  );
};

export default CustomInput;