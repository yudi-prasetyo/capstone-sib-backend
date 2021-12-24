const { ROLES } = require('../config');
const { hashPassword, createToken } = require('../services/authServices');
const Psychologist = require('../models/PsychologistModel');
const Appointment = require('../models/AppointmentModel');

const registerPsychologist = async (req, h) => {
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    specialities,
    gender,
  } = req.payload;

  const password = await hashPassword(req.payload.password);

  try {
    const psychologist = await new Psychologist({
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      specialities,
      gender,
    }).save();

    const token = createToken({
      id: psychologist._id,
      role: ROLES.PSYCHOLOGIST,
      firstName,
    });

    return h.response({
      message: 'Psychologist created successfully',
      token,
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
    const appointments = await Appointment.getPsychologistAppointments(psychologistId);

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

const updatePsychologistById = async (req, h) => {
  const { psychologistId } = req.params;
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    specialities,
    gender,
  } = req.payload;

  try {
    const psychologist = await Psychologist.findByIdAndUpdate(
      { _id: psychologistId },
      {
        firstName,
        lastName,
        email,
        dateOfBirth,
        specialities,
        gender,
      },
    );

    return h.response({
      message: 'Psychologist updated successfully',
      psychologist,
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

module.exports = {
  registerPsychologist,
  getAllPsychologists,
  getPsychologistById,
  getPsychologistAppointments,
  updatePsychologistById,
};
