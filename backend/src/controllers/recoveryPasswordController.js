import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs"; 

//import customersModel from "../models/customers.js";
import employeesModel from "../models/employee.js";
import customersModel from "../models/costumer.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";
import { config } from "../config.js";

const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    let userFound;
    let userType;

    userFound = await customersModel.findOne({ email });
    if (userFound) {
      userType = "customer";
    } else {
      userFound = await employeesModel.findOne({ email });
      if (userFound) {
        userType = "employee";
      }
    }

    if (!userFound) {
      res.status(400).json({ message: "Usuario no encontrado" });
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const token = jsonwebtoken.sign(
      //1-¿Que voy a guardar?
      { email, code, userType, verified: false },
      //2-secret key
      config.JWT.secret,
      //3-¿Cuando expira?
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });

    await sendEmail(
      email,
      "Código de verificación", 
      "Te saludamos de parte del equipo de El Rinconcito de Sharpays", 
      HTMLRecoveryEmail(code) 
    );

    res.json({ message: "Correo enviado" });
  } catch (error) {
    console.log("error" + error);
  }
};

// FUNCION PARA VERIFICAR CÓDIGO
passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;
  try {
    const token = req.cookies.tokenRecoveryCode;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (decoded.code !== code) return res.status(400).json({ message: "Invalid code" });

    const { exp, iat, ...rest } = decoded;
    const newToken = jsonwebtoken.sign({ ...rest, verified: true }, config.JWT.secret, { expiresIn: "20m" });

    res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000});
    res.json({ message: "Code verified successfully" });
  } catch (error) {
    console.error(error, req.body);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

// FUNCIÓN PARA ASIGNAR LA NUEVA CONTRASEÑA
passwordRecoveryController.newPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    //Extraer el token de las cookies
    const token = req.cookies.tokenRecoveryCode;

    //Extraer la información del token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    //Comprobar si el codigo fue verificado
    if (!decoded.verified) {
      return res.json({ message: "Código no verificado" });
    }

    //Extraer el email y el userType del token
    const { email, userType } = decoded;

    // Encriptar la contraseña
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    //Actualizar la contraseña del usuario en la base de datos
    let updatedUser;

    if (userType === "customer") {
      updatedUser = await customersModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    } else if (userType === "employee") {
      updatedUser = await employeesModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    }

    //Quitamos el token
    res.clearCookie("tokenRecoveryCode");

    res.status(200).json({ message: "Contraseña actualizada" });
    
  } catch (error) {
    console.log("error" + error);
  }
};


export default passwordRecoveryController;