import React, { useState } from "react";
import AdvertisementsUpload from "../components/events/advertisementsUpload";
import AdvertisementsTable from "../components/events/advertisementsTable";
import { Title } from "../components/Typography";
import useDataAdvertisement from "../components/events/hook/useDataAdvertisement";
import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import QuestionAlert from "../components/QuestionAlert.jsx";

import Swal from "sweetalert2";
import "../styles/Events.css";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("agregar");

  // Estados del formulario
  const [tittle, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Estados para edición
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Hook personalizado para manejar los anuncios
  const {
    advertisements,
    loading,
    error,
    createAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
    toggleAdvertisementStatus, // Nueva función para cambiar estado
    clearError,
    refreshAdvertisements,
  } = useDataAdvertisement();

  // Manejar envío del formulario (crear)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validar campos requeridos
      if (!tittle || !description || !image) {
        ErrorAlert("Por favor, completa todos los campos requeridos");
        return;
      }

      const advertisementData = {
        tittle,
        description,
        status: "Activo", // Status por defecto
        image,
      };

      // Crear el anuncio
      await createAdvertisement(advertisementData);
      
      // Refrescar los datos para asegurar sincronización
      await refreshAdvertisements();
      
      // Limpiar formulario y cambiar a vista
      resetForm();
      setActiveTab("vista");
      SuccessAlert("Anuncio creado exitosamente");
    } catch (err) {
      console.error("Error al crear anuncio:", err);
      ErrorAlert("Error al crear el anuncio: " + err.message);
    }
  };

  // Manejar actualización (editar)
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      // Validar campos requeridos
      if (!tittle || !description || !image) {
        ErrorAlert("Por favor, completa todos los campos requeridos");
        return;
      }

      const advertisementData = {
        tittle,
        description,
        status: "Activo", // Status por defecto
        image,
      };

      // Actualizar el anuncio
      await updateAdvertisement(editingId, advertisementData);
      
      // Refrescar los datos para asegurar sincronización
      await refreshAdvertisements();
      
      // Limpiar formulario y cambiar a vista
      resetForm();
      setActiveTab("vista");
      SuccessAlert("Anuncio actualizado exitosamente");
    } catch (err) {
      console.error("Error al actualizar anuncio:", err);
      ErrorAlert("Error al actualizar el anuncio: " + err.message);
    }
  };

  // Manejar edición (cargar datos en el formulario)
  const handleEdit = (ad) => {
    setTittle(ad.tittle);
    setDescription(ad.description);
    setImage(ad.image);
    setEditingId(ad._id);
    setIsEditing(true);
    setActiveTab("agregar");
  };

  // Manejar eliminación
  const handleDelete = async (id) => {
    const result = await QuestionAlert("¿Estás seguro de eliminar este evento?")

    if (result.isConfirmed) {
      try {
        // Eliminar el anuncio
        await deleteAdvertisement(id);
        
        // Refrescar los datos para asegurar sincronización
        await refreshAdvertisements();
        
        SuccessAlert("Anuncio eliminado exitosamente");
      } catch (err) {
        console.error("Error al eliminar anuncio:", err);
        ErrorAlert("Error al eliminar el anuncio: " + err.message);
      }
    }
  };

  // Manejar cambio de estado
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Activo" ? "Inactivo" : "Activo";
    const actionText = currentStatus === "Activo" ? "desactivar" : "activar";
    
    const result = await Swal.fire({
      title: `¿Estás seguro?`,
      text: `¿Quieres ${actionText} este anuncio?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Sí, ${actionText}`,
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      },
      buttonsStyling: false
    });

    if (result.isConfirmed) {
      try {
        // Cambiar el estado del anuncio
        await toggleAdvertisementStatus(id);
        
        // Refrescar los datos para asegurar sincronización
        await refreshAdvertisements();
        
        SuccessAlert(`Anuncio ${newStatus === "Activo" ? "activado" : "desactivado"} exitosamente`);
      } catch (err) {
        console.error("Error al cambiar estado:", err);
        ErrorAlert("Error al cambiar el estado: " + err.message);
      }
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setTittle("");
    setDescription("");
    setImage("");
    setIsEditing(false);
    setEditingId(null);
    clearError(); 
  };

  // Manejar cambio de tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "agregar") {
      setIsEditing(false);
      resetForm();
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-10">
            <div className="sharpay-page">
              <Title>Gestión de Eventos</Title>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={clearError}
                  ></button>
                </div>
              )}

              <div className="custom-tabs">
                <div
                  className={`tab ${activeTab === "agregar" ? "active" : ""}`}
                  onClick={() => handleTabChange("agregar")}
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
                <AdvertisementsUpload
                  tittle={tittle}
                  setTittle={setTittle}
                  description={description}
                  setDescription={setDescription}
                  image={image}
                  setImage={setImage}
                  isEditing={isEditing}
                  handleSubmit={handleSubmit}
                  handleUpdate={handleUpdate}
                />
              )}

              {activeTab === "vista" && (
                <AdvertisementsTable
                  advertisements={advertisements}
                  loading={loading}
                  updateAd={handleEdit}
                  deleteAd={handleDelete}
                  toggleStatus={handleToggleStatus}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;