import express from 'express';
import cookieParser from 'cookie-parser';

import employeeRoutes from './src/routes/employee.js';
import categoryRoutes from './src/routes/category.js';
import registerEmployeeRoutes from "./src/routes/registerEmployee.js";
import login from "./src/routes/login.js"
import logOut from "./src/routes/logOut.js"
import recoveryPassword from "./src/routes/recoveryPassword.js"
const app = express();


app.use(express.json());


app.use(cookieParser());

app.use('/api/login',login);
app.use('api/logOut', logOut);
app.use('api/recoveryPassword', recoveryPassword);

app.use('/api/employees', employeeRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/registeremployee", registerEmployeeRoutes);

export default app;
