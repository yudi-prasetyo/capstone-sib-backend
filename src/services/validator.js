const Joi = require('joi');

const userValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  dateOfBirth: Joi.date().required(),
});

const psychologistValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  dateOfBirth: Joi.date().required(),
  specialities: Joi.array().items(Joi.string()).required(),
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

const CHAT_ROOM_TYPES = {
  CONSUMER_TO_CONSUMER: 'consumer-to-consumer',
  CONSUMER_TO_SUPPORT: 'consumer-to-support',
};

const chatRoomValidator = Joi.object({
  userIds: Joi.array().items(Joi.string()).required(),
  type: Joi.string().valid(...Object.values(CHAT_ROOM_TYPES)).required(),
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
