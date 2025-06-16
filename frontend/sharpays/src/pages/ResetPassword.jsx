import "../styles/ResetPassword.css";
import { useNavigate } from "react-router-dom";

//Componentes
import GlassBox from "../components/GlassBox.jsx";
import LogoLogin from "../components/LogoLogin.jsx";
import CustomTitle from "../components/CustomTitle.jsx";
import CustomInput from "../components/CustomInput.jsx";
import CustomButton from "../components/CustomButton.jsx";

import React, { useMemo } from "react";

const NUM_LIGHTS = 80;
const NUM_SHAPES = 10;

const randomPosition = () => Math.random() * 100 + "%";

const ResetPassword = () => {

     const navigate = useNavigate();
    
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
        <div className="reset-password-container d-flex">
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

                <div className="reset-password-content d-flex justify-content-center align-items-center flex-column mt-4 w-100">
                  <CustomTitle
                    style={"text-white fw-bold fs-3 mb-5"}
                    text={"Restablecer contraseña"}
                  />

                  <CustomInput
                    label={"Nueva contraseña"}
                    placeholder={"********"}
                    type={"text"}
                    name={"newPassword"}
                  />

                  <CustomInput
                    label={"Confirmar contraseña"}
                    placeholder={"********"}
                    type={"text"}
                    name={"confirmPassword"}
                  />
                  <div style={{ width: "300px", marginTop: "30px" }}>
                    <CustomButton
                      text={"Restablecer"}
                      action={(e) => navigate("/ResetPassword")}
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
    );
};

export default ResetPassword;