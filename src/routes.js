const { getAllUsers } = require('./handler/userHandler');

const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: async () => {
      const res = await getAllUsers();
      return res;
    },
  },
];

module.exports = routes;
