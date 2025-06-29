// src/pages/SharpaysPage.jsx
import React, { useState, useEffect } from "react";
import ImageUploadPage from "../components/products/sharpaysBoutique/registerSharpays";
import ProductsTable from "../components/products/sharpaysBoutique/sharpaysTable";
import { Title } from "../components/Typography";
import "../styles/SharpayPage.css";
import useUserDataProducts from "../components/products/hook/userDataProducts";

const SharpaysPage = () => {
  const [activeTab, setActiveTab] = useState("agregar");
  const [isEditing, setIsEditing] = useState(false);

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
    selectedSizes, setSelectedSizes,
    tipoObjeto, setTipoObjeto,
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
    updateProduct(prod);
    setIsEditing(true);
    setActiveTab("agregar");
  };

  return (
    <div className="sharpay-page">
      <Title>Sharpay's Boutique</Title>

      <div className="custom-tabs">
        <div
          className={`tab ${activeTab === "agregar" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("agregar");
            setIsEditing(false); // ← si cambia de tab, se reinicia el modo edición
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
          selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
          tipoObjeto={tipoObjeto} setTipoObjeto={setTipoObjeto}
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
  );
};

export default SharpaysPage;
