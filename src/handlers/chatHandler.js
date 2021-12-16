const ChatRoom = require('../models/ChatRoomModel');
const ChatMessage = require('../models/ChatMessageModel');
const User = require('../models/UserModel');

const initiateChat = async (req, h) => {
  try {
    const { userIds, type } = req.payload;
    const { userId: chatInitiator } = req.auth.credentials;

    const allUserIds = [...userIds, chatInitiator];
    const chatRoom = await ChatRoom.initiateChat(allUserIds, type, chatInitiator);

    return h.response({ success: true, chatRoom }).code(200);
  } catch (err) {
    const response = h.response({
      status: 'fail',
      message: err.message,
    });
    response.code(404);

    return response;
  }
};

const postMessage = async (req, h) => {
  try {
    const { message } = req.payload;
    const { roomId } = req.params;

    const currentLoggedUser = req.auth.credentials.userId;

    const post = await ChatMessage.createMessageInChatRoom(roomId, message, currentLoggedUser);
    global.io.sockets.in(roomId).emit('new message', { message: post });

    return h.response({ success: true, post }).code(200);
  } catch (err) {
    const response = h.response({
      status: 'fail',
      message: err.message,
    });
    response.code(404);

    return response;
  }
};

const getConversationById = async (req, h) => {
  try {
    const { roomId } = req.params;
    const room = await ChatRoom.getChatRoomByRoomId(roomId);

    if (!room) {
      const response = h.response({
        status: 'fail',
        message: 'No room exists for this id',
      });
      response.code(404);

      return response;
    }

    const users = await User.getUserByIds(room.userIds);

    const conversation = await ChatMessage.getConversationByRoomId(roomId);

    return h.response({ success: true, conversation, users }).code(200);
  } catch (err) {
    const response = h.response({
      status: 'fail',
      message: err.message,
    });
    response.code(404);

    return response;
  }
};

module.exports = { initiateChat, postMessage, getConversationById };
