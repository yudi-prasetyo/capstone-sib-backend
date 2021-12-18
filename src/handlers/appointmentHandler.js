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

const getAppointmentById = async (req, h) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await Appointment.getAppointmentById(appointmentId);

    if (appointment) {
      return {
        status: 'success',
        data: {
          appointment,
        },
      };
    }

    const response = h.response({
      status: 'fail',
      message: 'Appointment tidak ditemukan',
    });
    response.code(404);

    return response;
  } catch (err) {
    const response = h.response({
      status: 'fail',
      message: err.message,
    });
    response.code(404);

    return response;
  }
};

const updateAppointmentById = async (req, h) => {
  const { appointmentId } = req.params;
  const {
    userId,
    psychologistId,
    dateTime,
    appointmentType,
  } = req.payload;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      { _id: appointmentId },
      {
        userId,
        psychologistId,
        dateTime,
        appointmentType,
      },
    );

    return h.response({
      message: 'Appointment updated successfully',
      appointment,
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

module.exports = { createAppointment, getAppointmentById, updateAppointmentById };
