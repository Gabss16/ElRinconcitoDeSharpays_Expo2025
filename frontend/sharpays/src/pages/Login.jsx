import "../styles/Login.css"
import { useNavigate } from "react-router-dom";
import GlassBox from "../components/GlassBox.jsx";

//Componentes utilizados en el login-container
import LogoLogin from "../components/LogoLogin.jsx";
import CustomTitle from "../components/CustomTitle.jsx";
import CustomInput from "../components/CustomInput.jsx"
import LinkText from "../components/LinkText.jsx";
import CustomButton from "../components/CustomButton.jsx";

//Imágenes
import huella from "../assets/huella.png";
import cactus from "../assets/cactus.png";
import vela from "../assets/vela.png";
import paleta from "../assets/paleta.png";

const Login = () => {

  const navigate = useNavigate();

    return (
      <>
      <div className="login-container d-flex">
        <img src={huella} className="float huella"/>
        <img src={paleta} className="float paleta"/>
        <img src={vela} className="float vela"/>
        <img src={cactus} className="float cactus"/>

        <GlassBox>
        {
          <>
          <LogoLogin textStyle={"text-white fw-bold fs-5 pt-2 w-50"} />
                    
                    <div className="d-flex justify-content-center align-items-center flex-column mt-4 w-100">
                        <CustomTitle
                        style={"text-white fw-bold fs-2 mb-5"}
                        text={"Login"}
                        />

                        <CustomInput
                        label={"Correo Electrónico"}
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
                        <div style={{width: '300px', marginTop: '5px'}}>
                        <LinkText
                        text={"Olvidé mi contraseña"}
                        action={"/RecuperacionContrasena"}
                        />
                        <CustomButton
                        text={"Iniciar Sesión"}
                        action={(e) => navigate("/Inicio")}
                        background={"black"}
                        color={"white"}
                        width={"100%"}
                        height={"50px"}
                        />
                        <div className="text-center mt-5 d-flex">
                        <p className="m-0 ps-3 pe-1 text-white">No tengo una cuenta</p>
                        <LinkText 
                          text={"Registrarme"}
                          action={"/Registro"}/>
                        </div>
                        </div>
                    </div>
          </>
        }
        </GlassBox>
      </div>
      </>
    )
}

export default Login;
