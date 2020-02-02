const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const groupSchema = new Schema(
  {
    groupName: {type: String, required: true},
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    members: {
      type: [String],
      set: (names) => {
        return names.map((name) => {
          const loweredCaseName = name.toLowerCase();
          return `${loweredCaseName
            .charAt(0)
            .toUpperCase()}${loweredCaseName.slice(1)}`;
        });
      },
    },
    description: String,
    expenses: [{type: Schema.Types.ObjectId, ref: 'expense'}],
    settles: [{type: Schema.Types.ObjectId, ref: 'settle'}],
    date: Date,
    // total: Number,
  },
  {
    timestamp: true,
  }
);

const Group = model('group', groupSchema);

module.exports = Group;
