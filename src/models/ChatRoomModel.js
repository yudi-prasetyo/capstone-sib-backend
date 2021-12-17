const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatRoomModel = new Schema({
  psychologistId: { type: Schema.Types.ObjectId, ref: 'Psychologist', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

chatRoomModel.statics.initiateChat = async function initiateChat(psychologistId, userId) {
  try {
    const availableRoom = await this.findOne({
      psychologistId,
      userId,
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        chatRoomId: availableRoom._doc._id,
      };
    }

    const newRoom = await this.create({ psychologistId, userId });
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
