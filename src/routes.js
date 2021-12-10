const { registerUser, getAllUsers, getUserById } = require('./handler/userHandler');
const { getAllPsychologists, getPsychologistById } = require('./handler/psychologistHandler');
const { createAppointment } = require('./handler/appointmentHandler');

const routes = [
  {
    method: 'POST',
    path: '/users',
    handler: async () => {
      const res = await registerUser();
      return res;
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: async () => {
      const res = await getAllUsers();
      return res;
    },
  },
  {
    method: 'GET',
    path: '/users/{userId}',
    handler: async (req, h) => {
      const res = await getUserById(req, h);
      return res;
    },
  },
  {
    method: 'GET',
    path: '/psychologists',
    handler: async () => {
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
    method: 'POST',
    path: '/appointments',
    handler: async (req, h) => {
      const res = await createAppointment(req, h);
      return res;
    },
  },
];

module.exports = routes;
