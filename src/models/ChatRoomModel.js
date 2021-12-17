const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatRoomModel = new Schema({
  userIds: { type: Array, required: true },
  chatInitiator: { type: String, required: true },
});

chatRoomModel.statics.initiateChat = async function initiateChat(userIds, chatInitiator) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        chatRoomId: availableRoom._doc._id,
      };
    }

    const newRoom = await this.create({ userIds, chatInitiator });
    return {
      isNew: true,
      message: 'creating a new chatroom',
      chatRoomId: newRoom._doc._id,
    };
  } catch (error) {
    console.log('error on start chat method', error);
    throw error;
  }
};

chatRoomModel.statics
  .getChatRoomByRoomId = async function getChatRoomByRoomId(roomId) {
    const room = await this.findOne({ _id: roomId });
    return room;
  };

module.exports = mongoose.model('ChatRoom', chatRoomModel);
