const mongoose = require('mongoose');

const { Schema } = mongoose;

const psychologistModel = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    specialities: { type: [String], required: true },
    gender: { type: String, enum: ['Perempuan', 'Laki-laki'], required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Psychologist', psychologistModel);
