const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatRoomModel = new Schema({
  userIds: { type: Array, required: true },
  type: { type: String, required: true },
  chatInitiator: { type: String, required: true },
});

chatRoomModel.statics.initiateChat = async function (userIds, type, chatInitiator) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      type,
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        chatRoomId: availableRoom._doc._id,
        type: availableRoom._doc.type,
      };
    }

    const newRoom = await this.create({ userIds, type, chatInitiator });
    return {
      isNew: true,
      message: 'creating a new chatroom',
      chatRoomId: newRoom._doc._id,
      type: newRoom._doc.type,
    };
  } catch (error) {
    console.log('error on start chat method', error);
    throw error;
  }
};

chatRoomModel.statics
  .getChatRoomByRoomId = async function (roomId) {
    const room = await this.findOne({ _id: roomId });
    return room;
  };

module.exports = mongoose.model('ChatRoom', chatRoomModel);
