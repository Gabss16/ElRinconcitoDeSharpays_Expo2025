import nodemailer from "nodemailer";
import { config } from "../config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});


const sendEmail = async (to, subject, body, html) => {
  try {
    const info = await transporter.sendMail({
      from: "expo.impulsatec.2025@gmail.com",
      to, 
      subject, 
      body, 
      html, 
    });

    return info;
  } catch (error) {
    console.log("error" + error);
  }
};

// Función para generar el HTML del correo de recuperación de contraseña
const HTMLRecoveryEmail = (code) => {
  return `
      <div style="font-family: 'Poppins', Arial, sans-serif;">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
      </style>
      
      <div style="
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  font-family: 'Poppins', Arial, sans-serif;
">
    
      <div style="
        width: 500px;
        height: 450px;
        border-radius: 10px;
        padding: 1px;
        background: radial-gradient(circle at top left,rgb(248, rgb(255, 230, 241)), #f8c0d8);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
        font-family: 'Poppins', Arial, sans-serif;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      ">
        <div style="
          width: 220px;
          height: 45px;
          border-radius: 100px;
          background-color: #fce4ec;
          opacity: 0.4;
          box-shadow: 0 0 20px #fff;
          filter: blur(6px);
          position: absolute;
          top: 10px;
          left: 10px;
          transform: rotate(25deg);
        "></div>

        <img src="https://res.cloudinary.com/devkosnau/image/upload/v1749408388/33_20250412_034441_0000_mmzvs7.png" style="width: 180px;"/>
        
        <div style="font-size: 20px; color: rgb(197, 66, 112); font-weight: bold; margin: 10px;">
          Código de recuperación
        </div>
        
        <div style="
          font-size: 40px;
          font-weight: bold;
          padding: 10px;
          background: linear-gradient(45deg,rgb(235, 159, 184),rgb(226, 110, 151), #f50057);
          border: 2px rgb(226, 110, 151) solid;
          border-radius: 10px;
          box-shadow: rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 30px;
        ">
          ${code}
        </div>

        <div style="font-size: 18px; color: rgb(197, 66, 112);">
          Este código es válido por 20min. 
        </div>

        <hr style="width: 350px; margin: 20px 0; border: none; border-top: 2px solid #ffff;" />

        <div style="font-size: 14px; color: rgb(197, 66, 112);">
          <b><em>Si no solicitaste este código, puedes hacer caso omiso.</em></b>
        </div>
      </div>
    </div>

    `;
};

export { sendEmail, HTMLRecoveryEmail };