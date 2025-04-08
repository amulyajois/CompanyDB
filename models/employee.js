const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  ssn: String,
  address: String,
  salary: Number,
  gender: String,
  birthDate: Date,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  projects: [{
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    hoursPerWeek: Number,
  }],
});

module.exports = mongoose.model('Employee', employeeSchema);
