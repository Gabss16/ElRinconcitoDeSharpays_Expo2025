import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";
import Employee from "../models/employee.js";
import bcrypt from "bcrypt"; // ✅ Agregado

// Configura Cloudinary
cloudinary.config({
  cloudinary_name: config.cloudinary.cloudinary_name,
  cloudinary_api_key: config.cloudinary.api_key,
  cloudinary_api_secret: config.cloudinary.api_secret
});

// Crear un nuevo empleado
export const createEmployee = async (req, res) => {
  try {
    let imageUrl = "";
    // Si hay imagen, súbela a Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "employees",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      imageUrl = result.secure_url;
    }

    // 🔒 Hashea la contraseña si existe
    let hashedPassword = req.body.password;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(req.body.password, salt);
    }

    const employee = new Employee({
      ...req.body,
      password: hashedPassword,
      image: imageUrl,
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los empleados
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un empleado por ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un empleado por ID
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    let imageUrl = employee.image;
    // Si hay nueva imagen, súbela a Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "employees",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      imageUrl = result.secure_url;
    }

    // Actualiza los campos
    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;

    // 🔒 Si hay nueva contraseña, hashearla
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      employee.password = await bcrypt.hash(req.body.password, salt);
    }

    employee.image = imageUrl;

    await employee.save();
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un empleado por ID
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    res.status(200).json({ message: "Empleado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
