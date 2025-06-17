import "../styles/RecoveryPassword.css";
import { useNavigate } from "react-router-dom";

//Animaciones
import LightsAnimation from "../components/LightsAnimation.jsx"
import ShapesAnimation from "../components/ShapesAnimation.jsx";

//Componentes
import GlassBox from "../components/GlassBox.jsx";
import LogoLogin from "../components/LogoLogin.jsx";
import CustomTitle from "../components/CustomTitle.jsx";
import CustomInput from "../components/CustomInput.jsx";
import LinkText from "../components/LinkText.jsx";
import CustomButton from "../components/CustomButton.jsx";

const RecoveryPassword = () => {

    const navigate = useNavigate();

  return (
    <>
      <div className="recovery-password-container d-flex">
        <div className="lights-background">

          <LightsAnimation
          NUM_LIGHTS={80}
          />

           <ShapesAnimation
           NUM_SHAPES={10}/>

          <GlassBox>
            {
              <>
                <LogoLogin textStyle={"text-white fw-bold fs-5 pt-2 w-50"} />

                <div className="recovery-password-content d-flex justify-content-center align-items-center flex-column mt-4 w-100">
                  <CustomTitle
                    style={"text-white fw-bold fs-3 mb-5"}
                    text={"Recuperación de contraseña"}
                  />

                  <CustomInput
                    label={"Correo electrónico"}
                    placeholder={"Ejemplo@gmail.com"}
                    type={"email"}
                    name={"email"}
                  />

                  <p className="text-white text-center" hidden >Ingrese el código que se envio a su <br /> <b>correo electrónico</b></p>
                  <CustomInput
                    label={"Codigo de verificación"}
                    placeholder={"00000000"}
                    type={"number"}
                    name={"verificationCode"}
                    disable={true}
                  />
                  <div style={{ width: "300px", marginTop: "5px" }}>
                    <CustomButton
                      text={"Enviar código"}
                      action={(e) => navigate("/ResetPassword")}
                      background={"black"}
                      color={"white"}
                      width={"100%"}
                      height={"50px"}
                    />
                    <div className="go-to-register text-center mt-5 pt-5 d-flex">
                      <p className="m-0 ps-1 pe-1 text-white">
                        ¿No recibiste el código?
                      </p>
                      <LinkText text={"Reenviar"} action={"reenviar codigo"} />
                    </div>
                  </div>
                </div>
              </>
            }
          </GlassBox>
        </div>
      </div>
    </>
  );
};

export default RecoveryPassword;