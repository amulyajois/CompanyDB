const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
require('./db'); // Establish DB connection

const app = express();
app.use(express.json());

// Optional: Import your models
const Department = require('./models/department');
const Project = require('./models/project');
const Employee = require('./models/employee');
const Dependent = require('./models/dependent');

// Test route
app.get('/', (req, res) => {
  res.send('Company Database API is running ✅');
});

// Example: Get all employees
app.get('/employees', async (req, res) => {
  const employees = await Employee.find().populate('department projects.project supervisor');
  res.json(employees);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
