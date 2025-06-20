import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useUserDataProducts = () => {
  const ApiProducts = "http://localhost:4000/api/Products";

  // Campos comunes
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");     // Mini tienda
  const [subCategoryId, setSubCategoryId] = useState(""); // Categoría producto
  const [image, setImage] = useState("");

  // Campos dinámicos (otherFields)
  const [otherFields, setOtherFields] = useState({}); 

  const [errorProduct, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Limpia el formulario
  const cleanData = () => {
    setId("");
    setName("");
    setDescription("");
    setStock("");
    setPrice("");
    setCategoryId("");
    setSubCategoryId("");
    setImage("");
    setOtherFields({});
    setError(null);
    setSuccess(null);
  };

  // Fetch productos
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(ApiProducts);
      if (!response.ok) throw new Error("Error al obtener productos");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  // Crear nuevo producto
  const handleSubmit = async (e) => {
    e.preventDefault();

 /*
    if (!name || !description || !stock || !price || !categoryId || !subCategoryId) {
      alert("debes de llenar todos los campos")
      setError("Todos los campos obligatorios deben llenarse");
      toast.error("Completa todos los campos obligatorios");
      return;
    }
 */
    try {
      setLoading(true);
      const newProduct = {
        name,
        description,
        stock,
        price,
        categoryId,
        subCategoryId,
        image,
        ...otherFields,  // Aquí incluimos los campos dinámicos
      };

      console.log(newProduct)

      const response = await fetch(ApiProducts, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Error al crear producto");

      toast.success("Producto creado");
      setSuccess("Producto creado correctamente");
      cleanData();
      fetchData();
      alert("despues de crear producto")
    } catch (error) {
      console.error("Error crear producto:", error);
      toast.error("Error al crear producto");
      setError(error.message);
    } finally {
      setLoading(false);
      alert("Se ejecuto la funcion finally")
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${ApiProducts}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar producto");

      toast.success("Producto eliminado");
      fetchData();
    } catch (error) {
      console.error("Error eliminar producto:", error);
      toast.error("Error al eliminar producto");
    }
  };

  // Cargar datos en formulario para edición
  const updateProduct = (product) => {
    setId(product._id);
    setName(product.name);
    setDescription(product.description);
    setStock(product.stock);
    setPrice(product.price);
    setCategoryId(product.categoryId);
    setSubCategoryId(product.subCategoryId);
    setImage(product.image);

    // Cargar otros campos dinámicos quitando los campos comunes
    const { name, description, stock, price, categoryId, subCategoryId, image, _id, __v, ...rest } = product;
    setOtherFields(rest);

    setError(null);
    setSuccess(null);
  };

  // Guardar cambios edición
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const updatedProduct = {
        name,
        description,
        stock,
        price,
        categoryId,
        subCategoryId,
        image,
        ...otherFields,
      };

      const response = await fetch(`${ApiProducts}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error("Error al actualizar producto");

      toast.success("Producto actualizado");
      setSuccess("Producto actualizado correctamente");
      cleanData();
      fetchData();
    } catch (error) {
      console.error("Error actualizar producto:", error);
      toast.error("Error al actualizar producto");
      setError(error.message);
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
    image,
    setImage,
    otherFields,
    setOtherFields,
    errorProduct,
    setError,
    success,
    setSuccess,
    loading,
    products,
    setProducts,
    cleanData,
    fetchData,
    handleSubmit,
    deleteProduct,
    updateProduct,
    handleUpdate,
  };
};

export default useUserDataProducts;
