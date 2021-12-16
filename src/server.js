const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const Jwt = require('@hapi/jwt');
const socketio = require('socket.io');
const routes = require('./routes');
const { webSockets } = require('./utils/WebSockets');
const { DB_URL } = require('./config');
const {
  validateUser, validateByUserId, validatePsychologist, validateByPsychologistId,
} = require('./services/authServices');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(Jwt);

  server.auth.strategy('jwt-user', 'jwt', validateUser);
  server.auth.strategy('jwt-userId', 'jwt', validateByUserId);
  server.auth.strategy('jwt-psychologist', 'jwt', validatePsychologist);
  server.auth.strategy('jwt-psychologistId', 'jwt', validateByPsychologistId);

  server.route(routes);

  await server.start((err) => {
    if (err) {
      throw err;
    }
  });

  mongoose.connect(DB_URL);

  global.io = socketio(server.listener);
  global.io.on('connection', webSockets.connection);

  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
