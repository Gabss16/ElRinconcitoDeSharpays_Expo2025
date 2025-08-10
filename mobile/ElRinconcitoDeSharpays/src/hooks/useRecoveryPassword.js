import { useState } from "react";
import { Platform } from "react-native";

// Reemplaza con tu IP local para pruebas en dispositivo físico
const LOCAL_IP = "192.168.1.1"; // ⚠️ CAMBIAR por la IP de tu PC

// Detecta el host según plataforma
const API_HOST =
  Platform.OS === "android"
    ? "http://10.0.2.2:4000" // Android Emulator
    : `http://${LOCAL_IP}:4000`; // iOS o físico

const API = `${API_HOST}/api/recoveryPassword`;

const useRecoveryPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendCode = async () => {
    if (!email) {
      alert("Ingrese el correo electrónico");
      return false;
    }

    try {
      const res = await fetch(`${API}/requestCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Se envió el código");
        return true;
      } else {
        alert(data.message || "Hubo un error");
        return false;
      }
    } catch (err) {
      console.error(err);
      alert("Error al enviar el código");
      return false;
    }
  };

  const verifyCode = async () => {
    if (!code) {
      alert("Ingrese el código");
      return false;
    }

    try {
      const res = await fetch(`${API}/verifyCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Se verificó el código");
        return true;
      } else {
        alert(data.message || "El código no es válido");
        return false;
      }
    } catch (err) {
      console.error(err);
      alert("Error al verificar el código");
      return false;
    }
  };

  const resetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Complete los campos");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch(`${API}/newPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Se restableció la contraseña");
      } else {
        alert(data.message || "Error");
      }
    } catch (err) {
      console.error(err);
      alert("Error al establecer la nueva contraseña");
    }
  };

  return {
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    sendCode,
    verifyCode,
    resetPassword,
  };
};

export default useRecoveryPassword;
