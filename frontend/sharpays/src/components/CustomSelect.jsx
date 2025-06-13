const CustomSelect = ({name}) => {
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
      <option value="opcion1">Opción 1</option>
      <option value="opcion2">Opción 2</option>
      <option value="opcion3">Opción 3</option>
    </select>
  </div>
</div>

      );
};

export default CustomSelect;
