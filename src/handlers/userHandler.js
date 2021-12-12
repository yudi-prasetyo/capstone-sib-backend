const User = require('../models/UserModel');
const Appointment = require('../models/AppointmentModel');

const registerUser = async (req, h) => {
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
  } = req.payload;

  try {
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
    });

    await user.save();
    return h.response({
      message: 'User created successfully',
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
    const appointments = await Appointment.find({ userId }).exec();

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

module.exports = { getUserById, registerUser, getUserAppointments };
