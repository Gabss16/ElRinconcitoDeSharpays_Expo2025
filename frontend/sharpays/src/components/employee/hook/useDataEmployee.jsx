import { useState, useEffect } from "react";

const useDataEmployee = () => {
  const API = "http://localhost:4000/api/employees";
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/devkosnau/image/upload";
  const UPLOAD_PRESET = "ml_default";
  const API = "http://localhost:4000/api/employees";
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/<tu_cloud_name>/image/upload";
  const UPLOAD_PRESET = "<tu_upload_preset>";

  const [Employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error al obtener los empleados", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al subir imagen");

    const data = await response.json();
    return data.secure_url;
  };

  const saveUser = async (e) => {
    e.preventDefault();

    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        finalImageUrl = await uploadImageToCloudinary(imageFile);
      }

      const newEmployee = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        image: finalImageUrl || "", // Garantizar que siempre haya una key
      };

      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear empleado");
      }

      resetForm();
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar empleado");

      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const updateEmployee = (emp) => {
    setId(emp._id);
    setName(emp.name);
    setEmail(emp.email);
    setPassword("");
    setImageUrl(emp.image || "");
    setImageFile(null);
    setActiveTab("form");
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        finalImageUrl = await uploadImageToCloudinary(imageFile);
      }

      const updatedEmployee = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        image: finalImageUrl || "",
      };

      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al actualizar");
      }

      resetForm();
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const resetForm = () => {
    setId("");
    setName("");
    setEmail("");
    setPassword("");
    setImageFile(null);
    setImageUrl("");
    setActiveTab("list");
  };

  return {
    activeTab,
    setActiveTab,
    id,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    Employees,
    loading,
    saveUser,
    deleteEmployee,
    updateEmployee,
    handleEdit,
    imageFile,
    setImageFile,
    imageUrl,
    setImageUrl,
  };
};

export default useDataEmployee;
