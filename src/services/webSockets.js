let users = [];

const subscribeOtherUser = (room, otherUserId) => {
  const userSockets = users.filter(
    (user) => user.userId === otherUserId,
  );
  userSockets.map((userInfo) => {
    const socketConn = global.io.sockets.connected(userInfo.socketId);
    if (socketConn) {
      socketConn.join(room);
    }
  });
};

const connection = (client) => {
  console.log('Client connected...');
  // event fired when the chat room is disconnected
  client.on('disconnect', () => {
    users = users.filter((user) => user.socketId !== client.id);
  });
  // add identity of user mapped to the socket id
  client.on('identity', (userId, role) => {
    users.push({
      socketId: client.id,
      userId,
      role,
    });
  });
  // subscribe person to chat & other user as well
  client.on('subscribe', (room, otherUserId = '') => {
    subscribeOtherUser(room, otherUserId);
    client.join(room);
  });
  // mute a chat room
  client.on('unsubscribe', (room) => {
    client.leave(room);
  });
};

module.exports = { connection };
