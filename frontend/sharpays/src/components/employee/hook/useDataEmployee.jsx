import { useState, useEffect } from "react";


const useDataEmployee = () => {
  const API = "http://localhost:4000/api/employee";
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/<tu_cloud_name>/image/upload";
  const UPLOAD_PRESET = "<tu_upload_preset>";

  const [Employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null); // archivo de imagen
  const [imageUrl, setImageUrl] = useState(""); // URL en Cloudinary

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error("Error al obtener los usuarios");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error(error);
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

    if (!response.ok) throw new Error("Error al subir la imagen a Cloudinary");

    const data = await response.json();
    return data.secure_url;
  };

  const saveEmployee = async (e) => {
    e.preventDefault();

    try {
      let uploadedImageUrl = imageUrl;

      if (imageFile) {
        uploadedImageUrl = await uploadImageToCloudinary(imageFile);
      }

      const newEmployee = {
        name,
        email,
        password,
        image: uploadedImageUrl,
      };

      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) throw new Error("Error al registrar el usuario");

      setName("");
      setEmail("");
      setPassword("");
      setImageFile(null);
      setImageUrl("");
      fetchEmployees();
    } catch (error) {
    
      console.error(error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar el usuario");

   
      fetchEmployees();
    } catch (error) {
      
      console.error(error);
    }
  };

  const updateEmployee = (Employee) => {
    setId(Employee._id);
    setName(Employee.name);
    setEmail(Employee.email);
    setPassword("");
    setImageUrl(Employee.image || "");
    setImageFile(null);
    setActiveTab("form");
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      let uploadedImageUrl = imageUrl;

      if (imageFile) {
        uploadedImageUrl = await uploadImageToCloudinary(imageFile);
      }

      const updatedEmployee = {
        name,
        email,
        password,
        image: uploadedImageUrl,
      };

      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) throw new Error("Error al actualizar el usuario");

   
      setId("");
      setName("");
      setEmail("");
      setPassword("");
      setImageFile(null);
      setImageUrl("");
      setActiveTab("list");
      fetchEmployees();
    } catch (error) {
     
      console.error(error);
    }
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
    saveEmployee,
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
