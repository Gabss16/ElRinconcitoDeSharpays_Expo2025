// src/pages/frostybites.jsx
import React, { useState, useEffect } from "react";
import ImageUploadPage from "../components/products/frostyBites/regiterFrostyBites"; // Asegúrate de que el nombre del archivo sea correcto
import ProductsTable from "../components/products/frostyBites/frostyTable";
import { Title } from "../components/Typography";
import "../styles/SharpayPage.css";
import useUserDataProducts from "../components/products/hook/userDataProducts";

const FrostyBites = () => {
  const [activeTab, setActiveTab] = useState("agregar");
  const [isEditing, setIsEditing] = useState(false);
  const [tipoObjeto, setTipoObjeto] = useState(""); // Asegúrate de definir tipoObjeto

  const {
    name, setName,
    description, setDescription,
    stock, setStock,
    price, setPrice,
    categoryId, setCategoryId,
    subCategoryId, setSubCategoryId,
    image, setImage,
    otherFields, setOtherFields,
    handleSubmit,
    handleUpdate,
    products,
    deleteProduct,
    updateProduct,
    loading,
    fetchData
  } = useUserDataProducts();

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (prod) => {
    setName(prod.name);
    setDescription(prod.description);
    setStock(prod.stock);
    setPrice(prod.price);
    setImage(prod.image);
    setOtherFields({ flavor: prod.flavor }); // Cambié "size" a "flavor"
    setTipoObjeto(prod.subCategoryId); // Asegúrate de establecer el tipo de objeto si es necesario
    setIsEditing(true);
    setActiveTab("agregar");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-10">
            <div className="sharpay-page">
              <Title>FrostyBites</Title>

              <div className="custom-tabs">
                <div
                  className={`tab ${activeTab === "agregar" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("agregar");
                    setIsEditing(false); // Reiniciar el modo edición al cambiar de tab
                  }}
                >
                  Agregar
                </div>
                <div
                  className={`tab ${activeTab === "vista" ? "active" : ""}`}
                  onClick={() => setActiveTab("vista")}
                >
                  Vista
                </div>
              </div>

              {activeTab === "agregar" && (
                <ImageUploadPage
                  name={name} setName={setName}
                  description={description} setDescription={setDescription}
                  stock={stock} setStock={setStock}
                  price={price} setPrice={setPrice}
                  categoryId={categoryId} setCategoryId={setCategoryId}
                  subCategoryId={subCategoryId} setSubCategoryId={setSubCategoryId}
                  image={image} setImage={setImage}
                  otherFields={otherFields} setOtherFields={setOtherFields}
                  handleSubmit={handleSubmit}
                  handleUpdate={handleUpdate}
                  tipoObjeto={tipoObjeto} setTipoObjeto={setTipoObjeto} // Asegúrate de pasar tipoObjeto
                  isEditing={isEditing}
                />
              )}
              {activeTab === "vista" && (
                <ProductsTable
                  products={products}
                  deleteProduct={deleteProduct}
                  updateProduct={handleEdit}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrostyBites;
