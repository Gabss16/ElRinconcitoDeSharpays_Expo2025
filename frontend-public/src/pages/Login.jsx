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
import SuccessAlert from "../components/SuccessAlert.jsx";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
  const { login, authCookie, API } = useAuth();

  // Función para verificar si una cuenta está bloqueada
  const checkBlockStatus = async (emailToCheck) => {
    if (!emailToCheck) return;
    
    try {
      const response = await fetch(`${API}/check-block-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailToCheck }),
      });

      const data = await response.json();
      
      if (response.status === 403 && data.message.includes("Block account")) {
        const match = data.message.match(/(\d+) minutes/);
        if (match) {
          const minutes = parseInt(match[1]);
          setIsBlocked(true);
          setBlockTimeRemaining(minutes * 60);
          
          // Iniciar contador regresivo
          const interval = setInterval(() => {
            setBlockTimeRemaining(prev => {
              if (prev <= 1) {
                setIsBlocked(false);
                clearInterval(interval);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error checking block status:", error);
    }
  };

  // Verificar bloqueo cuando se escribe el email
  useEffect(() => {
    if (email && email.includes('@')) {
      const timeoutId = setTimeout(() => {
        checkBlockStatus(email);
      }, 1000); // Esperar 1 segundo después de que el usuario deje de escribir

      return () => clearTimeout(timeoutId);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBlocked) {
      ErrorAlert(`Tu cuenta está bloqueada. Tiempo restante: ${Math.ceil(blockTimeRemaining / 60)} minutos.`);
      return;
    }

    if (!email || !password) {
      ErrorAlert("Por favor, completa todos los campos.");
      return;
    }

    const result = await login(email, password);
    
    if (!result.success) {
      // Verificar si es un mensaje de cuenta bloqueada
      if (result.message && (result.message.includes("Block account") || result.message.includes("Block Account"))) {
        ErrorAlert("Tu cuenta ha sido bloqueada por 20 minutos debido a múltiples intentos fallidos.");
        setIsBlocked(true);
        setBlockTimeRemaining(1 * 60); // 20 minutos en segundos
        
        // Limpiar los campos
        setEmail("");
        setPassword("");
        
        // Iniciar contador regresivo
        const interval = setInterval(() => {
          setBlockTimeRemaining(prev => {
            if (prev <= 1) {
              setIsBlocked(false);
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return;
      } else {
        ErrorAlert("Credenciales incorrectas.");
        // Solo limpiar el campo de contraseña
        setPassword("");
        return;
      }
    }
    
    // Solo si el login fue exitoso
    SuccessAlert("Sesión iniciada con éxito");
    navigate("/inicio");
  };

  
  useEffect(() => {
    if (authCookie) {
    navigate("/inicio");
    }
  }, [authCookie]);

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
                      text={"Iniciar Sesión"}
                    />

                    <CustomInput
                      label={"Correo electrónico"}
                      placeholder={"Ejemplo@gmail.com"}
                      onChange={(e) => setEmail(e.target.value)}
                      type={"email"}
                      name={"email"}
                      value={email}
                      disabled={isBlocked}
                    />

                    <CustomInput
                      label={"Contraseña"}
                      placeholder={"********"}
                      onChange={(e) => setPassword(e.target.value)}
                      type={"password"}
                      name={"password"}
                      value={password}
                      disabled={isBlocked}
                    />
                    <div style={{ width: "300px", marginTop: "5px" }}>
                      <LinkText
                        text={"Olvidé mi contraseña"}
                        action={"/recoveryPassword"}
                      />

                      <CustomButton
                        text={isBlocked ? `Bloqueada (${Math.ceil(blockTimeRemaining / 60)}min)` : "Iniciar Sesión"}
                        background={isBlocked ? "gray" : "black"}
                        color={"white"}
                        width={"100%"}
                        height={"50px"}
                        disabled={isBlocked}
                      />
                      <div className="go-to-register text-center mt-5 d-flex">
                        <p className="m-0 ps-3 pe-1 text-white">
                          ¿No tienes cuenta?
                        </p>
                        <LinkText text={"Registrarme"} action={"/register"} />
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