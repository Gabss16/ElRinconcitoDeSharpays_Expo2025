import "../styles/RecoveryPassword.css";

//Componentes
import GlassBox from "../components/GlassBox.jsx";
import LogoLogin from "../components/LogoLogin.jsx";
import CustomTitle from "../components/CustomTitle.jsx";
import CustomInput from "../components/CustomInput.jsx";
import LinkText from "../components/LinkText.jsx";
import CustomButton from "../components/CustomButton.jsx";


import React, { useMemo } from "react";

const NUM_LIGHTS = 80;
const NUM_SHAPES = 10;

const randomPosition = () => Math.random() * 100 + "%";

const RecoveryPassword = () => {

  const lightsPositions = useMemo(
    () =>
      Array.from({ length: NUM_LIGHTS }, () => ({
        top: randomPosition(),
        left: randomPosition(),
        size: 10 + Math.random() * 12,
        duration: 8 + Math.random() * 7,
        delay: Math.random() * 5,
      })),
    []
  );

  const shapes = useMemo(() =>
    Array.from({ length: NUM_SHAPES }, () => ({
      top: randomPosition(),
      left: randomPosition(),
      size: 30 + Math.random() * 60,
      duration: 20 + Math.random() * 15,
      delay: Math.random() * 10,
      type: Math.random() > 0.5 ? "circle" : "triangle",
      direction: Math.random() > 0.5 ? "normal" : "reverse",
    })), []
  );

  return (
    <>
      <div className="recovery-password-container d-flex">
        <div className="lights-background">

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

           {
    shapes.map((shape, i) => (
      <div
        key={`shape-${i}`}
        className={`shape ${shape.type}`}
        style={{
          top: shape.top,
          left: shape.left,
          width: shape.size + "px",
          height: shape.size + "px",
          animationDuration: shape.duration + "s",
          animationDelay: shape.delay + "s",
          animationDirection: shape.direction,
        }}
      />
    ))
  }

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
                      action={(e) => navigate("/Inicio")}
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