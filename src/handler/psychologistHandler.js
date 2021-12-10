const Psychologist = require('../model/PsychologistModel');

const getAllPsychologists = async () => {
  const psychologists = await Psychologist.find({});

  console.log(psychologists);
  return psychologists;
};

const getPsychologistById = async (req, h) => {
  const { psychologistId } = req.params;

  try {
    const psychologist = await Psychologist.findById(psychologistId).exec();

    if (psychologist) {
      return {
        status: 'success',
        data: {
          psychologist,
        },
      };
    }

    const response = h.response({
      status: 'fail',
      message: 'psikolog tidak ditemukan',
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

module.exports = { getAllPsychologists, getPsychologistById };
