const Hapi = require('@hapi/hapi');
// const mongodb = require('hapi-mongodb');
const mongoose = require('mongoose');
const routes = require('./routes');
const { dbUrl } = require('./config');

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

  // await server.register();

  server.route(routes);

  await server.start((err) => {
    if (err) {
      throw err;
    }
  });

  mongoose.connect(dbUrl);

  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
