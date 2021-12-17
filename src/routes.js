const { registerUser, getUserById, getUserAppointments } = require('./handlers/userHandler');
const {
  registerPsychologist, getAllPsychologists, getPsychologistById, getPsychologistAppointments,
} = require('./handlers/psychologistHandler');
const { createAppointment } = require('./handlers/appointmentHandler');
const { login } = require('./handlers/loginHandler');
const { initiateChat, postMessage, getConversationById } = require('./handlers/chatHandler');
const {
  userValidator,
  psychologistValidator,
  appointmentValidator,
  loginValidator,
  chatRoomValidator,
  chatMessageValidator,
} = require('./services/validator');

const routes = [
  {
    method: 'POST',
    path: '/login',
    handler: async (req, h) => {
      const res = await login(req, h);
      return res;
    },
    options: {
      validate: {
        payload: loginValidator,
      },
    },
  },
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
      auth: {
        strategies: ['jwt-userId', 'jwt-psychologist'],
      },
    },
  },
  {
    method: 'GET',
    path: '/users/{userId}/appointments',
    handler: async (req, h) => {
      const res = await getUserAppointments(req, h);
      return res;
    },
    options: {
      auth: {
        strategies: ['jwt-userId'],
      },
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
    options: {
      auth: {
        strategies: ['jwt-psychologistId'],
      },
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
      auth: {
        strategies: ['jwt-user'],
      },
    },
  },
  {
    method: 'POST',
    path: '/initiate-chat',
    handler: async (req, h) => {
      const res = await initiateChat(req, h);
      return res;
    },
    options: {
      validate: {
        payload: chatRoomValidator,
      },
      auth: {
        strategies: ['jwt-user', 'jwt-psychologist'],
      },
    },
  },
  {
    method: 'POST',
    path: '/chat/{roomId}/message',
    handler: async (req, h) => {
      const res = await postMessage(req, h);
      return res;
    },
    options: {
      validate: {
        payload: chatMessageValidator,
      },
      auth: {
        strategies: ['jwt-user', 'jwt-psychologist'],
      },
    },
  },
  {
    method: 'GET',
    path: '/chat/{roomId}',
    handler: async (req, h) => {
      const res = await getConversationById(req, h);
      return res;
    },
    options: {
      auth: {
        strategies: ['jwt-user', 'jwt-psychologist'],
      },
    },
  },
];

module.exports = routes;
