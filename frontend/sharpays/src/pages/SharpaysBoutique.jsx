import React, { useState } from "react";
import FormSharpays from "../components/products/sharpaysBoutique/registerSharpays";
import TableSharpays from "../components/products/sharpaysBoutique/sharpaysTable";
import { Title } from "../components/Typography";
import "../styles/SharpayPage.css"; // Asegúrate de importar el CSS
import useUserDataProducts from "../components/products/hook/userDataProducts";

const SharpaysPage = () => {
  const [activeTab, setActiveTab]=useState("agregar")
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
         selectedSizes, 
    setSelectedSizes,
    tipoObjeto,
    setTipoObjeto,
    products,
    deleteProduct,   // también útil para pasarlo
    updateProduct,
     loading      // también útil para pasarlo
   } = useUserDataProducts();
  return (
    <div className="sharpay-page">
      <Title>Sharpay's Boutique</Title>

      {/* Tabs desde cero */}
      <div className="custom-tabs">
        <div
          className={`tab ${activeTab === "agregar" ? "active" : ""}`}
          onClick={() => setActiveTab("agregar")}
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

      {/* Contenido según tab activo */}
      {activeTab === "agregar" && (
        <FormSharpays 
        name={name} setName={setName}
     description={description} setDescription={setDescription}
     stock={stock} setStock={setStock}
     price={price} setPrice={setPrice}
     categoryId={categoryId} setCategoryId={setCategoryId}
     subCategoryId={subCategoryId} setSubCategoryId={setSubCategoryId}
     image={image} setImage={setImage}
     otherFields={otherFields} setOtherFields={setOtherFields}
     handleSubmit={handleSubmit}
         selectedSizes={selectedSizes}
         setSelectedSizes={setSelectedSizes}
    tipoObjeto={tipoObjeto}
    setTipoObjeto={setTipoObjeto}
        />
      )}
      {activeTab === "vista" && (
  <TableSharpays
    products={products}
    deleteProduct={deleteProduct}
    updateProduct={updateProduct}
    loading={loading}
  />
)}
    </div>
  );
};

export default SharpaysPage;
