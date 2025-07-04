import "../styles/RecoveryPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Animaciones
import LightsAnimation from "../components/LightsAnimation.jsx";
import ShapesAnimation from "../components/ShapesAnimation.jsx";

// Componentes
import GlassBox from "../components/GlassBox.jsx";
import LogoLogin from "../components/LogoLogin.jsx";
import CustomTitle from "../components/CustomTitle.jsx";
import CustomInput from "../components/CustomInput.jsx";
import LinkText from "../components/LinkText.jsx";
import CustomButton from "../components/CustomButton.jsx";
import useRecoveryPassword from "../hook/useRecoveryPassword.jsx";

const RecoveryPassword = () => {

  const navigate = useNavigate();

  const {
    sendCode,
    verifyCode,
    resetPassword,
    setEmail,
    email,
    code,
    setCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
  } = useRecoveryPassword();

  const [step, setStep] = useState(1); // 1: Envio de código → 2: Verificación código → 3: Nueva contraseña

  return (
    <div className="recovery-password-container d-flex">
      <div className="lights-background">
        <LightsAnimation NUM_LIGHTS={80} />
        <ShapesAnimation NUM_SHAPES={10} />

        <GlassBox>
          <LogoLogin textStyle="text-white fw-bold fs-5 pt-2 w-50" />

          <div className="recovery-password-content d-flex justify-content-center align-items-center flex-column mt-5 w-100">
            <CustomTitle
              style="text-white fw-bold fs-3 mb-5"
              text="Recuperación de contraseña"
            />

            {step === 1 && (
              <>
                <CustomInput
                  label="Correo electrónico"
                  placeholder="Ejemplo@gmail.com"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <CustomButton
                  text="Enviar código"
                  onClick={async (e) => {
                    const success = await sendCode(e);
                    if (success) {
                      setStep(2);
                    }

                  }}
                  background="black"
                  color="white"
                  width="300px"
                  height="50px"
                />

                <div className="go-to-register text-center mt-5 pt-5 d-flex">
                  <p className="m-0 ps-1 pe-1 text-white">
                    ¿No recibiste el código?
                  </p>
                  <LinkText text="Reenviar" action="reenviar codigo" />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="text-white text-center">
                  Ingrese el código que se envió a su <br />
                  <b>correo electrónico</b>
                </p>

                <CustomInput
                  label="Código de verificación"
                  placeholder="000000"
                  type="number"
                  name="code"
                  maxLength={5}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />

                <CustomButton
                  text="Verificar código"
                  onClick={async (e) => {
                    await verifyCode(e);
                    setStep(3);
                  }}
                  background="black"
                  color="white"
                  width="300px"
                  height="50px"
                />
              </>
            )}

            {step === 3 && (
              <>
                <CustomInput
                  label="Nueva contraseña"
                  placeholder="********"
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <CustomInput
                  label="Confirmar contraseña"
                  placeholder="********"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <CustomButton
                  text="Restablecer contraseña"
                  onClick={resetPassword}
                  background="black"
                  color="white"
                  width="300px"
                  height="50px"
                />
              </>
            )}
          </div>
        </GlassBox>
      </div>
    </div>
  );
};

export default RecoveryPassword;
