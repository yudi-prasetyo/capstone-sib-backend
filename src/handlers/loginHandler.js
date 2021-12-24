const bcrypt = require('bcrypt');
const { ROLES } = require('../config');
const { createToken } = require('../services/authServices');
const User = require('../models/UserModel');
const Psychologist = require('../models/PsychologistModel');

const login = async (req, h) => {
  const {
    email,
    password,
  } = req.payload;


  try {
    const user = await User.findOne({ email }).exec();
    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = createToken({
          id: user._id,
          role: ROLES.USER,
          firstName: user.firstName,
        });

        return h.response({
          message: 'User logged in successfully',
          token,
        });
      }

      return h.response({
        message: 'Invalid credentials',
      }).code(401);
    }

    const psychologist = await Psychologist.findOne({ email }).exec();

    if (psychologist) {
      const match = await bcrypt.compare(password, psychologist.password);

      if (match) {
        const token = createToken({
          id: psychologist._id,
          role: ROLES.PSYCHOLOGIST,
          firstName: psychologist.firstName,
        });

        return h.response({
          message: 'Psychologist logged in successfully',
          token,
        });
      }

      return h.response({
        message: 'Invalid credentials',
      }).code(401);
    }

    return h.response({
      message: 'User not found',
    }).code(404);
  } catch (err) {
    const response = h.response({
      status: 'fail',
      message: err.message,
    });
    response.code(404);

    return response;
  }
};

module.exports = { login };
