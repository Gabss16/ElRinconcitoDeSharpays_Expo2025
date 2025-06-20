const CustomInput = ({label,placeholder,type,name,disable, hidden}) => {
    return (
    <div className="m-2">
      <label htmlFor={name} className="text-white" hidden={hidden}>
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          //{...login(name, `${label} es obligatorio!`)}
          placeholder={placeholder}
          type={type}
          className="custom-input"
          disabled={disable}
          hidden={hidden}
        />
      </div>
    </div>
  );
};

export default CustomInput;