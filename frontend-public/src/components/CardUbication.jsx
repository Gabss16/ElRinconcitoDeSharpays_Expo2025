import { useState } from "react";
import Button from "../components/CustomButton";
import useDepartmentsSV from "../../../frontend/private/src/utils/apiDepartmentsSV";
import "../styles/CardUbication.css";


export default function CardUbication() {
  const departments = useDepartmentsSV();
  const [selected, setSelected] = useState("");
  const [editando, setEditando] = useState(false);

  return (
    <div className="card-ubication mt-5">
      <label className="card-ubication__label">Ubicación</label>
      <div className="card-ubication__input-container">
        {editando ? (
          <select
            className="card-ubication__input"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Selecciona un departamento</option>
            {departments.map((dep) => (
              <option key={dep.value} value={dep.label}>
                {dep.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="card-ubication__input"
            type="text"
            value={selected}
            placeholder="Sin ubicación"
            disabled
          />
        )}
      <Button
  onClick={() => setEditando(!editando)}
  className="button-pink"
  text={editando ? "Guardar" : "Editar"}
/>
      </div>
    </div>
  );
}
