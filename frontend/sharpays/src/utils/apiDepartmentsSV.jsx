import { useEffect, useState } from "react";

const url = "https://juanmedina100.github.io/departamentos-distritos-municipios-el-salvador/departamentos-distritos-municipios-sv.json";

const apiDeparmentsSV = () => {
  const [Departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Extraer y mapear Departments
        const dptos = data.map((dpto) => ({
          codigo: dpto.codigo,
          nombre: dpto.nombre
        }));
        setDepartments(dptos);
      })
      .catch((err) => console.error("Error al cargar datos:", err));
  }, []);

  return (
    Departments
  );
}

export default apiDeparmentsSV;
