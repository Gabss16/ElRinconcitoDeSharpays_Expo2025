import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs"; 

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
      { email, code, userType, verified: false },
      config.JWT.secret,
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });

    await sendEmail(
      email,
      "Código de verificación", 
      "Te saludamos de parte del equipo de El Rinconcito de Sharpays", 
      HTMLRecoveryEmail(code) 
    );

    res.status(201).json({ message: "Correo enviado", token });
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Error interno" });
  }
};

passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;
  try {
    const token = req.cookies.tokenRecoveryCode || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (decoded.code !== code) return res.status(400).json({ message: "Invalid code" });

    const { exp, iat, ...rest } = decoded;
    const newToken = jsonwebtoken.sign({ ...rest, verified: true }, config.JWT.secret, { expiresIn: "20m" });

    res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 });
    res.json({ message: "Code verified successfully", token: newToken });
  } catch (error) {
    console.error(error, req.body);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

passwordRecoveryController.newPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (!decoded.verified) {
      return res.status(400).json({ message: "Código no verificado" });
    }

    const { email, userType } = decoded;
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    let updatedUser = null;
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

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado, no se pudo actualizar la contraseña" });
    }
    res.clearCookie("tokenRecoveryCode");
    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.log("Error en newPassword:", error);
    res.status(500).json({ message: "Error interno" });
  }
};


export default passwordRecoveryController;
