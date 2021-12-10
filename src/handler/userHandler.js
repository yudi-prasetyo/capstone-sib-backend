const User = require('../model/UserModel');

const registerUser = async (req, h) => {
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
  } = req.payload;

  try {
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
    });

    await user.save();
    return h.response({
      message: 'User created successfully',
    });
  } catch (err) {
    const response = h.response({
      status: 'fail',
      message: err.message,
    });
    response.code(404);

    return response;
  }
};

const getAllUsers = async () => {
  const users = await User.find({});

  console.log(users);
  return users;
};

const getUserById = async (req, h) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).exec();

    if (user) {
      return {
        status: 'success',
        data: {
          user,
        },
      };
    }

    const response = h.response({
      status: 'fail',
      message: 'user tidak ditemukan',
    });
    response.code(404);

    return response;
  } catch (err) {
    const response = h.response({
      status: 'fail',
      message: err.message,
    });
    response.code(404);

    return response;
  }
};

module.exports = { getAllUsers, getUserById, registerUser };
