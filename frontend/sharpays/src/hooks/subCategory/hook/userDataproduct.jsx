import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const userDataProducts = (productType) => {
  const ApiProducts = "http://localhost:4000/api/Products";

  // Campos comunes
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [imageFile, setImageFile] = useState(null); // Para imagen

  // Campos extra según producto
  const [talla, setTalla] = useState("");   // solo camisas
  const [sabor, setSabor] = useState("");   // solo paletas

  // Estado para errores y éxito
  const [errorProduct, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Limpiar formulario
  const cleanData = () => {
    setId("");
    setName("");
    setDescription("");
    setStock(0);
    setPrice(0);
    setCategoryId("");
    setSubCategoryId("");
    setImageFile(null);
    setTalla("");
    setSabor("");
    setError(null);
    setSuccess(null);
  };

  // Armar datos para enviar según tipo
  const buildProductData = () => {
    let data = {
      name,
      description,
      stock,
      price,
      categoryId,
      subCategoryId,
    };

    if (productType === "camisas") {
      data.talla = talla;
    } else if (productType === "paletas") {
      data.sabor = sabor;
    }
    // velas no tiene campos extras

    return data;
  };

  // Validar campos mínimos según tipo
  const validate = () => {
    if (!name || !stock || !price || !categoryId || !subCategoryId) {
      toast.error("Completa todos los campos obligatorios");
      return false;
    }

    if (productType === "camisas" && !talla) {
      toast.error("Por favor ingresa la talla");
      return false;
    }

    if (productType === "paletas" && !sabor) {
      toast.error("Por favor ingresa el sabor");
      return false;
    }

    return true;
  };

  // Crear producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let response;
      if (imageFile) {
        const formData = new FormData();
        const productData = buildProductData();

        Object.entries(productData).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append("image", imageFile);

        response = await fetch(ApiProducts, {
          method: "POST",
          body: formData,
        });
      } else {
        const productData = buildProductData();

        response = await fetch(ApiProducts, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
      }

      if (!response.ok) throw new Error("Error al crear el producto");

      toast.success("Producto creado correctamente");
      setSuccess("Producto creado correctamente");
      cleanData();
    } catch (error) {
      console.error("Error al crear producto:", error);
      setError(error.message);
      toast.error("Error al crear el producto");
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos de producto para editar
  const loadProduct = async (productId) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${ApiProducts}/${productId}`);
      if (!response.ok) throw new Error("Error al cargar el producto");
      const data = await response.json();

      setId(data._id || "");
      setName(data.name || "");
      setDescription(data.description || "");
      setStock(data.stock || 0);
      setPrice(data.price || 0);
      setCategoryId(data.categoryId || "");
      setSubCategoryId(data.subCategoryId || "");

      if (productType === "camisas") setTalla(data.talla || "");
      else if (productType === "paletas") setSabor(data.sabor || "");

      setImageFile(null); // no cargamos archivo, solo para subir uno nuevo

      setSuccess("Producto cargado para editar");
    } catch (error) {
      console.error("Error al cargar producto:", error);
      setError(error.message);
      toast.error("Error al cargar el producto");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar producto
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    if (!id) {
      toast.error("No se ha seleccionado un producto para actualizar");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let response;
      if (imageFile) {
        const formData = new FormData();
        const productData = buildProductData();

        Object.entries(productData).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append("image", imageFile);

        response = await fetch(`${ApiProducts}/${id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        const productData = buildProductData();

        response = await fetch(`${ApiProducts}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
      }

      if (!response.ok) throw new Error("Error al actualizar el producto");

      toast.success("Producto actualizado correctamente");
      setSuccess("Producto actualizado correctamente");
      cleanData();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      setError(error.message);
      toast.error("Error al actualizar el producto");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const handleDelete = async (productId) => {
    if (!productId) {
      toast.error("ID del producto inválido para eliminar");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${ApiProducts}/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar el producto");

      toast.success("Producto eliminado correctamente");
      setSuccess("Producto eliminado correctamente");

      // Si el producto que editas es el eliminado, limpiar formulario
      if (id === productId) cleanData();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setError(error.message);
      toast.error("Error al eliminar el producto");
    } finally {
      setLoading(false);
    }
  };

  return {
    id,
    setId,
    name,
    setName,
    description,
    setDescription,
    stock,
    setStock,
    price,
    setPrice,
    categoryId,
    setCategoryId,
    subCategoryId,
    setSubCategoryId,
    imageFile,
    setImageFile,
    talla,
    setTalla,
    sabor,
    setSabor,
    errorProduct,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    cleanData,
    handleSubmit,
    loadProduct,
    handleUpdate,
    handleDelete,
  };
};

export default userDataProducts;
