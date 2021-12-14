const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, ROLES } = require('../config');

const hashPassword = (password) => bcrypt.genSalt(
  10,
  (err, salt) => bcrypt.hash(password, salt, (error, hash) => hash),
);

const createToken = (payload) => jwt.sign({
  aud: 'urn:audience:test',
  iss: 'urn:issuer:test',
  sub: false,
  ...payload,
}, SECRET_KEY);

const authStrategyTemplate = {
  keys: SECRET_KEY,
  verify: {
    aud: 'urn:audience:test',
    iss: 'urn:issuer:test',
    sub: false,
    exp: true,
    maxAgeSec: 60 * 60 * 24 * 3,
  },
};

const validateUser = {
  ...authStrategyTemplate,
  validate: (artifacts) => {
    const { userId, role } = artifacts.decoded.payload;

    if (role === ROLES.USER) {
      return {
        isValid: true,
        credentials: { userId, role },
      };
    }

    return {
      isValid: false,
      credentials: null,
    };
  },
};

const validateByUserId = {
  ...authStrategyTemplate,
  validate: (artifacts, req) => {
    const { userId: userIdParam } = req.params;
    const { userId, role } = artifacts.decoded.payload;

    if (userIdParam === userId) {
      return {
        isValid: true,
        credentials: { userId, role },
      };
    }

    return {
      isValid: false,
      credentials: null,
    };
  },
};

const validatePsychologist = {
  ...authStrategyTemplate,
  validate: (artifacts) => {
    const { role, psychologistId } = artifacts.decoded.payload;

    if (role === ROLES.PSYCHOLOGIST) {
      return {
        isValid: true,
        credentials: { role, psychologistId },
      };
    }

    return {
      isValid: false,
      credentials: null,
    };
  },
};

const validateByPsychologistId = {
  ...authStrategyTemplate,
  validate: (artifacts, req) => {
    const { psychologistId: psychologistIdParam } = req.params;
    const { psychologistId, role } = artifacts.decoded.payload;

    if (psychologistIdParam === psychologistId) {
      return {
        isValid: true,
        credentials: { psychologistId, role },
      };
    }

    return {
      isValid: false,
      credentials: null,
    };
  },
};

module.exports = {
  hashPassword,
  createToken,
  validateUser,
  validateByUserId,
  validatePsychologist,
  validateByPsychologistId,
};
