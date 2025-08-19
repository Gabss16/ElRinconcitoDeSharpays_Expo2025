import express from 'express';
import cookieParser from 'cookie-parser';

import employeeRoutes from './src/routes/employee.js';
import categoryRoutes from './src/routes/category.js';
import registerEmployeeRoutes from "./src/routes/registerEmployee.js";
import login from "./src/routes/login.js"
import logOut from "./src/routes/logOut.js"
import recoveryPassword from "./src/routes/recoveryPassword.js"

import CostumersRoutes from "./src/routes/costumer.js"
import costumerRegisterRoutes from "./src/routes/registerCostumer.js";

import subCategoryRoutes from './src/routes/subCategory.js';
import productRoutes from './src/routes/products.js';
import orderDetailRoutes from "./src/routes/orderDetails.js";
import advertisementsRoutes from "./src/routes/advertisements.js"
import orders from "./src/routes/order.js"
import createOrderFromCart from "./src/routes/orderFromCart.js"

import paymentRoutes from "./src/routes/payment.js"

import cors from "cors";

import swagger from "swagger-ui-express";
import fs from "fs";
import path from "path";

const swaggerDocument = JSON.parse(
     fs.readFileSync(path.resolve("./documentation.json"),
     "utf-8")
    );

const app = express();

const allowedOrigins = [
  "https://el-rinconcito-de-sharpays-expo2025.vercel.app",
  "https://el-rinconcito-de-sharpays-expo2025-five.vercel.app",
  "https://el-rinconcito-de-sharpays-expo2025-v7m1-objtzhp5a.vercel.app",
  "http://localhost:5173", // Vite
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 


  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

app.use('/api/login',login);
app.use('/api/logOut', logOut);
app.use('/api/recoveryPassword', recoveryPassword);

app.use('/api/employees', employeeRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/customer", CostumersRoutes)
app.use("/api/registerEmployee", registerEmployeeRoutes);
app.use("/api/costumer", CostumersRoutes)
app.use("/api/registerCostumer", costumerRegisterRoutes)

app.use('/api/subCategory', subCategoryRoutes);
app.use('/api/Products', productRoutes);
app.use("/api/orderDetail", orderDetailRoutes);
app.use("/api/advertisements", advertisementsRoutes)
app.use("/api/orders", orders)
app.use("/api/createOrderFromCart", createOrderFromCart)

app.use("/api/payment", paymentRoutes)

//API Documetation 
app.use("/api/documentation", swagger.serve, swagger.setup(swaggerDocument));

export default app;
