const mongoose = require('mongoose');

const { Schema } = mongoose;

const MESSAGE_TYPES = {
  TEXT: 'text',
};

const chatMessageModel = new Schema(
  {
    chatRoomId: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, default: () => MESSAGE_TYPES.TEXT, required: true },
    postedByUser: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

chatMessageModel.statics
  .createMessageInChatRoom = async function createMessageInChatRoom(
    chatRoomId,
    message,
    postedByUser,
  ) {
    const post = await this.create({
      chatRoomId,
      message,
      postedByUser,
    });
    const aggregate = await this.aggregate([
    // get post where _id = post._id
      { $match: { _id: post._id } },
      // do a join on another table called users, and
      // get me a user whose _id = postedByUser
      {
        $lookup: {
          from: 'users',
          localField: 'postedByUser',
          foreignField: '_id',
          as: 'postedByUser',
        },
      },
      { $unwind: '$postedByUser' },
      // do a join on another table called chatrooms, and
      // get me a chatroom whose _id = chatRoomId
      {
        $lookup: {
          from: 'chatrooms',
          localField: 'chatRoomId',
          foreignField: '_id',
          as: 'chatRoomInfo',
        },
      },
      { $unwind: '$chatRoomInfo' },
      { $unwind: '$chatRoomInfo.userIds' },
      // do a join on another table called users, and
      // get me a user whose _id = userIds
      {
        $lookup: {
          from: 'users',
          localField: 'chatRoomInfo.userIds',
          foreignField: '_id',
          as: 'chatRoomInfo.userProfile',
        },
      },
      { $unwind: '$chatRoomInfo.userProfile' },
      // group data
      {
        $group: {
          _id: '$chatRoomInfo._id',
          postId: { $last: '$_id' },
          chatRoomId: { $last: '$chatRoomInfo._id' },
          message: { $last: '$message' },
          type: { $last: '$type' },
          postedByUser: { $last: '$postedByUser' },
          chatRoomInfo: { $addToSet: '$chatRoomInfo.userProfile' },
          createdAt: { $last: '$createdAt' },
          updatedAt: { $last: '$updatedAt' },
        },
      },
    ]);

    return aggregate[0];
  };

chatMessageModel.statics
  .getConversationByRoomId = async function getConversationByRoomId(chatRoomId) {
    return this.aggregate([
      { $match: { chatRoomId } },
      { $sort: { createdAt: -1 } },
    ]);
  };

module.exports = mongoose.model('ChatMessage', chatMessageModel);
