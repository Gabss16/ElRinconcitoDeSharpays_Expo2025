const CustomInput = ({label,placeholder,type,name,disable, hidden, onChange}) => {
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
        />
      </div>
    </div>
  );
};

export default CustomInput;