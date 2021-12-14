const Psychologist = require('../models/PsychologistModel');
const Appointment = require('../models/AppointmentModel');

const registerPsychologist = async (req, h) => {
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    specialities,
  } = req.payload;

  try {
    const psychologist = new Psychologist({
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      specialities,
    });

    await psychologist.save();
    return h.response({
      message: 'Psychologist created successfully',
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

const getAllPsychologists = async () => {
  const psychologists = await Psychologist.find({});

  return psychologists;
};

const getPsychologistById = async (req, h) => {
  const { psychologistId } = req.params;

  try {
    const psychologist = await Psychologist.findById(psychologistId).exec();

    if (psychologist) {
      return {
        status: 'success',
        data: {
          psychologist,
        },
      };
    }

    const response = h.response({
      status: 'fail',
      message: 'psikolog tidak ditemukan',
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

const getPsychologistAppointments = async (req, h) => {
  const { psychologistId } = req.params;

  try {
    const appointments = await Appointment.find({ psychologistId }).exec();

    if (appointments) {
      return {
        status: 'success',
        data: {
          appointments,
        },
      };
    }

    const response = h.response({
      status: 'fail',
      message: 'user tidak ditemukan',
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

module.exports = {
  registerPsychologist, getAllPsychologists, getPsychologistById, getPsychologistAppointments,
};
