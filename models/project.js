const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  number: Number,
  location: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
});

module.exports = mongoose.model('Project', projectSchema);
