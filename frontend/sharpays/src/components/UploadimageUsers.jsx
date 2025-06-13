import "../styles/UploadimageUsers.css";
import CustomButton from "./CustomButton"; 
function SubirImagen() {
  return (
    <div className="subir-imagen-contenedor">
      <div className="subir-imagen-zona"></div>
      <CustomButton
      text={"Subir imagen"}
      background={"Black"}
      color={"white"}
      height/>
      
    </div>
  );
}

export default SubirImagen;
