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
const app = express();


app.use(express.json());


app.use(cookieParser());

app.use('/api/login',login);
app.use('api/logOut', logOut);
app.use('api/recoveryPassword', recoveryPassword);

app.use('/api/employees', employeeRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/registeremployee", registerEmployeeRoutes);
app.use("/api/costumer", CostumersRoutes)
app.use("/api/registerCostumer", costumerRegisterRoutes)

app.use('/api/subCategory', subCategoryRoutes);
app.use('/api/product', productRoutes);
app.use("/api/orderDetail", orderDetailRoutes);
app.use("/api/Advertisements", advertisementsRoutes)

export default app;
