import express from 'express';
import cookieParser from 'cookie-parser';

import employeeRoutes from './src/routes/employee.js';
import categoryRoutes from './src/routes/category.js';

const app = express();


app.use(express.json());


app.use(cookieParser());


app.use('/api/employees', employeeRoutes);


app.use('/api/categories', categoryRoutes);

export default app;
