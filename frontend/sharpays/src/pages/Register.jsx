import "../styles/Register.css"
import { useNavigate } from "react-router-dom";
import GlassBox from "../components/GlassBox.jsx";

import React, { useMemo } from "react";

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
import CustomSelect from "../components/CustomSelect.jsx";

//Departementos API
import Departments from "../utils/apiDepartmentsSV.jsx"

const NUM_LIGHTS = 50;

const randomPosition = () => Math.random() * 100 + "%";

const Register = () => {

  const depa = Departments();

  const navigate = useNavigate();

  const lightsPositions = useMemo(() =>
    Array.from({ length: NUM_LIGHTS }, () => ({
      top: randomPosition(),
      left: randomPosition(),
      size: 10 + Math.random() * 12,
      duration: 8 + Math.random() * 7,
      delay: Math.random() * 5,
    })), []
  );

    return (
      <>
      <div className="register-container d-flex">
        <div className="lights-background">
        <img src={huella} className="float huella"/>
        <img src={paleta} className="float paleta"/>
        <img src={vela} className="float vela"/>
        <img src={cactus} className="float cactus"/>

        {lightsPositions.map((light, i) => (
          <div
            key={`light-${i}`}
            className="light"
            style={{
              top: light.top,
              left: light.left,
              width: light.size + "px",
              height: light.size + "px",
              animationDuration: light.duration + "s",
              animationDelay: light.delay + "s",
            }}
          />
        ))}

        <GlassBox>
        {
          <>
          <LogoLogin textStyle={"text-white fw-bold fs-5 pt-2 w-50"} />
                    
                    <div className="register-content d-flex justify-content-center align-items-center flex-column mt-4 w-100">
                        <CustomTitle
                        style={"text-white fw-bold fs-2 mb-5"}
                        text={"Registro"}
                        />

                        <CustomInput
                        label={"Nombre"}
                        placeholder={"Nombre completo"}
                        name={"name"}
                        />

                        <CustomInput
                        label={"Correo eletrónico"}
                        placeholder={"ejemplo@gmail.com"}
                        type={"email"}
                        name={"password"}
                        />

                        <CustomSelect
                        name={"Departamento"}
                        departmens={depa}
                        />
                        <CustomInput
                        label={"Dirección"}
                        placeholder={"Dirección del lugar de entrega"}
                        name={"direccion"}
                        />

                        <LinkText
                        text={"Olvidé mi contraseña"}
                        action={"/Login"}
                        />

                      <div style={{width: '300px', marginTop: '5px'}}>
                      <CustomButton
                        text={"Registrarme"}
                        action={(e) => navigate("/Inicio")}
                        background={"black"}
                        color={"white"}
                        width={"100%"}
                        height={"50px"}
                        />
                      </div>
                      
                    </div>
          </>
        }
        </GlassBox>
        </div>
      </div>
      </>
    )
}

export default Register;
