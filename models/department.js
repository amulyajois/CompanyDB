const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: String,
  number: Number,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  managerStartDate: Date,
  locations: [String],
});

module.exports = mongoose.model('Department', departmentSchema);
