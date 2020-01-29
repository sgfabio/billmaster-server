const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    campus: {
      type: String,
      enum: [
        'Madrid',
        'Barcelona',
        'Miami',
        'Paris',
        'Berlin',
        'Amsterdam',
        'México',
        'Sao Paulo',
        'Lisbon',
      ],
    },
    course: { type: String, enum: ['WebDev', 'UX/UI', 'Data Analytics'] },
    image: String,
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;