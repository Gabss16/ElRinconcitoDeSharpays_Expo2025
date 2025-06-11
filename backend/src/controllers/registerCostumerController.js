import Costumer from "../models/costumer.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerCostumerController = {};

// REGISTRO SIMPLE CON JWT (como Employee)
registerCostumerController.register = async (req, res) => {
  const { name, email, password, department, address } = req.body;

  try {
    // Verificar si ya existe
    const existingCostumer = await Costumer.findOne({ email });
    if (existingCostumer) {
      return res.status(400).json({ message: "El cliente ya existe" });
    }

    // Encriptar contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Crear cliente
    const newCostumer = new Costumer({
      name,
      email,
      password: passwordHash,
      department,
      address,
    });

    await newCostumer.save();

    // Generar token
    jsonwebtoken.sign(
      { id: newCostumer._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) {
          console.error("Error al generar el token:", error);
          return res.status(500).json({ message: "Error al generar el token" });
        }

        // Guardar token en cookie
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24, // 1 día
          sameSite: "strict",
        });

        res.status(201).json({ message: "Cliente registrado exitosamente" });
      }
    );
  } catch (error) {
    console.error("Error al registrar cliente:", error);
    res.status(500).json({ message: "Error al registrar cliente" });
  }
};

export default registerCostumerController;
