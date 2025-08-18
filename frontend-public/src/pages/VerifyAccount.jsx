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
import CustomButton from "../components/CustomButton.jsx";
import VerifyAcccount from "../components/customer/hook/useDataCustomer.jsx";

const VerifyAccount = () => {

  const {setVerificationCode, verificationCode, verifyCustomer} = VerifyAcccount();

  const navigate = useNavigate();

  return (
    <div className="recovery-password-container d-flex">
      <div className="lights-background">
        <LightsAnimation NUM_LIGHTS={80} />
        <ShapesAnimation NUM_SHAPES={10} />

        <GlassBox>
          <LogoLogin textStyle="text-white fw-bold fs-5 pt-2 w-50" />

          <div className="recovery-password-content d-flex justify-content-center align-items-center flex-column mt-5 pt-5 w-100 text-white">
            <CustomTitle
              style="text-white fw-bold fs-3 mb-5"
              text="Verificación de cuenta"
            />
            <CustomInput
                  label="Código de verificación"
                  placeholder="00000000"
                  type="text"
                  maxLength={6}
                  name="verifyAccount"
                  //value={accountVerificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />

                <CustomButton
                  text="Verificar"
                  onClick={async (e) => {verifyCustomer(e)}}
                  background="black"
                  color="white"
                  width="300px"
                  height="50px"
                />
            
          </div>
        </GlassBox>
      </div>
    </div>
  );
};

export default VerifyAccount;
