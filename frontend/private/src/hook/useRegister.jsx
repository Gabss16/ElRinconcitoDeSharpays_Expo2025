import SuccessAlert from "../components/SuccessAlert.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";

const API = "http://localhost:4000/api/registerEmployee";

export const registerEmployee = async ({ name, email, password }) => {
  try {
    const res = await fetch(API, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      SuccessAlert(data.message || "Registro éxitoso");
      return true;
    } else {
      ErrorAlert(data.message || "Error al registrar");
      return false;
    }
  } catch (err) {
    console.error("Error al registrar empleado:", err);
    ErrorAlert("Error del servidor");
    return false;
  }
};
