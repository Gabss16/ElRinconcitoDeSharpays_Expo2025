import customersModel from "../models/costumer.js";
import employeesModel from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

// LOGIN PRIVATE - Only Employees
loginController.loginPrivate = async (req, res) => {
  let { email, password } = req.body;

  // Normalizamos el correo
  email = email?.trim().toLowerCase();

  try {
    let userFound;
    let userType;

    // 1. Admin
    if (
      email === config.ADMIN.emailAdmin.toLowerCase() &&
      password === config.ADMIN.password
    ) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
      // 2. Empleados
      userFound = await employeesModel.findOne({ email });
      userType = "employee";
    }

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
    }

    jsonwebtoken.sign(
      {
        id: userFound._id,
        userType,
        name: userFound.name,
        image: userFound.image,
        email: userFound.email,
      },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error generating token" });
        }

        res.cookie("authToken", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          path: "/",
          sameSite: "lax",
        });

        res.status(200).json({
          message: `${userType} login successful`,
          token,
          userId: userFound._id,
          userType,
          name: userFound.name,
          image: userFound.image,
          email: userFound.email,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// LOGIN PUBLIC - Only Customers
loginController.loginPublic = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound;
    let userType;

    // 1. Admin
    if (
      email === config.ADMIN.emailAdmin &&
      password === config.ADMIN.password
    ) {
      userType = "admin";
      userFound = { _id: "admin", name: "Admin", image: "", email, password };
    } else {
      // 2. Customer
      userFound = await customersModel.findOne({ email });
      userType = "customer";
    }

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    if (userType === "employee") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
    }

    // Generar token
    jsonwebtoken.sign(
      {
        id: userFound._id,
        userType,
        name: userFound.name,
        image: userFound.image,
        email: userFound.email,
      },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error generating token" });
        }

        res.cookie("authToken", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          path: "/",
          sameSite: "lax",
        });

        res.status(200).json({
          message: `${userType} login successful`,
          token,
          userId: userFound._id,
          userType,
          name: userFound.name,
          image: userFound.image,
          email: userFound.email,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export default loginController;
