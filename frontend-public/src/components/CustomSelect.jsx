const CustomSelect = ({ name, departmens, onChange }) => {
  return (
    <div className="m-2">
      <label htmlFor={name} className="text-white">
        {name}
      </label>
      <div className="mt-2">
        <select id={name} className="custom-input p-0" required onChange={onChange}>
          <option value="">Seleccione una opción</option>
          {departmens?.map((dep) => (
            <option key={dep.value} value={dep.value}>
              {dep.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomSelect;
