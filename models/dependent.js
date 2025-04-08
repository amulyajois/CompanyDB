const mongoose = require('mongoose');

const dependentSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  firstName: String,
  gender: String,
  birthDate: Date,
  relationship: String,
});

module.exports = mongoose.model('Dependent', dependentSchema);
