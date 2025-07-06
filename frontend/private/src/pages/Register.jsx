import "../styles/Register.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlassBox from "../components/GlassBox.jsx";

// Animaciones
import LightsAnimation from "../components/LightsAnimation.jsx";

// Componentes utilizados
import LogoLogin from "../components/LogoLogin.jsx";
import CustomTitle from "../components/CustomTitle.jsx";
import CustomInput from "../components/CustomInput.jsx";
import LinkText from "../components/LinkText.jsx";
import CustomButton from "../components/CustomButton.jsx";

// Imágenes
import huella from "../assets/huella.png";
import cactus from "../assets/cactus.png";
import vela from "../assets/vela.png";
import paleta from "../assets/paleta.png";

// Hook
import { registerEmployee } from "../hook/useRegister"; 

//Alertas
import ErrorAlert from "../components/ErrorAlert.jsx";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      ErrorAlert("Todos los campos son obligatorios");
    }
    else if (password !== confirmPassword) {
      ErrorAlert("Las contraseñas no coinciden");
    }
    else{
      const success = await registerEmployee({ name, email, password });
  
      if (success) {
        navigate("/Login");
      }
    }

  };

  return (
    <>
      <div className="register-container d-flex">
        <div className="lights-background">
          <img src={huella} className="float huella" />
          <img src={paleta} className="float paleta" />
          <img src={vela} className="float vela" />
          <img src={cactus} className="float cactus" />

          <LightsAnimation NUM_LIGHTS={80} />

          <GlassBox>
            <>
              <LogoLogin textStyle={"text-white fw-bold fs-5 pt-2 w-50"} />

              <form
                onSubmit={handleSubmit}
                className="register-content d-flex justify-content-center align-items-center flex-column mt-5 w-100"
              >
                <CustomTitle
                  style={"text-white fw-bold fs-2 mb-4"}
                  text={"Registro"}
                />

                <CustomInput
                  label={"Nombre"}
                  placeholder={"Nombre completo"}
                  name={"name"}
                  onChange={(e) => setName(e.target.value)}
                />

                <CustomInput
                  label={"Correo electrónico"}
                  placeholder={"ejemplo@gmail.com"}
                  type={"email"}
                  name={"email"}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <CustomInput
                  label={"Contraseña"}
                  placeholder={"********"}
                  name={"password"}
                  type={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <CustomInput
                  label={"Confirmar contraseña"}
                  placeholder={"********"}
                  name={"confirmPassword"}
                  type={"password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div style={{ width: "300px", marginTop: "30px" }}>
                  <CustomButton
                    text={"Registrarme"}
                    type="submit"
                    background={"black"}
                    color={"white"}
                    width={"100%"}
                    height={"50px"}
                  />
                </div>

                <div className="go-to-register text-center mt-3 pt-4 d-flex">
                  <LinkText text={"Iniciar sesión"} action={"/Login"} />
                </div>
              </form>
            </>
          </GlassBox>
        </div>
      </div>
    </>
  );
};

export default Register;
