const ChatRoom = require('../models/ChatRoomModel');
const ChatMessage = require('../models/ChatMessageModel');

const initiateChat = async (req, h) => {
  try {
    const { psychologistId } = req.payload;
    console.log(req.auth.credentials);
    const { id: userId } = req.auth.credentials;

    const chatRoom = await ChatRoom.initiateChat(psychologistId, userId);

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

    const currentLoggedUser = req.auth.credentials.id;
    const userRole = req.auth.credentials.role;

    const post = await ChatMessage
      .createMessageInChatRoom(roomId, message, currentLoggedUser, userRole);
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

    const conversation = await ChatMessage.getConversationByRoomId(roomId);

    return h.response({ success: true, conversation }).code(200);
  } catch (err) {
    const response = h.response({
      status: 'fail',
      message: err.message,
    });
    response.code(404);

    return response;
  }
};

const getChatRoomsByUserId = async (req, h) => {
  try {
    const { id } = req.auth.credentials;
    const rooms = await ChatRoom.getChatRoomsByUserId(id);

    return h.response({ success: true, rooms }).code(200);
  } catch (err) {
    const response = h.response({
      status: 'fail',
      message: err.message,
    });
    response.code(404);

    return response;
  }
};

const getChatRoomByUserAndPsychologistId = async (req, h) => {
  try {
    const { psychologistId } = req.params;
    const { id } = req.auth.credentials;

    const room = await ChatRoom.getChatRoomByUserAndPsychologistId(id, psychologistId);

    return h.response({ success: true, room }).code(200);
  } catch (err) {
    const response = h.response({
      status: 'fail',
      message: err.message,
    });
    response.code(404);

    return response;
  }
};

module.exports = {
  initiateChat,
  postMessage,
  getConversationById,
  getChatRoomsByUserId,
  getChatRoomByUserAndPsychologistId,
};
