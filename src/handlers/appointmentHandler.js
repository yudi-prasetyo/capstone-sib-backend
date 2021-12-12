const Appointment = require('../models/AppointmentModel');

const createAppointment = async (req, h) => {
  const {
    userId,
    psychologistId,
    dateTime,
    appointmentType,
  } = req.payload;

  try {
    const appointment = new Appointment({
      userId,
      psychologistId,
      dateTime,
      appointmentType,
    });

    await appointment.save();
    return h.response({
      message: 'Appointment created successfully',
    });
  } catch (err) {
    const response = h.response({
      status: 'fail',
      message: err.message,
    });
    response.code(404);

    return response;
  }
};

module.exports = { createAppointment };
