const { registerUser, getUserById, getUserAppointments } = require('./handlers/userHandler');
const {
  registerPsychologist, getAllPsychologists, getPsychologistById, getPsychologistAppointments,
} = require('./handlers/psychologistHandler');
const { createAppointment } = require('./handlers/appointmentHandler');
const { userValidator, psychologistValidator, appointmentValidator } = require('./services/validator');

const routes = [
  {
    method: 'POST',
    path: '/users',
    handler: async (req, h) => {
      const res = await registerUser(req, h);
      return res;
    },
    options: {
      validate: {
        payload: userValidator,
      },
    },
  },
  {
    method: 'GET',
    path: '/users/{userId}',
    handler: async (req, h) => {
      const res = await getUserById(req, h);
      return res;
    },
    options: {
      auth: 'jwt-userId',
    },
  },
  {
    method: 'GET',
    path: '/users/{userId}/appointments',
    handler: async (req, h) => {
      const res = await getUserAppointments(req, h);
      return res;
    },
  },
  {
    method: 'POST',
    path: '/psychologists',
    handler: async (req, h) => {
      const res = await registerPsychologist(req, h);
      return res;
    },
    options: {
      validate: {
        payload: psychologistValidator,
      },
    },
  },
  {
    method: 'GET',
    path: '/psychologists',
    handler: async (req) => {
      console.log(req.auth.credentials);
      const res = await getAllPsychologists();
      return res;
    },
    options: {
      auth: 'jwt-user',
    },
  },
  {
    method: 'GET',
    path: '/psychologists/{psychologistId}',
    handler: async (req, h) => {
      const res = await getPsychologistById(req, h);
      return res;
    },
  },
  {
    method: 'GET',
    path: '/psychologists/{psychologistId}/appointments',
    handler: async (req, h) => {
      const res = await getPsychologistAppointments(req, h);
      return res;
    },
  },
  {
    method: 'POST',
    path: '/appointments',
    handler: async (req, h) => {
      const res = await createAppointment(req, h);
      return res;
    },
    options: {
      validate: {
        payload: appointmentValidator,
      },
    },
  },
];

module.exports = routes;
