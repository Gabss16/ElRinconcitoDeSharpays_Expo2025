import { useState, useEffect } from "react";


const useDataUsers = () => {
  const API = "http://localhost:4000/api/users";
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/<tu_cloud_name>/image/upload";
  const UPLOAD_PRESET = "<tu_upload_preset>";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null); // archivo de imagen
  const [imageUrl, setImageUrl] = useState(""); // URL en Cloudinary

  const fetchUsers = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error("Error al obtener los usuarios");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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

  const saveUser = async (e) => {
    e.preventDefault();

    try {
      let uploadedImageUrl = imageUrl;

      if (imageFile) {
        uploadedImageUrl = await uploadImageToCloudinary(imageFile);
      }

      const newUser = {
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
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error("Error al registrar el usuario");

      setName("");
      setEmail("");
      setPassword("");
      setImageFile(null);
      setImageUrl("");
      fetchUsers();
    } catch (error) {
    
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar el usuario");

   
      fetchUsers();
    } catch (error) {
      
      console.error(error);
    }
  };

  const updateUser = (user) => {
    setId(user._id);
    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setImageUrl(user.image || "");
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

      const updatedUser = {
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
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Error al actualizar el usuario");

   
      setId("");
      setName("");
      setEmail("");
      setPassword("");
      setImageFile(null);
      setImageUrl("");
      setActiveTab("list");
      fetchUsers();
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
    users,
    loading,
    saveUser,
    deleteUser,
    updateUser,
    handleEdit,
    imageFile,
    setImageFile,
    imageUrl,
    setImageUrl,
  };
};

export default useDataUsers;
