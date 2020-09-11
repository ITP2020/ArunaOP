const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  leaveType: { type: String, required: true },
  numOfDays: { type: Number, required: true },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  description: { type: String, required: true },
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;