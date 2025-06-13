const CustomSelect = ({name,options}) => {
    return (
        <div className="m-2">
  <label htmlFor={name} className="text-white">
    {name}
  </label>
  <div className="mt-2">
    <select
      id={name}
      className="custom-input p-0"
      required
    >
      <option value="">Seleccione una opción</option>
        {options.map((dep) => (
          <option key={dep.codigo} value={dep.nombre}>
            {dep.label}
          </option>
        ))}
    </select>
  </div>
</div>

      );
};

export default CustomSelect;
