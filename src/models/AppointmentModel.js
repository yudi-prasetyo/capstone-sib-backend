const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentModel = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    psychologistId: { type: Schema.Types.ObjectId, ref: 'Psychologist' },
    dateTime: { type: Date, required: true },
    appointmentType: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

appointmentModel.statics
  .getAppointmentById = async function getAppointmentById(appointmentId) {
    return this.find({ _id: appointmentId }).populate('psychologistId').populate('userId');
  };

appointmentModel.statics
  .getUserAppointments = async function getUserAppointments(userId) {
    return this.find({ userId }).populate('psychologistId').populate('userId');
  };

appointmentModel.statics
  .getPsychologistAppointments = async function getPsychologistAppointments(psychologistId) {
    return this.find({ psychologistId }).populate('psychologistId').populate('userId');
  };

module.exports = mongoose.model('Appointment', appointmentModel);
