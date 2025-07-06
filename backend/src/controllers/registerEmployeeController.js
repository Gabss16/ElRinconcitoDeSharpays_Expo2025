import Employee from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Verificar si el empleado ya existe por email
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Esta cuenta ya existe" });
    }

    // 2. Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // 3. Crear nuevo empleado con la contraseña encriptada
    const newEmployee = new Employee({
      name,
      email,
      password: passwordHash,
    });

    await newEmployee.save();

    // 4. Generar token JWT
    jsonwebtoken.sign(
      { id: newEmployee._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) {
          console.error("Error generating token:", error);
          return res.status(500).json({ message: "Error al generar el token" });
        }

        // 5. Enviar token en cookie y respuesta
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24, // 1 día
        });

        res.status(201).json({ message: "Cuenta registrada con éxito" });
      }
    );
  } catch (error) {
    console.error("Error registering employee:", error);
    res.status(500).json({ message: "Error registering employee" });
  }
};

export default registerEmployeeController;
