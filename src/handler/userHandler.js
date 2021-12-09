const User = require('../model/UserModel');

const getAllUsers = async () => {
  const users = await User.find({});

  console.log(users);
  return users;
};

module.exports = { getAllUsers };
