const Joi = require('joi');

const GENDER = {
  FEMALE: 'Perempuan',
  MALE: 'Laki-laki',
};

const userValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid(...Object.values(GENDER)).required(),
});

const psychologistValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  dateOfBirth: Joi.date().required(),
  specialities: Joi.array().items(Joi.string()).required(),
  gender: Joi.string().valid(...Object.values(GENDER)).required(),
});

const appointmentValidator = Joi.object({
  userId: Joi.string().required(),
  psychologistId: Joi.string().required(),
  dateTime: Joi.date().required(),
  appointmentType: Joi.string().required(),
});

const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const chatRoomValidator = Joi.object({
  psychologistId: Joi.string().required(),
});

const chatMessageValidator = Joi.object({
  message: Joi.string().required(),
});

module.exports = {
  userValidator,
  psychologistValidator,
  appointmentValidator,
  loginValidator,
  chatRoomValidator,
  chatMessageValidator,
};
