const { ROLES } = require('../config');
const { hashPassword, createToken } = require('../services/authServices');
const User = require('../models/UserModel');
const Appointment = require('../models/AppointmentModel');

const registerUser = async (req, h) => {
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    gender,
  } = req.payload;

  const password = await hashPassword(req.payload.password);

  try {
    const user = await new User({
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      gender,
    }).save();

    const token = createToken({
      id: user._id,
      role: ROLES.USER,
      firstName,
    });

    return h.response({
      message: 'User created successfully',
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

const getUserById = async (req, h) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).exec();

    if (user) {
      return {
        status: 'success',
        data: {
          user,
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

const getUserAppointments = async (req, h) => {
  const { userId } = req.params;

  try {
    const appointments = await Appointment.getUserAppointments(userId);

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

const updateUserById = async (req, h) => {
  const { userId } = req.params;
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    gender,
  } = req.payload;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      {
        firstName,
        lastName,
        email,
        dateOfBirth,
        gender,
      },
    );

    return h.response({
      message: 'User updated successfully',
      user,
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
  getUserById, registerUser, getUserAppointments, updateUserById,
};
