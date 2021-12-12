const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentModel = new Schema({
  userId: { type: String, required: true },
  psychologistId: { type: String, required: true },
  dateTime: { type: Date, required: true },
  appointmentType: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Appointment', appointmentModel);
