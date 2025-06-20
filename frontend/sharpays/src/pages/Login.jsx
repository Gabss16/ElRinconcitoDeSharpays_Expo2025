import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GlassBox from "../components/GlassBox.jsx";

//Animaciones
import LightsAnimation from "../components/lightsAnimation.jsx";

//Componentes utilizados en el login-container
import LogoLogin from "../components/LogoLogin.jsx";
import CustomTitle from "../components/CustomTitle.jsx";
import CustomInput from "../components/CustomInput.jsx";
import LinkText from "../components/LinkText.jsx";
import CustomButton from "../components/CustomButton.jsx";

//Imágenes
import huella from "../assets/huella.png";
import cactus from "../assets/cactus.png";
import vela from "../assets/vela.png";
import paleta from "../assets/paleta.png";

//AuthContext
import { useAuth } from "../context/AuthContext.jsx";

//Alertas
import ErrorAlert from "../components/ErrorAlert.jsx";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      ErrorAlert("Por favor, completa todos los campos.");
      return;
    }

    const success = await login(email, password);
    if (!success) {
      ErrorAlert("Credenciales incorrectas.");
      return;
    }
    navigate("/Dashboard");
  };

  useEffect(() => {
    const miCookie = localStorage.getItem("authToken");
    console.log(miCookie, "cookie desde el login useEffect");
  }, []);

  return (
    <>
      <div className="login-container d-flex">
        <div className="lights-background">
          <img src={huella} className="float huella" />
          <img src={paleta} className="float paleta" />
          <img src={vela} className="float vela" />
          <img src={cactus} className="float cactus" />

          <LightsAnimation NUM_LIGHTS={50} />

          <GlassBox>
            {
              <>
                <LogoLogin textStyle={"text-white fw-bold fs-5 pt-2 w-50"} />

                  <form className="login-content d-flex justify-content-center align-items-center flex-column mt-4 w-100" onSubmit={handleSubmit}>
                    <CustomTitle
                      style={"text-white fw-bold fs-2 mb-5"}
                      text={"Login"}
                    />

                    <CustomInput
                      label={"Correo electrónico"}
                      placeholder={"Ejemplo@gmail.com"}
                      type={"email"}
                      name={"email"}
                    />

                    <CustomInput
                      label={"Contraseña"}
                      placeholder={"********"}
                      type={"password"}
                      name={"password"}
                    />
                    <div style={{ width: "300px", marginTop: "5px" }}>
                      <LinkText
                        text={"Olvidé mi contraseña"}
                        action={"/RecoveryPassword"}
                      />

                      <CustomButton
                        text={"Iniciar Sesión"}
                        background={"black"}
                        color={"white"}
                        width={"100%"}
                        height={"50px"}
                      />
                      <div className="go-to-register text-center mt-5 d-flex">
                        <p className="m-0 ps-3 pe-1 text-white">
                          ¿No tienes cuenta?
                        </p>
                        <LinkText text={"Registrarme"} action={"/Register"} />
                      </div>
                    </div>
                  </form>
              </>
            }
          </GlassBox>
        </div>
      </div>
    </>
  );
};

export default Login;
