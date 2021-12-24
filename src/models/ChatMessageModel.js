const mongoose = require('mongoose');

const { Schema } = mongoose;

const MESSAGE_TYPES = {
  TEXT: 'text',
};

const chatMessageModel = new Schema(
  {
    chatRoomId: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
    message: { type: String, required: true },
    type: { type: String, default: () => MESSAGE_TYPES.TEXT, required: true },
    postedByUser: { type: Schema.Types.ObjectId, ref: 'User' },
    postedByPsychologist: { type: Schema.Types.ObjectId, ref: 'Psychologist' },
  },
  {
    timestamps: true,
  },
);

chatMessageModel.statics
  .createMessageInChatRoom = async function createMessageInChatRoom(
    chatRoomId,
    message,
    id,
    role,
  ) {
    const messageType = role === 'user' ? 'postedByUser' : 'postedByPsychologist';
    const post = await this.create({
      chatRoomId,
      message,
      [messageType]: id,
    });

    return post;
  };

chatMessageModel.statics
  .getConversationByRoomId = async function getConversationByRoomId(chatRoomId) {
    const conversation = await this
      .find({ chatRoomId })
      .sort({ createdAt: 1 })
      .populate('postedByUser')
      .populate('postedByPsychologist');

    return conversation;
  };

module.exports = mongoose.model('ChatMessage', chatMessageModel);
