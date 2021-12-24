const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, ROLES } = require('../config');

const hashPassword = async function hashPassword(password) {
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
};

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

const validateLoggedUser = {
  ...authStrategyTemplate,
  validate: (artifacts) => {
    const { id, role } = artifacts.decoded.payload;

    if (role === ROLES.USER || role === ROLES.PSYCHOLOGIST) {
      return {
        isValid: true,
        credentials: { id, role },
      };
    }

    return {
      isValid: false,
      credentials: null,
    };
  },
};

const validateUser = {
  ...authStrategyTemplate,
  validate: (artifacts) => {
    const { id, role } = artifacts.decoded.payload;

    if (role === ROLES.USER) {
      return {
        isValid: true,
        credentials: { id, role },
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
    const { id, role } = artifacts.decoded.payload;

    if (userIdParam === id) {
      return {
        isValid: true,
        credentials: { id, role },
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
    const { id, role } = artifacts.decoded.payload;
    console.log(artifacts.decoded.payload);

    if (role === ROLES.PSYCHOLOGIST) {
      return {
        isValid: true,
        credentials: { id, role },
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
    const { id, role } = artifacts.decoded.payload;

    if (psychologistIdParam === id) {
      return {
        isValid: true,
        credentials: { id, role },
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
  validateLoggedUser,
};
