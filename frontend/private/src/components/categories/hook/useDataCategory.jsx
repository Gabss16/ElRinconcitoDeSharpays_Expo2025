import { useState, useEffect } from "react";

const useDataCategories = () => {
  const API = "http://localhost:4000/api/categories";

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");

  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [isActive, setIsActive] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(API);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error al obtener las categorías", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setId("");
    setDescription("");
    setCategory("");
    setDetails("");
    setIsActive(true);
    setActiveTab("list");
  };

  const saveCategory = async (categoryData) => {
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || data.message || "Error al insertar");
      }

      fetchCategories();
      resetForm();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleEdit = async (categoryData) => {
    try {
      const response = await fetch(`${API}/${categoryData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || data.message || "Error al actualizar");
      }

      fetchCategories();
      resetForm();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar categoría");
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const updateCategory = (cat) => {
    setId(cat._id);
    setDescription(cat.description);
    setCategory(cat.category);
    setDetails(cat.details);
    setIsActive(cat.isActive);
    setActiveTab("form");
  };

  return {
    activeTab,
    setActiveTab,
    id,
    description,
    setDescription,
    category,
    setCategory,
    details,
    setDetails,
    isActive,
    setIsActive,
    categories,
    loading,
    saveCategory,
    deleteCategory,
    updateCategory,
    handleEdit,
    resetForm,
  };
};

export default useDataCategories;
